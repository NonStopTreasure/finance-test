import { AnyAction } from 'redux';
import {
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  UPDATE_IGNORE_LIST,
  UPDATE_TICKERS,
  UPDATE_TIMER,
} from '../../actions/actionTypes';
import socket from '../../../api/socket';
import { IMainReducerState } from '../../../common/interfaces';
import { quotesHandler } from './utils';

export const initialState: IMainReducerState = {
  socketData: [],
  ignoreList: [],
  socketTimer: '5',
  isSocketLoading: false,
  socketConnectStatus: false,
};

export const mainReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_TICKERS:
      return {
        ...state,
        socketData: quotesHandler(state.socketData, action.payload),
      };
    case CONNECT_SOCKET:
      socket.connect();
      socket.emit('start', {
        timer: Number(state.socketTimer) * 1000,
        ignoreList: state.ignoreList,
      });
      return {
        ...state,
        socketConnectStatus: true,
        isSocketLoading: false,
      };
    case DISCONNECT_SOCKET:
      socket.disconnect();
      return {
        ...state,
        socketConnectStatus: false,
        isSocketLoading: false,
      };
    case UPDATE_IGNORE_LIST:
      return { ...state, ignoreList: action.payload };
    case UPDATE_TIMER:
      return { ...state, socketTimer: action.payload };
    default:
      return state;
  }
};
