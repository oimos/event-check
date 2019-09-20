const path = require('path');
const webpack = require('webpack');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const moment = require('moment');
const packageJSON = require('./package.json');
require('dotenv').config();

const createBanner = () => {
  const createdTime = moment().format('YYYY-MM-DD HH:mm:ss')
  const banner = `
    ${packageJSON.name}-${packageJSON.version}.js
    Date: ${createdTime}
  `;
  return banner;
};

module.exports = {
  mode: 'production',
  entry: './server/src/get_events.ts',
  output: {
    path: path.resolve(__dirname, 'server/dist'),
    filename: 'get_events.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              typeCheck: true,
              fix: false,
              emitErrors: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: createBanner(),
    }),
    new WebpackBuildNotifierPlugin(),
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', 'css'],
  },
  externals: {
    puppeteer: 'require("puppeteer")',
    fs: 'require("fs")',
  },
};
