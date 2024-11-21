import { useSelector } from 'react-redux'

import type { RootState } from '../store'

import '../styles/Stats.css'

export const Stats = () => {
  const stats = useSelector((state: RootState) => state.stats)

  return (
    <div className="stats-wrapper">
      <h1 className="stats-title">Status Bar</h1>
      <div className="stats">
        <p>Game difficulte: {Math.floor(stats.score / 10) + 1}</p>
        <p>Score: {stats.score} / 100</p>
        <p>Your failed: {stats.fail} / 3</p>
      </div>
    </div>
  )
}
