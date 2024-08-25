// @ts-check
const path = require('path');
const CONTEXT = process.cwd();
const { name, version } = require(path.join(CONTEXT, 'package.json'));
const mode = process.env.NODE_ENV;

module.exports.ENV_PRODUCTION = 'production';
module.exports.ENV_DEVELOPMENT = 'development';
module.exports.CONTEXT = CONTEXT;
module.exports.mode = mode;
module.exports.name = name;
module.exports.version = version;

module.exports.isH5 = name === 'project-h5';
module.exports.isDev = mode === module.exports.ENV_DEVELOPMENT;
module.exports.env = module.exports.isDev
  ? 'watch'
  : process.env.APP_ENV === 'dev'
  ? 'dev'
  : process.env.APP_ENV === 'test'
  ? 'test'
  : 'prod';

/** 接口 */
module.exports.apiList = {
  /** 调试环境 */
  watch: {
    1: '/api',
  },
  /** 开发环境 */
  dev: {
    1: process.env.npm_config_set_url1 || '/api',
  },
  /** 测试环境 */
  test: {
    1: process.env.npm_config_set_url1 || '/api',
  },
  /** 生产环境 */
  prod: {
    1: '/api',
  },
};
