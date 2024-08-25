import { createSlice } from '@reduxjs/toolkit';
import { name, initialState } from './constant';
import { StateInterface } from './interface';
import { fetchTestList, fetchTestDelete, fetchTestModify } from './actions';

export const testSlice = createSlice({
  name,
  initialState,
  reducers: {
    destroy: () => {
      return initialState;
    },
    commit: (state, action: { payload: Partial<StateInterface> }) => {
      Object.assign(state, action.payload);
    },
    commitSearch: (
      state,
      action: { payload: Partial<StateInterface['search']> }
    ) => {
      Object.assign(state.search, action.payload);
    },
    commitInfo: (
      state,
      action: { payload: Partial<StateInterface['infoModal']> }
    ) => {
      Object.assign(state.infoModal, action.payload);
    },
  },
  extraReducers: (builder) => {
    // 列表
    builder
      .addCase(fetchTestList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTestList.rejected, (state) => {
        state.loading = false;
      });
    // 删
    builder
      .addCase(fetchTestDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestDelete.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTestDelete.rejected, (state) => {
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
  },
});

export default testSlice;

export const { destroy, commit, commitSearch, commitInfo } = testSlice.actions;
