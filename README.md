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

There are even some helper scripts to export/import PO files to communicate with your translators.

##### `npm run po:export`

This will extract all translations from your code and merge them into PO files.
It will NOT override already existing translations but only add new translations to the PO files.
You then send the PO files to your translator and he will use his tools to only translate the new untranslated translations.

##### `npm run po:import visa`

This will import all translations from the PO files within the given whitelabel.
You do this after you received all translations back from the translator and before you build.

##### Whitelabel

If you are building just for your own company, then just have only a single whitelabel and that's totally fine.

But we also want to enable you to build for multiple whitelabels.
This allows you to have different translations for different whitelabels.
It is a very common thing in enterprise applications and translations really differ between whitelabels (believe me).

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

#### npm run-commands in `package.json`

You might want to change the following parameters within the dev and build run-commands:

- `BASEURL` will be injected into the `index.html` and the `router history`
- `PORT` is the port to be used by the  development server
- `HOST` is the host to be used by the  development server

```js
"build:client": "cross-env NODE_ENV=production BABEL_ENV=production TARGET=web BASEURL=/ webpack",
"build:server": "cross-env NODE_ENV=production BABEL_ENV=production TARGET=node BASEURL=/ webpack",
"dev": "cross-env NODE_ENV=development TARGET=web BASEURL=/ PORT=8080 HOST=localhost webpack-dev-server --inline --hot --progress",
"dev:secure": "cross-env NODE_ENV=development TARGET=web BASEURL=/ PORT=8080 HOST=my-domain.com webpack-dev-server --inline --hot --progress --https",
```

#### SSL

You can run development with `http` or `https`. Production is served only with `https`.

To do so you have to provide your own SSL certificates as `certificates/domain.key` and `certificates/domain.cert`.

Make sure you don't check those in to GIT!!!

### Development

`npm run dev` runs the development version via `http`

`npm run dev:secure` runs the development version via `https` in which case you have to provide
 your own ssl certificate in the `certificates` folder.

### Production

`npm run build`

`node dist/server/main`

This serves via https and requires you to provide your own certificates since it is intended to be for production.

# Contributing

You are very welcome to report issues, PRs and become a contributor.
