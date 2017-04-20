/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2017 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

/**
 * Import dependencies.
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Export the build configuration.
 */
module.exports = function () {
  // Build sass loaders.
  function getSassLoaders(modules) {
    return [
      {
        // https://github.com/webpack-contrib/css-loader
        loader: 'css-loader',
        options: Object.assign({
            sourceMap: true,
            modules: modules,
            importLoaders: 2
          }, {}
        )
      },
      {
        // https://github.com/postcss/postcss-loader
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              autoprefixer({browsers: ['last 1 versions']})
            ];
          }
        }
      },
      {
        // https://github.com/bholloway/resolve-url-loader
        loader: 'resolve-url-loader'
      },
      {
        // https://github.com/webpack-contrib/sass-loader
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: ['../../node_modules', '../../node_modules/@material/*']
            .map((d) => path.join(__dirname, d))
            .map((g) => glob.sync(g))
            .reduce((a, c) => a.concat(c), [])
        }
      }
    ];
  }

  // Build and export the build configuration.
  return {
    // https://webpack.js.org/configuration/target
    target: 'web',
    // https://webpack.js.org/configuration/entry-context
    entry: {
      main: path.resolve(__dirname, '../../src/index.client.js')
    },
    // https://webpack.js.org/configuration/output
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, './dist/intl'),
      publicPath: ''
    },
    // https://webpack.js.org/configuration/resolve
    resolve: {
      alias: {
        'preact': 'preact',
        'react': 'preact-compat',
        'react-dom': 'preact-compat'
      },
      extensions: ['.js', '.jsx', '.json', '.scss'],
      modules: ['node_modules']
    },
    // https://webpack.js.org/configuration/module
    module: {
      noParse: /\.min\.js/,
      rules: [{
        test: /\.jsx?$/,
        exclude: [/node_modules(?![\/\\]preact-mdc)/],
        use: [{
          // https://github.com/babel/babel-loader
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', {loose: true, modules: false}]
            ],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
              ['transform-react-jsx', {pragma: 'h'}],
              [
                "react-intl",
                {
                  "messagesDir": path.resolve(path.join(__dirname, './')),
                  "enforceDescriptions": true
                }
              ]
            ]
          },
        }]
      }, {
        test: /(\.scss|\.css)$/,
        exclude: [/node_modules/, /normalize.css/, /icomoon/],
        use: getSassLoaders(true)
      }, {
        test: /(\.scss|\.css)$/,
        include: [/node_modules/],
        use: getSassLoaders(false)
      }, {
        // https://github.com/webpack/file-loader
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
      }]
    },
    // https://webpack.js.org/configuration/plugins
    plugins: [
      // https://github.com/johnagan/clean-webpack-plugin
      new CleanWebpackPlugin(['dist/intl'], __dirname)
    ]
  };
};
