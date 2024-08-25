type ApiType = typeof APP_API;

/** 开发环境 */
const dev: ApiType = {
  1: 'http://127.0.0.1:10138/mock',
  // 1: '/api',
};

/** 测试环境 */
const test: ApiType = {
  1: '/api',
};

/** 调试 */
const watch = {
  ...dev,
  // ...test,
};

/** 接口 */
export const API: ApiType =
  process.env.NODE_ENV === 'production' ? APP_API : watch;
