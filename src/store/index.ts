import { configureStore } from '@reduxjs/toolkit'

import statsReducer from './slices/stats-slices'
import gameReducer from './slices/game-slices'

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    game: gameReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
