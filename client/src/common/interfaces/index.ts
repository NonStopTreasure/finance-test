import { UpdateTypes } from '../enums';

export interface ISocketData {
  update_status: UpdateTypes;
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: Date;
}

export interface IMainReducerState {
  socketData: ISocketData[];
  ignoreList: string[];
  socketTimer: string;
  isSocketLoading: boolean;
  socketConnectStatus: boolean;
}
