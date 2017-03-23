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
import {IntlProvider} from 'react-intl';

/**
 * Import local dependencies.
 */
import rootReducer from './reducer';
import rootEpic from './epic';

/**
 * TODO
 * In SSR we can build in all locales and messages for all locales into the server bundle.
 * In CDN we should dynamically load the user locale and messages for the user locale only.
 */

/**
 * Create the browser history access.
 */
const history = createHistory();

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
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <Root/>
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
      document.body,
      root
    );
  })
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
