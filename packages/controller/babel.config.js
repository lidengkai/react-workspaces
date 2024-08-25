const { isH5 } = require('./build/config');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: isH5
          ? {
              chrome: '49',
              ios: '10',
            }
          : ['> 1%', 'last 2 versions', 'not ie <= 10'],
        useBuiltIns: 'usage',
        corejs: '3',
      },
    ],
    '@babel/react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
  ],
};
