# preact-redux-isomorphic

## Overview

This is an opinionated isomorphic preact and redux starter-kit.

Includes all your favourite libraries but less than `60kB` for the client to load your entire app!

### Latest and greatest

#### preact v7

`preact` is `react` in only `3kB`

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

#### webpack v2

Obviously the latest and greatest webpack with all the bells and whistles to achieve
highly optimized builds.

#### server-side rendering without the need for `preact-render-to-string`

With a huge thanks to @developit we can now run the preact app on the server without the need
for complex pre-render state calculations and render-to-string.

This gives us very clean code that is almost identical on server and client-side and performs
great.

You can find [all the details here](ttps://github.com/developit/preact-render-to-string/issues/30#issuecomment-288752733).

## Getting started

### Preparations

- Either provide your own ssl certificates of change the code to use http instead of https!

- Fork and clone this repo.

- `npm install`

### Development

`npm run dev`

### Production

`npm run build`

`node dist/server/main`

# Contributing

You are very welcome to report issues, PRs and become a contributor.
