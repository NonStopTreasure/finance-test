import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AppReducer from '../App/appSlice';

export const store = configureStore({
  reducer: {
    app: AppReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
