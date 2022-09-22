import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Loader from '../../shared/Loader';
import { LoaderTypes } from '../../common/enums';
import Header from '../../shared/Header';
import Row from './components/Row/Row';
import { IMainReducerState, ISocketData } from '../../common/interfaces';
import './App.scss';
import socket from '../../api/socket';
import { useAppDispatch, useAppSelector } from '../../redux/stores/hooks';
import {
  updateTickers,
  updateIgnoreList,
  connectSocket,
  disconnectSocket,
} from '../../redux/actions/appActions';
import TableHeader from './components/TableHeader/TableHeader';
import IgnoreList from './components/IgnoreList/IgnoreList';

const App = () => {
  const mainReducer: IMainReducerState = useAppSelector(
    (state) => state.mainReducer
  );
  const { socketData, isSocketLoading, ignoreList } = mainReducer;
  const dispatch = useAppDispatch();
  const socketConnect = () => dispatch(connectSocket());
  const setTickers = (tickers: ISocketData[]) =>
    dispatch(updateTickers(tickers));
  const socketDisconnect = () => dispatch(disconnectSocket());

  const pushToIgnoreList = (ignoreItem: string) => {
    socketDisconnect();
    const newIgnoreList: string[] = [...ignoreList];
    newIgnoreList.push(ignoreItem);
    dispatch(updateIgnoreList(newIgnoreList));
  };

  useEffect(() => {
    socketConnect();
  }, [ignoreList]);

  useEffect(() => {
    socket.on('ticker', (quotes) => {
      setTickers(quotes);
    });
  }, [socket]);

  if (isSocketLoading) {
    return (
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        width="100vw"
        height="100vh"
      >
        <Loader type={LoaderTypes.circle} />
      </Box>
    );
  }
  return (
    <div className="app-main__div">
      <Header />
      <div className="app-content">
        <TableHeader />
        {!socketData.length ? (
          <Loader type={LoaderTypes.skeleton} />
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">Ticker</TableCell>
                  <TableCell className={'pe-5'} align="right">
                    Price
                  </TableCell>
                  <TableCell align="right">Change</TableCell>
                  <TableCell align="right">Change Percent</TableCell>
                  <TableCell align="center">More</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {socketData.map((row) => (
                  <Row
                    key={row.ticker}
                    row={row}
                    updateIgnoreList={() => pushToIgnoreList(row.ticker)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <IgnoreList />
      </div>
    </div>
  );
};

export default App;
