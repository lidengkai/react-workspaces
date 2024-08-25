import request from '~/utils/request';

/** 删除 */
const testDeleteApi = async (testId: number) => {
  await request({
    url: `test/${testId}`,
    method: 'delete',
  });
  return true;
};

export default testDeleteApi;
