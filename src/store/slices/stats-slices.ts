import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const STAST_NAME = 'stats'

interface IValues {
  difficulte: number
  score: number
  fail: number
}

export interface StatsState {
  value: IValues
}

const initialState: StatsState = {
  value: {
    difficulte: 1,
    score: 0,
    fail: 0,
  },
}

export const statsSlice = createSlice({
  name: STAST_NAME,
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<IValues>) => {
      state.value = action.payload
    },
  },
})

export const { setStats } = statsSlice.actions

export default statsSlice.reducer
