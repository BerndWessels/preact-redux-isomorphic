/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

/**
 * Import dependencies.
 */
//require('source-map-support').install()
//require('isomorphic-fetch')
//const { cacheControl, strictTransportSecurity } = require('./middleware')
const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const compression = require('compression');
const root = require('./index.server').default;

/**
 * Read the index.html template.
 */
let indexHtml = fs.readFileSync(path.join(__dirname, '../client/index.html'), 'utf8');

/**
 * Create the express server.
 */
const app = express();
app.use((req, res, next) => {
  console.log(req.url);
  next()
});
app.disable('x-powered-by');
app.use(compression());
//app.use(strictTransportSecurity());
//app.use('/public', express.static('build/public', { maxAge: '365d' }))
app.use('/', express.static(path.join(__dirname, '../client'), {index: false, maxAge: '365d'}));
//app.use(cacheControl())
//app.use('/service-worker.js', express.static('build/public/service-worker.js'))
app.get('*', (req, res, next) => {
  try {
    root.then(({context, html}) => {
      console.log('!!!', context, html, indexHtml.replace(/<body>[\s\S]*<\/body>/m, `<body>${html}</body>`));
      res.send(indexHtml.replace(/<body>[\s\S]*<\/body>/m, `<body>${html}</body>`));//`<!DOCTYPE html><html><body>Bernd</body></html>`);
    });
  } catch (e) {
    next(e)
  }
});

/**
 * Load the ssl certificates.
 */
const privateKey = fs.readFileSync(path.join(__dirname, '../../../certificates/localhost.key'));
const certificate = fs.readFileSync(path.join(__dirname, '../../../certificates/localhost.crt'));

/**
 * Create and run the server.
 */
const server = https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(process.env.PORT || 8080, () => {
  console.log(`[server] app on https://localhost:${server.address().port} - ${app.settings.env}`)
});

/**
 * Terminate the server on request.
 */
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0)
  })
});
