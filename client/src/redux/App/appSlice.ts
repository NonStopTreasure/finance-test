import { IMainReducerState } from '../../common/interfaces';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import socket from '../../api/socket';
import { RootState } from '../stores/rootStore';
import { quotesHandler } from './utils';

export const initialState: IMainReducerState = {
  socketData: [],
  ignoreList: [],
  socketTimer: '5',
  isSocketLoading: true,
  socketConnectStatus: false,
};

export const connectSocket = createAsyncThunk(
  'app/connectSocket',
  async (_agr, thunkAPI) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { socketTimer, ignoreList } = selectApp(thunkAPI.getState());
    socket.connect();
    socket.emit('start', {
      timer: Number(socketTimer) * 1000,
      ignoreList: ignoreList,
    });
  }
);
export const disconnectSocket = createAsyncThunk(
  'app/disconnectSocket',
  async () => {
    socket.disconnect();
  }
);

export const updateSocketData = createAsyncThunk(
  'app/updateSocketData',
  (_arg, thunkAPI) => {
    socket.on('ticker', (quotes) => {
      thunkAPI.dispatch(appSlice.actions.updateTickers(quotes));
    });
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateIgnoreList: (state, action: PayloadAction<string[]>) => {
      state.ignoreList = action.payload;
    },
    updateTimer: (state, action: PayloadAction<string>) => {
      state.socketTimer = action.payload;
    },
    updateTickers: (state, action) => {
      state.socketData = quotesHandler(state.socketData, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectSocket.pending, (state) => {
      state.isSocketLoading = true;
    });
    builder.addCase(connectSocket.fulfilled, (state) => {
      state.socketConnectStatus = true;
      state.isSocketLoading = false;
    });
    builder.addCase(disconnectSocket.pending, (state) => {
      state.isSocketLoading = true;
    });
    builder.addCase(disconnectSocket.fulfilled, (state) => {
      state.socketConnectStatus = false;
      state.isSocketLoading = false;
    });
  },
});

export const { updateIgnoreList, updateTimer } = appSlice.actions;

export const selectApp = (state: RootState) => state.app;
export default appSlice.reducer;
