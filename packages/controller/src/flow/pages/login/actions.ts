import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './constant';
import userLoginApi from '~/api/user/Login';
import message from '~/utils/message';

export const fetchUserLogin = createAsyncThunk(
  `${name}/fetch/userLogin`,
  async (data: Parameters<typeof userLoginApi>[0], { dispatch }) => {
    try {
      return await userLoginApi(data);
    } catch (e: any) {
      message.error(e?.message || '服务器异常');
      throw e;
    }
  }
);
