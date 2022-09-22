import React from 'react';
import { Chip } from '@mui/material';
import { IMainReducerState } from '../../../../common/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/stores/hooks';
import {
  selectApp,
  disconnectSocket,
  updateIgnoreList,
} from '../../../../redux/App/appSlice';

const IgnoreList = () => {
  const app: IMainReducerState = useAppSelector(selectApp);
  const dispatch = useAppDispatch();
  const { ignoreList } = app;
  const popFromIgnoreList = (ignoreItem: string) => {
    dispatch(disconnectSocket());
    const newIgnoreList: string[] = [...ignoreList];
    const res = newIgnoreList.filter((item: string) => !item.match(ignoreItem));
    dispatch(updateIgnoreList(res));
  };
  return (
    <div className={'d-flex mt-4 justify-content-between align-items-center'}>
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
              onDelete={() => popFromIgnoreList(ticker)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IgnoreList;
