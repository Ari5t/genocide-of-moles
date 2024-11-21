import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const GAME_NAME = 'game'
export const MAX_MOLES = 6

export interface GameState {
  activeMole: number | null
  pause: number | null
}

const initialState: GameState = {
  activeMole: null,
  pause: null,
}

export const gameSlice = createSlice({
  name: GAME_NAME,
  initialState,
  reducers: {
    setMole: (state, action: PayloadAction<number | null>) => {
      state.activeMole = action.payload
    },
    setRandomMole: (state) => {
      state.activeMole = Math.floor(Math.random() * MAX_MOLES)
    },
    setPause: (state, action: PayloadAction<number | null>) => {
      state.pause = action.payload
    },
  },
})

export const { setMole, setPause, setRandomMole } = gameSlice.actions

export default gameSlice.reducer
