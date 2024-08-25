// @ts-check
const path = require('path');
const webpack = require('webpack');
const {
  CONTEXT,
  mode,
  isDev,
  env,
  apiList,
  isH5,
  name,
  version,
} = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const template = 'ejs/index.ejs';
const remUnit = isH5 ? 100 : false;

/** @type {*} */
module.exports = {
  mode,
  entry: {
    app: path.join(CONTEXT, 'src/main.tsx'),
  },
  output: {
    path: path.join(CONTEXT, 'dist'),
    filename: isDev ? 'public/js/[name].js' : 'public/js/[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: Object.assign(
      {
        '@': path.join(CONTEXT, 'src'),
        '~': 'controller/src',
        lodash: 'lodash-es',
      },
      isH5 ? { 'antd-mobile': 'antd-mobile/2x' } : null
    ),
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?|mjs)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          remUnit && {
            loader: 'px2rem-loader',
            options: {
              remUnit,
              remPrecision: 8,
            },
          },
          ,
          'postcss-loader',
        ].filter(Boolean),
      },
      {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDev
                  ? '[path][name]__[local]'
                  : '[hash:base64:8]',
                exportLocalsConvention: 'camelCaseOnly',
              },
            },
          },
          remUnit && {
            loader: 'px2rem-loader',
            options: {
              remUnit,
              remPrecision: 8,
            },
          },
          ,
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              additionalData: `@webpack-env: '${env}';`,
            },
          },
        ].filter(Boolean),
      },
      {
        test: /\.ejs$/,
        use: 'underscore-template-loader',
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024,
          },
        },
        generator: {
          filename: 'public/images/[name]-[hash][ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset/resource',
        generator: {
          filename: 'public/medias/[name]-[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: 'public/css/[name].[chunkhash].css',
        ignoreOrder: true,
      }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template,
      // favicon: 'favicon.ico',
      scriptLoading: 'blocking',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new webpack.DefinePlugin({
      $APP_NAME: JSON.stringify(name),
      $APP_VERSION: JSON.stringify(version),
      $APP_MODE: JSON.stringify(mode),
      $APP_ENV: JSON.stringify(env),
      $APP_IS_H5: JSON.stringify(isH5),
      APP_API: JSON.stringify(apiList[env]),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(CONTEXT, 'static'),
          to: 'static',
          globOptions: {
            ignore: ['.*'],
          },
        },
      ],
    }),
  ].filter(Boolean),
  stats: {
    entrypoints: false,
    children: false,
  },
  performance: {
    hints: false,
  },
};
