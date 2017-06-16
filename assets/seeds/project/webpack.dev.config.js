const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const environment = require('./config')();

config.output = {
  filename: '[name].bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, 'client')
};

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({environment})
]);

module.exports = config;
