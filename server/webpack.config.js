// HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack = require('webpack')
// path = require('path')

// config = (configI) => {
//   configI.module.rules.push({
//     test: /\.cdc$/,
//     loader: 'raw-loader',
//   });
// };

// module.exports = config;

module.exports = function (options) {
  const config = {
    ...options,
  };

  config.module.rules.push({
    test: /\.cdc$/,
    loader: 'raw-loader',
  });

  return config;
};
