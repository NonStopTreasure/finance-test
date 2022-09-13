import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import './App.scss';
import Loader from '../../shared/Loader';
import { LoaderTypes } from '../../common/enums';
import Header from '../../shared/Header';
import Row from './components/Row';

const mockData = () => [
  {
    ticker: 'TSLA',
    exchange: 'NASDAQ',
    price: 272.13,
    change: 158.76,
    change_percent: 0.1,
    dividend: 0.96,
    yield: 1.0,
    last_trade_time: '2021-04-30T11:53:21.000Z',
  },
  {
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 279.29,
    change: 64.52,
    change_percent: 0.84,
    dividend: 0.56,
    yield: 1.34,
    last_trade_time: '2021-04-30T11:53:21.000Z',
  },
];

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader type={LoaderTypes.circle} />;
  }
  return (
    <div className="app-main__div">
      <Header />
      <div className="app-content">
        <h1>Socket Data</h1>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Ticker</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Change</TableCell>
                <TableCell align="center">Change Percent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData().map((row) => (
                <Row key={row.ticker} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default App;
