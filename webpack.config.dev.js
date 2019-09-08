const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const packageJSON = require('./package.json');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: `${packageJSON.name}-${packageJSON.version}.dev.js`,
  },
  module: {
    rules: [
      {
        test: /\.(pc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
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
    ]
  },
  devServer: {
    https: true,
    contentBase: __dirname + '/dist',
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
});
