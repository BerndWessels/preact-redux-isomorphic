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
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/retry';

/**
 * Import local dependencies.
 */
import {
  ROOT_FETCH_GRAPHQL_QUERY,
  ROOT_FETCH_GRAPHQL_QUERY_CANCEL,
  fetchGraphQLQuerySucceededCreator,
  fetchGraphQLQueryFailedCreator,
  fetchGraphQLQueryPendingCreator
} from './actions';
//import {normalizeGraphQLQueryResponse} from './graphql';
//import {accessToken} from './idam';
// TODO import other epics here.
//import {demoPageEpic} from './containers/demo-page/epic';

/**
 * This epic fetches a GraphQL query.
 */
const fetchGraphQLQueryEpic = action$ =>
  action$.ofType(ROOT_FETCH_GRAPHQL_QUERY)
    .mergeMap(action =>
      Observable.ajax.post
      (
        'https://localhost:8088/graphql',
        action.payload,
        {
          'Accept': 'application/json',
          'Authorization': 'Bearer ', // + accessToken,
          'Content-Type': 'application/json; charset=UTF-8'
        }
      )
      // TODO supply identifier mappings here if necessary , {Param: 'name', Something: 'key'}))
        .map((payload) => payload.response.data) // normalizeGraphQLQueryResponse(payload.response.data))
        .takeUntil(action$.ofType(ROOT_FETCH_GRAPHQL_QUERY_CANCEL))
        .map(fetchGraphQLQuerySucceededCreator)
        .retry(2)
        .catch(({xhr}) => Observable.of(fetchGraphQLQueryFailedCreator(xhr)))
        .startWith(fetchGraphQLQueryPendingCreator())
    );

/**
 * Export the root epic.
 */
export default combineEpics(
  fetchGraphQLQueryEpic,
  //demoPageEpic
);
