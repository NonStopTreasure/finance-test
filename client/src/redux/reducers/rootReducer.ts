import { combineReducers } from 'redux';
import { mainReducer } from './mainReducer';

const rootReducer = combineReducers({
  mainReducer: mainReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export default rootReducer;
