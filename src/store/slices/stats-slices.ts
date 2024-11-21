import { createSlice } from '@reduxjs/toolkit'

const STAST_NAME = 'stats'

export interface StatsState {
  score: number
  fail: number
}

const initialState: StatsState = {
  score: 0,
  fail: 0,
}

export const statsSlice = createSlice({
  name: STAST_NAME,
  initialState,
  reducers: {
    failIncrement: (state) => {
      state.fail += 1
    },
    scoreIncrement: (state) => {
      state.score += 1
    },
  },
})

export const { failIncrement, scoreIncrement } = statsSlice.actions

export default statsSlice.reducer
