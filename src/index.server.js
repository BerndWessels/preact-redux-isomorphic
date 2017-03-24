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
import {addLocaleData, IntlProvider} from 'react-intl';
import {head, split} from 'ramda';

/**
 * Import local dependencies.
 */
import Root from './component';
import {rootReducer} from './reducer';
import rootEpic from './epic';
import {ROOT_STATE_READY_TO_RENDER} from './actions';

import intlDE from 'react-intl/locale-data/de.js';
import intlEN from 'react-intl/locale-data/en.js';
import intlMessagesDE from '../public/assets/translations/de.json';
import intlMessagesEN from '../public/assets/translations/en.json';

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
     * Load the locale data for the users language.
     */
    // Get the users language.
    const locale = req.query.language ? head(split('-', req.query.language)) : 'de'; // TODO support en-gb fallback to en?
    const locales = {
      de: {data: intlDE, messages: intlMessagesDE},
      en: {data: intlEN, messages: intlMessagesEN}
    };

    // Set the locale data.
    addLocaleData(locales[locale].data);

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
          <IntlProvider locale={locale} messages={locales[locale].messages}>
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
