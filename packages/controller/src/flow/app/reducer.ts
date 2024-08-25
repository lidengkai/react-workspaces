import { createSlice } from '@reduxjs/toolkit';
import { name, initialState } from './constant';
import { StateInterface } from './interface';
import { fetchUserInfo } from './actions';

export const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    destroy: () => {
      return initialState;
    },
    commit: (state, action: { payload: Partial<StateInterface> }) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    // 用户信息
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.id = payload.id;
        state.role = payload.role;
        state.username = payload.username;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default appSlice;

export const { destroy, commit } = appSlice.actions;
