// @ts-check
const { merge } = require('webpack-merge');
const { isDev } = require('controller/build/config');
const devConfig = require('controller/build/webpack.dev');
const prodConfig = require('controller/build/webpack.prod');

module.exports = merge(isDev ? devConfig : prodConfig, {
  devServer: {
    port: 10178,
  },
});

// {
//   plugins: [
//     new webpack.container.ModuleFederationPlugin({
//       name: 'web_project',
//       filename: 'remoteEntry.js',
//       exposes: {},
//       shared: {
//         react: {
//           requiredVersion: envConfig.dependencies.react,
//           eager: true,
//         },
//         'react-router-dom': {
//           requiredVersion: envConfig.dependencies['react-router-dom'],
//           eager: true,
//         },
//       },
//     }),
//   ],
// }
