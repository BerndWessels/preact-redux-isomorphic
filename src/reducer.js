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
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

/**
 * Import local dependencies.
 */
// TODO import other reducers here
const aReducer = (state = {test: 'wessels'}, action) => {
  return state;
};

/**
 * Collect all reducers.
 */
const reducers = {
  a: aReducer,
  router: routerReducer
};

/**
 * Export the root reducer for server-side rendering.
 */
export function rootReducer(serverReducer) {
  return combineReducers({...reducers, _server_: serverReducer});
}

/**
 * Export the root reducer.
 */
export default combineReducers(reducers);
