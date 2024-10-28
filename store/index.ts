//Redux store setup
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { botReducer } from './botSlice';
import {workerReducer} from './workerSlice';
import {logReducer} from './logSlice';

export const makeStore = () => configureStore({
  reducer: {
    bots: botReducer,
    workers: workerReducer,
    logs: logReducer,
  },
  // Enable Redux DevTools extension in development mode
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
