import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Loader from '../../shared/Loader';
import { LoaderTypes, UpdateTypes } from '../../common/enums';
import Header from '../../shared/Header';
import Row from './components/Row/Row';
import { ISocketData } from '../../common/interfaces';
import './App.scss';
import socket from '../../api/socket';

const App = () => {
  const [ignoreList, setIgnoreList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSocketLoading, setIsSocketLoading] = useState<boolean>(false);
  const [socketData, setSocketData] = useState<ISocketData[]>([]);
  const [tableData, setTableData] = useState<ISocketData[]>([]);
  const [socketTimer, setSocketTimer] = useState<string>('');
  const [socketConnectStatus, setSocketConnectStatus] =
    useState<boolean>(false);

  const onDeleteIgnoreList = (ticker: string) => {
    socket.disconnect();
    setSocketConnectStatus(false);
    const newIgnoreList = ignoreList.filter(
      (ignoreTicker) => ignoreTicker !== ticker
    );
    setIgnoreList(newIgnoreList);
  };
  const updateIgnoreList = (itemTicker: string) => {
    socket.disconnect();
    setSocketConnectStatus(false);
    const newIgnoreList = [...ignoreList];
    newIgnoreList.push(itemTicker);
    setIgnoreList(newIgnoreList);
  };
  const quotesHandler = (newQuotes: ISocketData[]) =>
    newQuotes.map((newItem) => {
      const oldItem = tableData.find((findItem) =>
        findItem.ticker.match(newItem.ticker)
      );
      newItem.update_status = UpdateTypes.none;
      if (oldItem && newItem.price >= oldItem.price) {
        newItem.update_status = UpdateTypes.increase;
      }
      if (oldItem && newItem.price <= oldItem.price) {
        newItem.update_status = UpdateTypes.decrease;
      }

      return newItem;
    });

  useEffect(() => {
    socket.connect();
    socket.emit('start', { ignoreList });
    setSocketConnectStatus(true);
    setIsLoading(false);
  }, [ignoreList]);

  useEffect(() => {
    setIsSocketLoading(true);
    socket.on('ticker', (quotes) => {
      setIsSocketLoading(false);
      setSocketData(quotes);
    });
  }, [socket]);

  useEffect(() => {
    setTableData(quotesHandler(socketData));
  }, [socketData]);

  if (isLoading) {
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
        <>
          <>
            <h1>Socket Data</h1>
          </>
          <div className={'d-flex justify-content-between'}>
            {socketConnectStatus ? (
              <Button
                onClick={() => {
                  setSocketConnectStatus(false);
                  socket.disconnect();
                }}
              >
                Turn Off
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setSocketConnectStatus(true);
                  socket.connect();
                  socket.emit('start');
                }}
              >
                Turn On
              </Button>
            )}

            <div>
              <Input
                type="number"
                disabled={socketConnectStatus}
                className="pe-2"
                value={socketTimer}
                onChange={(e) => {
                  setSocketTimer(e.target.value);
                }}
              />
              <Button
                disabled={socketConnectStatus}
                onClick={() => {
                  socket.connect();
                  setSocketConnectStatus(true);
                  socket.emit('start', { timer: Number(socketTimer) * 1000 });
                }}
              >
                Set Timer and Turn On
              </Button>
            </div>
          </div>

          {isSocketLoading ? (
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
                  {tableData.map((row) => (
                    <Row
                      key={row.ticker}
                      row={row}
                      updateIgnoreList={() => updateIgnoreList(row.ticker)}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
        <div
          className={'d-flex mt-4 justify-content-between align-items-center'}
        >
          <h1 className={'w-auto text-nowrap'}>Ignore List</h1>
          {!ignoreList.length ? (
            <h3 className={'me-2 w-100 text-end'}>No Item</h3>
          ) : (
            <div className={'w-50 d-flex justify-content-end flex-wrap'}>
              {ignoreList.map((ticker) => (
                <Chip
                  className="mt-1 mb-1 me-2"
                  key={ticker + '_ignore'}
                  label={ticker}
                  variant="outlined"
                  onDelete={() => onDeleteIgnoreList(ticker)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
