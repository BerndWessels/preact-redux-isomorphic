/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const request = require('request');
const argv = require('yargs').argv;

/**
 * Check
 */
if(argv.mode !== 'merge' && argv.mode !== 'override') {
  console.log('Please provide a mode (merge|override)!');
  return -1;
}

if(!argv.endpoint) {
  console.log('Please provide an endpoint!');
  return -1;
}

/**
 * Request the GraphQL schema from the server.
 */
request({
  rejectUnauthorized: false,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  uri: argv.endpoint,
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            name
            kind
            ofType {
              name
              kind
            }
            fields {
              name
              type {
                name
                kind
                ofType {
                  name
                  kind
                  ofType {
                    name
                    kind
                  }
                }
                possibleTypes {
                  name
                  kind
                }
              }
            }
          }
        }
      }`
  }),
  method: 'POST'
}, function (err, _res, body) {
  if (err) {
    console.log(err);
    return;
  }
  const schema = JSON.parse(body).data.__schema;

  /**
   * Create the types.json file.
   */
  const typesObject = schema.types.reduce((prev, curr) => {
    if (curr.kind === 'OBJECT') {
      curr.fields = curr.fields.reduce((prev, curr) => {
        prev[curr.name] = curr;
        return prev;
      }, {});
    }
    prev[curr.name] = curr;
    return prev;
  }, {});
  fs.writeFile(path.join(__dirname, argv.mode === 'override' ? '../../src/graphql/types.json' : './generated/types.json'), JSON.stringify(typesObject, null, 2), (err) => {
    if (err) {
      console.log(err)
    }
  });

  /**
   * Extend the schema.
   */
  let types = Object.keys(typesObject).map((k) => typesObject[k]);

  types.forEach(type => {
    type.Name = type.name;
    type.name = type.name.charAt(0).toLowerCase() + type.name.slice(1);
  });

  /**
   * Create the [entity]Reducer.js files.
   */
  types.filter(t => t.kind === 'OBJECT' && t.name.charAt(0) !== '_' && t.name !== 'Query').forEach(type => {
    ejs.renderFile(path.join(__dirname, './templates/entityReducer.ejs'), type, (err, compiled) => {
      if (err) {
        console.log(err);
      } else {
        fs.writeFile(path.join(__dirname, `${argv.mode === 'override' ? '../../src/entities' : './generated'}/${type.name}Reducer.js`), compiled, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });

  /**
   * Create the reducer.js file.
   */
  ejs.renderFile(path.join(__dirname, './templates/entitiesReducer.ejs'), {types: types.filter(t => t.kind === 'OBJECT' && t.name.charAt(0) !== '_' && t.name !== 'Query')}, (err, compiled) => {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile(path.join(__dirname, argv.mode === 'override' ? '../../src/entities/entitiesReducer.js' : './generated/entitiesReducer.js'), compiled, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });

});
