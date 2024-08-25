import request from '~/utils/request';

/** 用户登录 */
const userLoginApi = async (data: { username: string; password: string }) => {
  await request({
    url: 'user/login',
    method: 'post',
    data,
  });
  return true;
};

export default userLoginApi;
