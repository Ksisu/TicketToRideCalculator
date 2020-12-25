import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { PlayerId } from '../model/player';

export type RoutesState = {
  [K in PlayerId]: {
    [routeLength: number]: number;
    score: number;
  };
}

export interface RoutesLengthPayload {
  playerId: PlayerId;
  routeLength: number;
}

const calculateScore = (routes: {[routeLength: number]: number}): number => {
  return (routes[1] || 0) +
  (routes[2] || 0) * 2 +
  (routes[3] || 0) * 4 +
  (routes[4] || 0) * 7 +
  (routes[6] || 0) * 15 +
  (routes[8] || 0) * 21;
}

export const routesSlice = createSlice({
  name: 'routes',
  initialState: {} as RoutesState,
  reducers: {
    increment: (state: Draft<RoutesState>, action: PayloadAction<RoutesLengthPayload>) => {
      const payload = action.payload;
      const playerId = payload.playerId;
      const routeLength = payload.routeLength;
      state[playerId] = state[playerId] || {};
      state[playerId][routeLength] = state[playerId][routeLength] || 0;
      state[playerId][routeLength] += 1;
      state[playerId].score = calculateScore(state[playerId]);
    },
    decrement: (state: Draft<RoutesState>, action: PayloadAction<RoutesLengthPayload>) => {
      const payload = action.payload;
      const playerId = payload.playerId;
      const routeLength = payload.routeLength;
      state[playerId] = state[playerId] || {};
      if(!!state[playerId][routeLength]) {
        state[playerId][routeLength] -= 1;
        state[playerId].score = calculateScore(state[playerId]);
      }
    },
  }
});

export const { increment, decrement } = routesSlice.actions;
