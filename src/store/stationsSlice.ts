import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { PlayerId } from '../model/player';

export type StationsCountType = 0 | 1 | 2 | 3;

export type StationsState = {
  [K in PlayerId]: {
    count: StationsCountType,
    score: number;
  };
}

export interface StationsCountPayload {
  playerId: PlayerId;
  count: StationsCountType;
}

export const stationsSlice = createSlice({
  name: 'stations',
  initialState: {} as StationsState,
  reducers: {
    set: (state: Draft<StationsState>, action: PayloadAction<StationsCountPayload>) => {
      const payload = action.payload;
      const playerId = payload.playerId;
      state[playerId] = {
        count: action.payload.count,
        score: action.payload.count * 4,
      };
    },
  }
});

export const { set } = stationsSlice.actions;
