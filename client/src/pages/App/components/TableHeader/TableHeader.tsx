import React from 'react';
import { Button, Input } from '@mui/material';
import { IMainReducerState } from '../../../../common/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/stores/hooks';
import {
  connectSocket,
  disconnectSocket,
  updateTimer,
} from '../../../../redux/actions/appActions';

const TableHeader = () => {
  const mainReducer: IMainReducerState = useAppSelector(
    (state) => state.mainReducer
  );
  const dispatch = useAppDispatch();
  const { socketConnectStatus, socketTimer } = mainReducer;
  const socketConnect = () => dispatch(connectSocket());
  const socketDisconnect = () => dispatch(disconnectSocket());
  const setTimer = (timer: string) => dispatch(updateTimer(timer));
  return (
    <>
      <>
        <h1>Socket Data</h1>
      </>
      <div className={'d-flex justify-content-between'}>
        {socketConnectStatus ? (
          <Button onClick={socketDisconnect}>Turn Off</Button>
        ) : (
          <Button onClick={socketConnect}>Turn On</Button>
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
          <Button disabled={socketConnectStatus} onClick={socketConnect}>
            Set Timer and Turn On
          </Button>
        </div>
      </div>
    </>
  );
};

export default TableHeader;
