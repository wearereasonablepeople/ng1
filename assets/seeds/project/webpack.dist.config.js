const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {findIndex} = require('lodash');
const gutil = require('gulp-util');
const printError = err => gutil.log(gutil.colors.bgRed(gutil.colors.white(err)));

if(process.env.NODE_ENV && !['production', 'prototype'].includes(process.env.NODE_ENV)) {
  printError(`You're trying to build for '${process.env.NODE_ENV}' but building is meant for production environment`);
  printError(`Try setup your environment to 'production' or 'prototype'`);
}

const environment = require('./config')(process.env.NODE_ENV || 'production');
config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};

const extractCssPropIndex = findIndex(config.module.rules, {test: /\.scss$/});
if(extractCssPropIndex !== -1) {
  config.module.rules[extractCssPropIndex] = {
    test: /\.scss/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {loader: 'css-loader'},
        {loader: 'sass-loader'},
      ]
    })
  };
}

config.plugins = config.plugins.concat([

  //reduce code size
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular']
    },
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      collapse_vars: true,
      reduce_vars: false
    },
    output: {
      comments: false,
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new ExtractTextPlugin('app.css'),
  new webpack.DefinePlugin({environment})
]);

module.exports = config;
