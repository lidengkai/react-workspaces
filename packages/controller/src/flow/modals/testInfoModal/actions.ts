import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './constant';
import message from '~/utils/message';
import { FormInterface } from './interface';
import testCreateApi from '~/api/test/Create';
import testInfoApi from '~/api/test/Info';
import testModifyApi from '~/api/test/Modify';

export const fetchTestCreate = createAsyncThunk(
  `${name}/fetch/testCreate`,
  async (data: FormInterface) => {
    try {
      return await testCreateApi(data);
    } catch (e: any) {
      message.error(e?.message || '服务器异常');
      throw e;
    }
  }
);

export const fetchTestModify = createAsyncThunk(
  `${name}/fetch/testModify`,
  async (data: FormInterface, { getState }) => {
    const { id } = getState().testInfoModal;
    if (id) {
      try {
        return await testModifyApi(id, data);
      } catch (e: any) {
        message.error(e?.message || '服务器异常');
        throw e;
      }
    }
  }
);

export const fetchTestInfo = createAsyncThunk(
  `${name}/fetch/testInfo`,
  async (_, { getState }) => {
    const { id } = getState().testInfoModal;
    if (id) {
      try {
        return await testInfoApi(id);
      } catch (e: any) {
        message.error(e?.message || '服务器异常');
        throw e;
      }
    }
  }
);
