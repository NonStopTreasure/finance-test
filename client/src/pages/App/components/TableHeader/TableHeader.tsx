import React from 'react';
import { Button, Input } from '@mui/material';
import { IMainReducerState } from '../../../../common/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/stores/hooks';
import {
  selectApp,
  disconnectSocket,
  updateTimer,
  connectSocket,
} from '../../../../redux/App/appSlice';

const TableHeader = () => {
  const app: IMainReducerState = useAppSelector(selectApp);
  const dispatch = useAppDispatch();

  const { socketConnectStatus, socketTimer } = app;
  const setTimer = (timer: string) => dispatch(updateTimer(timer));
  return (
    <>
      <>
        <h1>Socket Data</h1>
      </>
      <div className={'d-flex justify-content-between'}>
        {socketConnectStatus ? (
          <Button onClick={() => dispatch(disconnectSocket())}>Turn Off</Button>
        ) : (
          <Button onClick={() => dispatch(connectSocket())}>Turn On</Button>
        )}
        <div>
          <Input
            required
            type="number"
            disabled={socketConnectStatus}
            className="pe-2"
            value={socketTimer}
            onChange={(e) => setTimer(e.target.value)}
          />
          <Button
            disabled={socketConnectStatus}
            onClick={() => dispatch(connectSocket())}
          >
            Set Timer and Turn On
          </Button>
        </div>
      </div>
    </>
  );
};

export default TableHeader;
