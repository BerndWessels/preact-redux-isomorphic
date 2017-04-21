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

/**
 * Import local dependencies.
 */
import types from './types.json';

/**
 * Export the GraphQL response normalizer helper function.
 */
export const normalizeGraphQLQueryResponse = (response, identifiers = {}) => {
  // received entities will be flattend into this payload.
  let entities = {};
  // start processing the query response.
  normalizeGraphQLQueryResponseNode(entities, identifiers, response, 'Query', 'Query');
  // return the received and flattened payload to the reducers.
  return entities;
};

// parse each node recursively.
function normalizeGraphQLQueryResponseNode(entities, identifiers, node, path, nodeTypeName) {
  // initialize empty nodes with null.
  if (!node) {
    return null;
  }
  // get the node type either from the schema or the union type itself.
  let nodeType = node.hasOwnProperty('__typename') ? types[node.__typename] : types[nodeTypeName];
  // get the identifier for the node.
  let identifier = identifiers.hasOwnProperty(nodeType.name) ? identifiers[nodeType.name] : 'id';
  // start building the entity for the node.
  let entity = {};
  // Compute identifier for nodes without id.
  if (node.hasOwnProperty(identifier) && node[identifier] !== null) {
    // Apply the valid id to the entity.
    entity[identifier] = node[identifier];
    // Calculate the base path for the child properties.
    path = nodeType.name + '.' + node[identifier];
  }
  else {
    // Apply the path as the identifier for this entity.
    entity[identifier] = path;
  }
  // iterate through each property of the node.
  for (let nodePropName in node) {
    // Be nice.
    if (node.hasOwnProperty(nodePropName)) {
      // id is handled already.
      if (nodePropName === identifier) {
        continue;
      }
      // simply copy the __typename property if available.
      if (nodePropName === '__typename') {
        entity[nodePropName] = node[nodePropName];
        continue;
      }
      // get the properties type and value.
      let nodePropType = nodeType.fields[nodePropName].type;
      let nodePropValue = node[nodePropName];
      // process the property based on its type.
      switch (nodePropType.kind) {
        case 'SCALAR':
        case 'ENUM':
          entity[nodePropName] = nodePropValue;
          break;
        case 'OBJECT':
          entity[nodePropName] = normalizeGraphQLQueryResponseNode(entities, identifiers, nodePropValue, `${path}.${nodePropName}`, nodePropType.name);
          break;
        case 'UNION':
          // TODO make sure there is a __typename and handle more than just UNIONs of OBJECTs here
          entity[nodePropName] = normalizeGraphQLQueryResponseNode(entities, identifiers, nodePropValue, `${path}.${nodePropName}`);
          break;
        case 'LIST':
          switch (nodePropType.ofType.kind) {
            case 'SCALAR':
            case 'ENUM':
              entity[nodePropName] = nodePropValue;
              break;
            case 'OBJECT': {
              let list = [];
              if (nodePropValue) {
                nodePropValue.forEach((listItem, i) => {
                  list.push(normalizeGraphQLQueryResponseNode(entities, identifiers, listItem, `${path}.${nodePropName}.${i}`, nodePropType.ofType.name));
                });
              }
              entity[nodePropName] = list;
              break;
            }
            case 'UNION': {
              let list = [];
              if (nodePropValue) {
                nodePropValue.forEach(listItem => {
                  // TODO include the type here, id is not enough
                  list.push(normalizeGraphQLQueryResponseNode(entities, identifiers, listItem, `${path}.${nodePropName}`));
                });
              }
              entity[nodePropName] = list;
              break;
            }
            case 'LIST': {
              switch (nodePropType.ofType.ofType.kind) {
                case 'SCALAR':
                case 'ENUM':
                  let list = [];
                  if (nodePropValue) {
                    nodePropValue.forEach(listItem => {
                      list.push(listItem);
                    });
                  }
                  entity[nodePropName] = list;
                  break;
                // TODO support more than just SCALARs in LIST of LISTs
              }
              break;
            }
          }
          break;
      }
    }
  }
  // Entities always have to have an id, even if they are local properties only.
  if (!entity.hasOwnProperty(identifier)) {
    throw `Entity of type ${nodeType.name} has neither a natural nor a computed id! This should never happen!`;
  }
  // Create the entity type store if it doesn't exist yet.
  if (!entities.hasOwnProperty(nodeType.name)) {
    entities[nodeType.name] = {};
  }
  // Get the entity's id.
  const id = entity[identifier];
  // Add the entity to the response store. Note: entities is processed "withMutations".
  entities[nodeType.name][id] = entity;
  // Return a reference to the entity.
  return {id, __typename: nodeType.name};
}
