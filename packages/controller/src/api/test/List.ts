import request from '~/utils/request';
import { TestItem } from '~/types/test';

/** 列表 */
const testListApi = async (
  current: number,
  pageSize: number,
  opts: {
    sort?: string;
    order?: string;
    name?: string;
    status?: number[];
    value?: number[];
  }
) => {
  const { sort, order, ...data } = opts;
  const res = await request({
    url: `test/${current}/${pageSize}`,
    method: 'post',
    params: { sort, order },
    data,
  });
  const {
    total,
    list,
    page = current,
    size = pageSize,
  } = (res.data || {}) as {
    total: number;
    list: TestItem[];
    page: number;
    size: number;
  };
  return {
    total: total ?? 0,
    list: list ?? [],
    page,
    size,
  };
};

export default testListApi;
