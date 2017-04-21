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

/**
 * Import local dependencies.
 */
import {queryReducer} from './queryReducer';
import {addressReducer} from './addressReducer';
import {fakeReducer} from './fakeReducer';
import {cardReducer} from './cardReducer';
import {colorReducer} from './colorReducer';
import {commerceReducer} from './commerceReducer';
import {companyReducer} from './companyReducer';
import {databaseReducer} from './databaseReducer';
import {dateTimeReducer} from './dateTimeReducer';
import {financeReducer} from './financeReducer';
import {currencyReducer} from './currencyReducer';
import {hackerReducer} from './hackerReducer';
import {imageReducer} from './imageReducer';
import {internetReducer} from './internetReducer';
import {loremReducer} from './loremReducer';
import {meetingReducer} from './meetingReducer';
import {personReducer} from './personReducer';
import {miscReducer} from './miscReducer';
import {numbersReducer} from './numbersReducer';
import {phoneReducer} from './phoneReducer';
import {systemReducer} from './systemReducer';
import {cardTransactionReducer} from './cardTransactionReducer';
import {messageReducer} from './messageReducer';
import {metaReducer} from './metaReducer';
import {createdByReducer} from './createdByReducer';
import {userAddressReducer} from './userAddressReducer';
import {updatedByReducer} from './updatedByReducer';
import {transactionReducer} from './transactionReducer';
import {userReducer} from './userReducer';


/**
 * Export the entities store.
 */
export const entitiesReducer = combineReducers({
  Query: queryReducer,
  Address: addressReducer,
  Fake: fakeReducer,
  Card: cardReducer,
  Color: colorReducer,
  Commerce: commerceReducer,
  Company: companyReducer,
  Database: databaseReducer,
  DateTime: dateTimeReducer,
  Finance: financeReducer,
  Currency: currencyReducer,
  Hacker: hackerReducer,
  Image: imageReducer,
  Internet: internetReducer,
  Lorem: loremReducer,
  Meeting: meetingReducer,
  Person: personReducer,
  Misc: miscReducer,
  Numbers: numbersReducer,
  Phone: phoneReducer,
  System: systemReducer,
  CardTransaction: cardTransactionReducer,
  Message: messageReducer,
  Meta: metaReducer,
  CreatedBy: createdByReducer,
  UserAddress: userAddressReducer,
  UpdatedBy: updatedByReducer,
  Transaction: transactionReducer,
  User: userReducer,

});
