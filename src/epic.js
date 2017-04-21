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
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

/**
 * Import local dependencies.
 */
import {
  ROOT_FETCH_GRAPHQL_QUERY,
  ROOT_FETCH_GRAPHQL_QUERY_CANCEL,
  ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED,
  fetchGraphQLQuerySucceededCreator,
  fetchGraphQLQueryFailedCreator,
  fetchGraphQLQueryPendingCreator,
  rootStateReadyToRenderCreator
} from './actions';
import {normalizeGraphQLQueryResponse} from './graphql';
// TODO import your other epics here if you have any.
// import {demoPageEpic} from './containers/demo-page/epic';

/**
 * Isomorphic Observable.ajax request. TODO maybe make it an npm package.
 */
const request = function request(options) {
  if (process.env.WEB) {
    return Observable.ajax(options);
  } else {
    return Observable.ajax({
      createXHR: () => {
        const https = require('https');
        const XHR2 = require('xhr2');
        const xhr = new XHR2();
        const agent = new https.Agent({rejectUnauthorized: false});
        xhr.nodejsSet({httpsAgent: agent});
        return xhr;
      }, ...options
    });
  }
};

/**
 * This epic fetches a GraphQL query.
 */
const fetchGraphQLQueryEpic = action$ =>
  action$.ofType(ROOT_FETCH_GRAPHQL_QUERY)
    .mergeMap(action =>
      request({
        url: 'http://159.203.96.223/graphql',
        body: action.payload,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ', // + accessToken,
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
      // TODO supply identifier mappings here if necessary , {Param: 'name', Something: 'key'}))
        .map((payload) => normalizeGraphQLQueryResponse(payload.response.data))
        .takeUntil(action$.ofType(ROOT_FETCH_GRAPHQL_QUERY_CANCEL))
        .map(fetchGraphQLQuerySucceededCreator)
        .retry(2)
        .catch(({xhr}) => Observable.of(fetchGraphQLQueryFailedCreator(xhr)))
        .startWith(fetchGraphQLQueryPendingCreator())
    );

/**
 * This epic takes the first GraphQL query success and assumes that the state is now ready to be rendered.
 */
const stateReadyToRenderEpic = action$ => action$.ofType(ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED).map(rootStateReadyToRenderCreator).take(1);

/**
 * Export the root epic.
 */
export default combineEpics(
  // TODO import your other epics here if you have any.
  // demoPageEpic,
  stateReadyToRenderEpic,
  fetchGraphQLQueryEpic
);
