const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config.common');
const packageJSON = require('./package.json');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: `${packageJSON.name}-${packageJSON.version}.[name].min.js`,
  },
  module: {
    rules: [
      {
        test: /\.(c|pc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:8]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './style.css',
      chunkFilename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, 'src/template/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html'),
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        terserOptions: {
          cache: false,
          parallel: true,
          sourceMap: false,
          keep_classnames: true,
          drop_console: true,
        },
      }),
    ],
  },
});
