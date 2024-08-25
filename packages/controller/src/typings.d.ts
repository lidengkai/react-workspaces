declare module '*.less' {
  const styles: Record<string, string>;
  export = styles;
}

declare module '*.css';

declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

declare module '*.mp4';
declare module '*.webm';
declare module '*.ogg';
declare module '*.mp3';
declare module '*.wav';
declare module '*.flac';
declare module '*.aac';

declare namespace process {
  const env: {
    NODE_ENV: 'development' | 'production';
  };
}

// declare const React: typeof import('react');

declare namespace React {}

declare type ReactNode = React.ReactNode;
declare type CSSProperties = React.CSSProperties;
declare type WithChildren = { children?: ReactNode };

declare const $APP_NAME: string;
declare const $APP_VERSION: string;
declare const $APP_MODE: 'development' | 'production';
declare const $APP_ENV: 'watch' | 'dev' | 'test' | 'prod';
declare const $APP_IS_H5: boolean;

declare type ControllableValue<
  T extends string,
  V
> = import('./hooks/useValue').default.ControllableValue<T, V>;

declare module 'react-redux' {
  export * from 'react-redux/es';
  import { TypedUseSelectorHook } from 'react-redux/es';
  type RootState = ReturnType<typeof import('./store').default.getState>;
  type RootDispatch = typeof import('./store').default.dispatch;
  export const useSelector: TypedUseSelectorHook<RootState>;
  export const useDispatch: () => RootDispatch;
}

declare module '@reduxjs/toolkit' {
  export * from '@reduxjs/toolkit/dist';
  import { createAsyncThunk as originalCreateAsyncThunk } from '@reduxjs/toolkit/dist';
  type RootState = ReturnType<typeof import('./store').default.getState>;
  type CreateAsyncThunk = ReturnType<
    typeof originalCreateAsyncThunk.withTypes<{ state: RootState }>
  >;
  export const createAsyncThunk: CreateAsyncThunk;
}

declare const APP_API: Record<keyof Api.Result, string>;

declare namespace Api {
  type Result = {
    1: {
      status: 1;
      message?: string;
      data?: any;
    };
  };
  type Error = {
    1?: Omit<Result[1], 'status'> & {
      status?: number;
    };
  };
}
