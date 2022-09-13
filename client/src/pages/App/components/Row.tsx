import React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import moment from 'moment/moment';
import './Row.scss';
const Row = (props: {
  row: {
    ticker: string;
    exchange: string;
    price: number;
    change: number;
    change_percent: number;
    dividend: number;
    yield: number;
    last_trade_time: string;
  };
}) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell className="ticker__cell" component="th" scope="row">
          <p className="ticker__p">{row.ticker}</p>
        </TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.change}</TableCell>
        <TableCell align="center">{row.change_percent}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                More Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Exchange</TableCell>
                    <TableCell align="center">Dividend</TableCell>
                    <TableCell align="right">Yield</TableCell>
                    <TableCell align="center">Last Time Trade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className="exchange__cell">
                      <p className="exchange__p">{row.exchange}</p>
                    </TableCell>
                    <TableCell align="center">{row.dividend}</TableCell>
                    <TableCell align="right">{row.yield}</TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {moment(row.last_trade_time).format(
                        'DD/MMMM/yyyy - hh:mm:ss'
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
