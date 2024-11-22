import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { restartStats } from '../store/slices/stats-slices'
import { restartGame } from '../store/slices/game-slices'
import type { RootState } from '../store'

import '../styles/Modal.css'

export const Modal = () => {
  const isStopped = useSelector((state: RootState) => state.game.isStopped)
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(restartStats())
    dispatch(restartGame())
  }, [dispatch])

  if (!isStopped) return

  return (
    <div className="modal-wrapper">
      <div className="modal-block">
        <h2 className="modal-title">Game Over</h2>
        <button onClick={handleClick} className="modal-button">
          Restart Game
        </button>
      </div>
    </div>
  )
}
