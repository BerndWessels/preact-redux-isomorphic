# Overview

If you are using `GraphQL` and `Redux` you are most likely to normalize any `GraphQL Query`
into a `normalized entity store`.

To make this as simple and easy to use as possible we provide a script that can extract all
`GraphQL Entities` from a given `GraphQL Endpoint` and automatically create the `Entity Reducers`
for you.

You run this script initially and then whenever the `GraphQL Schema` is about to change.

# Usage

## Override

If you don't make any manual changes to any of the `Entity Reducers` you can just run

`npm run graphql:override`

This will generate and override your `Entity Reducers` automatically and you are ready to go.

## Merge

If you are extending the `Entity Reducers` with additional functionality you must run

`npm run graphql:merge`

This will generate all the `Entity Reducers` in the `scripts/graphql/generated` folder.

You can now manually merge the generated

`...Reducer.js` files into `src/entities`

and
 
 `types.json` file into `src/graphql`

without losing any of the extensions you've previously added to the `Entity Reducers`.
