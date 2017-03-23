/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Import dependencies.
 */
import {h} from 'preact';
import render from 'preact-render-to-string';
import {Provider} from 'preact-redux';
import {applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {StaticRouter} from 'react-router';
import {IntlProvider} from 'react-intl';

/**
 * Import local dependencies.
 */
import Root from './component';
import {rootReducer} from './reducer';
import rootEpic from './epic';
import {ROOT_STATE_READY_TO_RENDER} from './actions';

/**
 * Export the promise factory.
 */
export default function (req) {

  /**
   * Create a new promise for the current request.
   */
  return new Promise((resolve) => {

    /**
     * Injected reducer to process the "ready to render" action.
     */
    let finalRender = true;
    const serverReducer = (state = {}, action) => {
      console.log('action => ', action);
      if (action.type === ROOT_STATE_READY_TO_RENDER && finalRender) {
        finalRender = false;
        resolve(renderRoot());
      }
      return state;
    };

    /**
     * Create the epic middleware.
     */
    const epicMiddleware = createEpicMiddleware(rootEpic);

    /**
     * Create the store.
     */
    let store = createStore(
      rootReducer(serverReducer),
      applyMiddleware(epicMiddleware)
    );

    /**
     * Render the application.
     */
    const renderRoot = () => {
      let context = {};
      let html = render(
        <Provider store={store}>
          <IntlProvider locale="en">
            <StaticRouter location={req.url} context={context}>
              <Root/>
            </StaticRouter>
          </IntlProvider>
        </Provider>
      );
      let state = store.getState();
      delete state._server_;
      delete state.router;
      return {context, html, state};
    };

    /**
     * Initial render.
     * TODO We are rendering twice on the server to trigger all actions and pre-loading exactly like on the client.
     * TODO This could be reduced to a single render once this is resolved https://github.com/ReactTraining/react-router/issues/4407
     */
    renderRoot();
  });
}
