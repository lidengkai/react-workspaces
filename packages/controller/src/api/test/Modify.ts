import request from '~/utils/request';

/** 修改 */
const testModifyApi = async (
  testId: number,
  data: {
    name?: string;
    status?: number;
    value?: string;
  }
) => {
  await request({
    url: `test/${testId}`,
    method: 'put',
    data,
  });
  return true;
};

export default testModifyApi;
