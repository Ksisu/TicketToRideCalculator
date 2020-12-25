import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { PlayerId } from '../model/player';

export type LongestRouteState = {
  [K in PlayerId]: {
    selected: boolean,
    score: number;
  };
}

export interface LongestRouteStatePayload {
  playerId: PlayerId;
  selected: boolean;
}

export const longestRouteSlice = createSlice({
  name: 'longest_route',
  initialState: {} as LongestRouteState,
  reducers: {
    set: (state: Draft<LongestRouteState>, action: PayloadAction<LongestRouteStatePayload>) => {
      const payload = action.payload;
      const playerId = payload.playerId;
      state[playerId] = {
        selected: action.payload.selected,
        score: action.payload.selected ? 10 : 0,
      };
    },
  }
});

export const { set } = longestRouteSlice.actions;
