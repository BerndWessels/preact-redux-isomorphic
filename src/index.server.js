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
import createRenderer from './preact-dom-renderer';
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
    const serverReducer = (state = {}, action) => {

      if (action.type === ROOT_STATE_READY_TO_RENDER) {
        setTimeout(() => {
          let state = store.getState();
          delete state._server_;
          delete state.router;
          let html = renderer.html();
          renderer.tearDown();
          resolve({context, html, state});
        }, 1);
      }
      return state;
    };

    /**
     * Load the locale data for the users language.
     */
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
     * Now we can run the app on the server.
     * https://github.com/developit/preact-render-to-string/issues/30#issuecomment-288752733
     */
    const renderer = createRenderer();

    // Router context for capturing redirects.
    let context = {};

    try {
      // Run the app on the server.
      renderer.render(
        <Provider store={store}>
          <IntlProvider locale={locale} messages={locales[locale].messages}>
            <StaticRouter location={req.url} context={context}>
              <Root/>
            </StaticRouter>
          </IntlProvider>
        </Provider>
      );
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  });
}
