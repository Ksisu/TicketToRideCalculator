import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { routesSlice, RoutesState } from './routesSlice';
import { stationsSlice, StationsState } from './stationsSlice';
import { longestRouteSlice, LongestRouteState } from './longestRouteSlice';
import { Action, AnyAction, CombinedState, Reducer } from 'redux';

export interface RootState {
  routes: RoutesState;
  stations: StationsState;
  longestRoute: LongestRouteState,
}

const appReducer: Reducer<CombinedState<RootState>> = combineReducers({
  routes: routesSlice.reducer,
  stations: stationsSlice.reducer,
  longestRoute: longestRouteSlice.reducer,
})

const CLEAR_ALL_TYPE = 'CLEAR_ALL';
export const clearAll: Action = {type: CLEAR_ALL_TYPE};

const rootReducer: Reducer<CombinedState<RootState>> = (state: CombinedState<RootState> | undefined, action: AnyAction) => {
  if (action.type === CLEAR_ALL_TYPE) {
    state = undefined;
  }

  return appReducer(state, action);
}

export const store = configureStore({
  reducer: rootReducer,
});