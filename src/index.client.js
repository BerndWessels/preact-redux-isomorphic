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
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
import {addLocaleData, IntlProvider} from 'react-intl';
import {head, split} from 'ramda';

/**
 * Import local dependencies.
 */
import rootReducer from './reducer';
import rootEpic from './epic';

import intlDE from 'bundle-loader?lazy!react-intl/locale-data/de.js';
import intlEN from 'bundle-loader?lazy!react-intl/locale-data/en.js';
import intlMessagesDE from 'bundle-loader?lazy!../public/assets/translations/de.json';
import intlMessagesEN from 'bundle-loader?lazy!../public/assets/translations/en.json';

/**
 * Load the locale data for the users language.
 */

function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// Get the users language.
const locale = getQueryStringValue('language') ? head(split('-', getQueryStringValue('language'))) : 'de'; // TODO support en-gb fallback to en?
const locales = {
  de: {data: intlDE, messages: intlMessagesDE},
  en: {data: intlEN, messages: intlMessagesEN}
};

// Load the locale data for the users language asynchronously.
locales[locale].data((localeData) => {

  // Set the locale data.
  addLocaleData(localeData);

  // Load the locale messages for the users language asynchronously.
  locales[locale].messages((localeMessages) => {

    /**
     * Create the browser history access.
     */
    const history = createHistory({
      basename: process.env.BASE_URL
    });

    /**
     * Create the epic middleware.
     */
    const epicMiddleware = createEpicMiddleware(rootEpic);

    /**
     * Create the store.
     */
    let store;
    if (process.env.NODE_ENV === 'development') {
      // Development mode with Redux DevTools support enabled.
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Prevents Redux DevTools from re-dispatching all previous actions.
        shouldHotReload: false
      }) : compose;
      // Create the redux store.
      store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware))
      );
    } else {
      // Production mode.
      store = window.__INITIAL_STATE__ ? createStore(
        rootReducer,
        window.__INITIAL_STATE__,
        applyMiddleware(routerMiddleware(history), epicMiddleware)
      ) : createStore(
        rootReducer,
        applyMiddleware(routerMiddleware(history), epicMiddleware)
      );
      // TODO delete initial state for garbage collection?
    }

    /**
     * Render the application.
     */
    let root = document.body.lastElementChild;
    const renderRoot = () => {
      let Root = require('./component').default;
      requestAnimationFrame(() => {
        root = render(
          <Provider store={store}>
            <IntlProvider locale={locale} messages={localeMessages}>
              <ConnectedRouter history={history}>
                <Root/>
              </ConnectedRouter>
            </IntlProvider>
          </Provider>,
          document.body,
          root
        );
      });
    };

    /**
     * Enable hot module reloading in development mode.
     */
    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        // Handle updates to the components.
        module.hot.accept('./component', () => {
          console.log('Updated components');
          renderRoot();
        });
        // Handle updates to the reducers.
        module.hot.accept('./reducer', () => {
          console.log('Updated reducers');
          let rootReducer = require('./reducer').default;
          store.replaceReducer(rootReducer);
        });
        // Handle updates to the epics.
        module.hot.accept('./epic', () => {
          console.log('Updated epics');
          let rootEpic = require('./epic').default;
          epicMiddleware.replaceEpic(rootEpic);
        });
      }
    }

    /**
     * Finally render the app.
     */
    renderRoot();

    /**
     * Register the service worker in production.
     */
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        // Your service-worker.js *must* be located at the top-level directory relative to your site.
        // It won't be able to control pages unless it's located at the same level or higher than them.
        // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
        // See https://github.com/slightlyoff/ServiceWorker/issues/468
        navigator.serviceWorker.register('service-worker.js').then(function(reg) {
          // updatefound is fired if service-worker.js changes.
          reg.onupdatefound = function() {
            // The updatefound event implies that reg.installing is set; see
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            let installingWorker = reg.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    // At this point, the old content will have been purged and the fresh content will
                    // have been added to the cache.
                    // It's the perfect time to display a "New content is available; please refresh."
                    // message in the page's interface.
                    console.log('New or updated content is available.');
                  } else {
                    // At this point, everything has been precached.
                    // It's the perfect time to display a "Content is cached for offline use." message.
                    console.log('Content is now available offline!');
                  }
                  break;

                case 'redundant':
                  console.error('The installing service worker became redundant.');
                  break;
              }
            };
          };
        }).catch(function(e) {
          console.error('Error during service worker registration:', e);
        });
      }
    }
  });
});
