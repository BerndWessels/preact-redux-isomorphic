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
import fs from 'fs';
import path from 'path';
import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

/**
 * Import local dependencies.
 */
import root from './index.server';

/**
 * Read the index.html template.
 */
const indexHtml = fs.readFileSync(path.join(__dirname, './client/index.html'), 'utf8');

/**
 * Create the express server.
 */
const app = express();

// Log incoming requests. TODO only for debugging purposes?
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// Remove unnecessary headers.
app.disable('x-powered-by');

// Enable compression. TODO: Update binaryMimeTypes if you use this.
// app.use(compression());

app.use(awsServerlessExpressMiddleware.eventContext());

// We only serve the rendered index.html.
// All other resources will be served from an S3 bucket.
app.get('*', (req, res, next) => {
  try {
    root(req).then(({context, html, state}) => {
      let renderedHtml = indexHtml
         .replace(/<\/body>/m, `${html}</body>`)
         .replace(/window.__INITIAL_STATE__ = null;/m, `window.__INITIAL_STATE__ = ${JSON.stringify(state)};`);
      res.set({
        'Content-Type': 'text/html',
        'Content-Length': Buffer.byteLength(renderedHtml)
      });
      res.status(200).send(renderedHtml);
    });
  } catch (e) {
    // TODO Better error handling/reporting needed.
    console.log(e);
    next(e);
  }
});

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes, and to the x-amazon-apigateway-binary-media-types array in
// simple-proxy-api.yaml, then redeploy (`npm run package-deploy`)
const binaryMimeTypes = [
  // 'application/javascript',
  // 'application/json',
  'application/octet-stream',
  // 'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  // 'text/comma-separated-values',
  // 'text/css',
  // 'text/html', TODO turn this on if you use app.use(compression()); !!!!!!!!!!!!!!!!
  // 'text/javascript',
  // 'text/plain',
  // 'text/text',
  // 'text/xml'
];

// Create the AWS Lambda server.
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

// Export the AWS Lambda server proxy.
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
