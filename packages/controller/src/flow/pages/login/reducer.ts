import { createSlice } from '@reduxjs/toolkit';
import { name, initialState } from './constant';
import { StateInterface } from './interface';
import { fetchUserLogin } from './actions';

export const loginSlice = createSlice({
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
    // 登录
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserLogin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserLogin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default loginSlice;

export const { destroy, commit } = loginSlice.actions;
