import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './constant';
import testListApi from '~/api/test/List';
import testDeleteApi from '~/api/test/Delete';
import testModifyApi from '~/api/test/Modify';
import message from '~/utils/message';

export const fetchTestList = createAsyncThunk(
  `${name}/fetch/testList`,
  async (current: number, { getState }) => {
    try {
      const { pageSize, sort, order, search } = getState().test;
      return await testListApi(current, pageSize, {
        sort,
        order,
        name: search.value.name,
        status: search.value.status,
      });
    } catch (e: any) {
      message.error(e?.message || '服务器异常');
      throw e;
    }
  }
);

export const fetchTestDelete = createAsyncThunk(
  `${name}/fetch/testDelete`,
  async (id: number) => {
    try {
      return await testDeleteApi(id);
    } catch (e: any) {
      message.error(e?.message || '服务器异常');
      throw e;
    }
  }
);

export const fetchTestModify = createAsyncThunk(
  `${name}/fetch/testModify`,
  async (data: { id: number; status: number }) => {
    try {
      return await testModifyApi(data.id, { status: data.status });
    } catch (e: any) {
      message.error(e?.message || '服务器异常');
      throw e;
    }
  }
);
