import request from '~/utils/request';
import { TestItem } from '~/types/test';

/** 详情 */
const testInfoApi = async (testId: number) => {
  const res = await request({
    url: `test/${testId}`,
    method: 'get',
  });
  const { id, name, status, value } = (res.data || {}) as TestItem;
  return {
    id: id ?? 0,
    name: name ?? '',
    status: status ?? null,
    value: value?.toString() ?? '',
  };
};

export default testInfoApi;
