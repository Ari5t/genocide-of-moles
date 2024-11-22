import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

const GAME_NAME = 'game'
export const MAX_MOLES = 6

export interface GameState {
  activeMole: number | null
  selectedMole: number | null
  pause: number | null
  isStart: boolean
  isStopped: boolean
}

const initialState: GameState = {
  activeMole: null,
  selectedMole: null,
  pause: null,
  isStart: false,
  isStopped: false,
}

export const gameSlice = createSlice({
  name: GAME_NAME,
  initialState,
  reducers: {
    setRandomActiveMole: (state) => {
      state.activeMole = Math.floor(Math.random() * MAX_MOLES)
    },
    setSelectedMole: (state, action: PayloadAction<number | null>) => {
      state.selectedMole = action.payload
    },
    setPause: (state, action: PayloadAction<number | null>) => {
      state.pause = action.payload
    },
    setIsStopped: (state, action: PayloadAction<boolean>) => {
      state.isStopped = action.payload
    },
    setIsStart: (state, action: PayloadAction<boolean>) => {
      state.isStart = action.payload
    },

    restartMoles: (state) => {
      state.selectedMole = null
      state.activeMole = null
      state.pause = moment().add(1, 's').unix()
    },

    restartGame: () => {
      return { ...initialState, isStart: true }
    },
  },
})

export const {
  setPause,
  setRandomActiveMole,
  setSelectedMole,
  setIsStopped,
  setIsStart,
  restartGame,
  restartMoles,
} = gameSlice.actions

export default gameSlice.reducer
