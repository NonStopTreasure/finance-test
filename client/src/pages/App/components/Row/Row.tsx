import React from 'react';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
  Box,
  Button,
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
import { ISocketData } from '@interfaces/index';
import moment from 'moment/moment';
import './Row.scss';
import { UpdateTypes } from '@enums/index';

const Row = (props: { row: ISocketData; updateIgnoreList: () => void }) => {
  const { row, updateIgnoreList } = props;
  const [open, setOpen] = React.useState(false);
  const changePercentFixed = (row.change_percent * 100).toFixed(2);
  const UpdateChanger = (status: UpdateTypes) => {
    if (status === UpdateTypes.none) {
      return <AcUnitIcon />;
    }
    if (status === UpdateTypes.increase) {
      return <ArrowCircleUpOutlinedIcon color={'success'} />;
    }
    if (status === UpdateTypes.decrease) {
      return <ArrowCircleDownOutlinedIcon color={'error'} />;
    }
  };

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
        <TableCell align="right">
          <div className={'d-flex align-items-center justify-content-end'}>
            <p className="row-update-status">{row.price}</p>
            {UpdateChanger(row.update_status)}
          </div>
        </TableCell>
        <TableCell align="right">{row.change}</TableCell>
        <TableCell align="right">{changePercentFixed + '%'}</TableCell>
        <TableCell align="center">
          <Button onClick={updateIgnoreList}>Ignore</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={'pb-0 pt-0'} colSpan={6}>
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
