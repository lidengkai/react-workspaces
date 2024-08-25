import { createSlice } from '@reduxjs/toolkit';
import { name, initialState } from './constant';
import { StateInterface } from './interface';
import { fetchTestCreate, fetchTestModify, fetchTestInfo } from './actions';

export const testInfoModalSlice = createSlice({
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
    // 增
    builder
      .addCase(fetchTestCreate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestCreate.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTestCreate.rejected, (state) => {
        state.loading = false;
      });
    // 改
    builder
      .addCase(fetchTestModify.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestModify.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTestModify.rejected, (state) => {
        state.loading = false;
      });
    // 查
    builder
      .addCase(fetchTestInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestInfo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTestInfo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default testInfoModalSlice;

export const { destroy, commit } = testInfoModalSlice.actions;
