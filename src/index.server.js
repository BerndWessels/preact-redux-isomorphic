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
import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {StaticRouter} from 'react-router';
import {IntlProvider, FormattedMessage} from 'react-intl';

/**
 * Import local dependencies.
 */
import Root from './component';
import rootReducer from './reducer';
import rootEpic from './epic';

/**
 * TODO
 * In SSR we can build in all locales and messages for all locales into the server bundle.
 * In CDN we should dynamically load the user locale and messages for the user locale only.
 */

/**
 * Create the epic middleware.
 */
const epicMiddleware = createEpicMiddleware(rootEpic);

/**
 * Create the store.
 */
let store = createStore(
  rootReducer, // TODO cobine with fake/prerendered router state
  applyMiddleware(epicMiddleware)
);

/**
 * Render the application. TODO once the state is stable/ready!
 */
let context = {};
let html = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <StaticRouter location="/" context={context}>
            <Root/>
          </StaticRouter>
        </IntlProvider>
      </Provider>
);

/**
 *
 */
export default Promise.resolve({context, html});
