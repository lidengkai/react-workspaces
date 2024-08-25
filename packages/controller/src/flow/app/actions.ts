import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './constant';
import userInfoApi from '~/api/user/Info';
import message from '~/utils/message';

export const fetchUserInfo = createAsyncThunk(
  `${name}/fetch/userInfo`,
  async () => {
    try {
      return await userInfoApi();
    } catch (e: any) {
      message.error(e?.message || '服务器异常');
      throw e;
    }
  }
);
