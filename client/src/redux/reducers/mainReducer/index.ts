import { AnyAction } from 'redux';
import {
  RECONNECT_SOCKET,
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  IGNORE_TICKER,
  SET_TIMER,
} from '../../actions/actionTypes';
import { ISocketData } from '../../../common/interfaces';
export interface IMainReducerState {
  socketData: ISocketData[];
  ignoreList: string[];
  socketTimer: string;
  isSocketLoading: boolean;
  socketConnectStatus: boolean;
}
export const initialState: IMainReducerState = {
  socketData: [],
  ignoreList: [],
  socketTimer: '',
  isSocketLoading: false,
  socketConnectStatus: false,
};

export const mainReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CONNECT_SOCKET:
      return {
        ...state,
        socketConnectStatus: true,
        isSocketLoading: false,
      };
    case DISCONNECT_SOCKET:
      return {
        ...state,
        socketConnectStatus: false,
        isSocketLoading: false,
      };
    case RECONNECT_SOCKET:
      return {
        ...state,
        socketConnectStatus: true,
        isSocketLoading: false,
      };
    case IGNORE_TICKER:
      return { ...state, ignoreList: action.payload };
    case SET_TIMER:
      return { ...state, socketTimer: action.payload };
    default:
      return state;
  }
};
