import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import Mole from './components/Mole'

import {
  MAX_MOLES,
  setMole,
  setPause,
  setRandomMole,
} from './store/slices/game-slices'

import type { RootState } from './store'
import './styles/App.css'

function App() {
  const [isStart, setIsStart] = useState(false)
  const dispatch = useDispatch()

  const pause = useSelector((state: RootState) => state.game.pause)
  const activeMole = useSelector((state: RootState) => state.game.activeMole)

  const handleStart = useCallback(async () => {
    setIsStart(true)
  }, [])

  useEffect(() => {
    if (!isStart) return

    const interval = setInterval(() => {
      if (Number(pause) > moment().unix()) {
        return
      }

      if (!activeMole) {
        dispatch(setPause(moment().add(4, 's').unix()))
        dispatch(setRandomMole())

        return
      }

      dispatch(setMole(null))
      dispatch(setPause(moment().add(1, 's').unix()))
    }, 200)

    return () => clearInterval(interval)
  }, [activeMole, dispatch, isStart, pause])

  return (
    <div className="main" onClick={!isStart ? handleStart : () => {}}>
      <h1 className="title">Genocide Of Moles</h1>
      <div className="scene-wrapper">
        {isStart ? (
          <div className="scene">
            {[...Array(MAX_MOLES)].map((_e, i) => (
              <Mole id={i} key={i}></Mole>
            ))}
          </div>
        ) : (
          <p>press to start</p>
        )}
      </div>
    </div>
  )
}

export default App
