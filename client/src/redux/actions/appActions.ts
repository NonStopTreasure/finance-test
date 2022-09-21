import { GET_TICKERS } from './actionTypes';
import { ISocketData } from '../../common/interfaces';
export interface IGetTickersAction {
  type: string;
  payload: ISocketData[];
}
export const getTickers = (tickers: ISocketData[]): IGetTickersAction => ({
  type: GET_TICKERS,
  payload: tickers,
});
