import request from '~/utils/request';

/** 登出 */
const userLogoutApi = async () => {
  await request({
    url: 'user/logout',
    method: 'get',
  });
  return true;
};

export default userLogoutApi;
