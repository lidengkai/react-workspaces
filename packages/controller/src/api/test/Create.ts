import request from '~/utils/request';

/** 创建 */
const testCreateApi = async (data: { name: string; value: string }) => {
  await request({
    url: 'test',
    method: 'post',
    data,
  });
  return true;
};

export default testCreateApi;
