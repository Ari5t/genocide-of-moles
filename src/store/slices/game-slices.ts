import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const GAME_NAME = 'game'
export const MAX_MOLES = 6

export interface GameState {
  activeMole: number | null
  selectedMole: number | null
  pause: number | null
}

const initialState: GameState = {
  activeMole: null,
  selectedMole: null,
  pause: null,
}

export const gameSlice = createSlice({
  name: GAME_NAME,
  initialState,
  reducers: {
    setActiveMole: (state, action: PayloadAction<number | null>) => {
      state.activeMole = action.payload
    },
    setRandomActiveMole: (state) => {
      state.activeMole = Math.floor(Math.random() * MAX_MOLES)
    },
    setSelectedMole: (state, action: PayloadAction<number | null>) => {
      state.selectedMole = action.payload
    },
    setPause: (state, action: PayloadAction<number | null>) => {
      state.pause = action.payload
    },
  },
})

export const { setActiveMole, setPause, setRandomActiveMole, setSelectedMole } =
  gameSlice.actions

export default gameSlice.reducer
