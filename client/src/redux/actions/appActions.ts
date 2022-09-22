import {
  UPDATE_TICKERS,
  UPDATE_IGNORE_LIST,
  UPDATE_TIMER,
  DISCONNECT_SOCKET,
  CONNECT_SOCKET,
} from './actionTypes';
import { IAppAction, ISocketData } from '../../common/interfaces';

export const updateTickers = (tickers: ISocketData[]): IAppAction => ({
  type: UPDATE_TICKERS,
  payload: tickers,
});

export const updateIgnoreList = (ignoreList: string[]): IAppAction => ({
  type: UPDATE_IGNORE_LIST,
  payload: ignoreList,
});
export const updateTimer = (timer: string): IAppAction => ({
  type: UPDATE_TIMER,
  payload: timer,
});

export const connectSocket = (): IAppAction => ({
  type: CONNECT_SOCKET,
});

export const disconnectSocket = (): IAppAction => ({
  type: DISCONNECT_SOCKET,
});
