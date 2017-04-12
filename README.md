# preact-redux-isomorphic

## Overview

This is an opinionated isomorphic preact and redux starter-kit.

It includes all your favourite libraries and can be as little as `24kB` but most likely less than `80kB` for the client to load your entire app!
It depends on how many of the great stuff you actually need for your app.

The goal is to use the same code to achieve
- a PWA (progressive web app)
- a SPA (single page application) that can be serverless and hosted on a CDN
- a SSR (server-side rendered) app with SEO (search engine optimization) support

### Latest and greatest

#### preact v7

`preact` is `react` in only `3kB`

We also added `preact-compat` in case you need it, otherwise just get rid of it.

#### react-router v4

Routing done right with components. `ConnectedRouter` on the client and `StaticRouter` on the server
allow for perfect isomorphic routing.

#### redux v3 and ramda

Single immutable state, reducers and actions to structure and master even the biggest apps.

Use `rambda` to mutate state - this allows your state to be POJO (Plain Old JavaScript Objects)
and make development so much more fun.

#### rxjs v5

Reactive programming of your actions allows for easy composition of even the most complex
async action stream flows.
This can replace all the other redux middleware you used so far.
 
#### react-intl v2

Internationalization that uses standards and works client and server-side.
With support for all the stuff you need like genderization, pluralization, date and time.

`Coming soon:`
There are even some helper scripts to export/import PO files to communicate with your translators.

#### webpack v2 with HMR (hot module replacement)

Obviously the latest and greatest webpack with all the bells and whistles to achieve
highly optimized builds.

#### server-side rendering without the need for `preact-render-to-string`

With a huge thanks to @developit we can now run the preact app on the server without the need
for complex pre-render state calculations and render-to-string.

This gives us very clean code that is almost identical on server and client-side and performs
great.

You can find [all the details here](ttps://github.com/developit/preact-render-to-string/issues/30#issuecomment-288752733).

#### PWA (progressive web app) Service Worker

100/100 Lighthouse rating if you decide to use this repo to build a PWA.

Otherwise just get rid of the service worker at the end of `index.client.js`.

#### preact-mdc (material design components)

Isomorphic modular lightweight preact material design based on the [material-components-web](https://github.com/material-components/material-components-web) sass styles.

Replace it with your own front-end components if you like. Just make sure they are isomorphic.

#### Normalized GraphQL Entity Redux State

`Coming soon:`
We love GraphQL. That's why there is an example on how to use it right.
Basically each query response will be normalized into the redux store.

If you don't like/need it replace it with whatever data fetching technology you like.

## Getting started

### Preparations

- Either provide your own ssl certificates of change the code to use http instead of https!
- To get a response from the GraphQL API you need to run your own GraphQL server and adjust the query.
Otherwise just replace it with your ordinary REST APIs.
- Fork and clone this repo.
- `npm install`

### Development

`npm run dev`

### Production

`npm run build`

`node dist/server/main`

# Contributing

You are very welcome to report issues, PRs and become a contributor.
