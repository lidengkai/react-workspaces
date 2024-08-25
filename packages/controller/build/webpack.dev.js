// @ts-check
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:10138',
        pathRewrite: {},
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  target: 'web',
});
