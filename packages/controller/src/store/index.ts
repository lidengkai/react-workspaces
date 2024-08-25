import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import appSlice from '~/flow/app/reducer';
import loginSlice from '~/flow/pages/login/reducer';
import testSlice from '~/flow/pages/test/reducer';
import testInfoModalSlice from '~/flow/modals/testInfoModal/reducer';

const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [loginSlice.name]: loginSlice.reducer,
    [testSlice.name]: testSlice.reducer,
    [testInfoModalSlice.name]: testInfoModalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger as any);
  },
});

export default store;
