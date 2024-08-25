import request from '~/utils/request';
import { UserInfo } from '~/types/user';

/** 用户信息 */
const userInfoApi = async () => {
  const res = await request({
    url: 'user/info',
    method: 'get',
  });
  const { id, role, username } = (res.data || {}) as UserInfo;
  return {
    id: id ?? 0,
    role: role ?? 0,
    username: username ?? '',
  };
};

export default userInfoApi;
