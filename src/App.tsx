import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import Mole from './components/Mole'

import {
  MAX_MOLES,
  setActiveMole,
  setPause,
  setRandomActiveMole,
  setSelectedMole,
} from './store/slices/game-slices'

import type { RootState } from './store'
import './styles/App.css'
import { Stats } from './components/Stats'
import { failIncrement, scoreIncrement } from './store/slices/stats-slices'

function App() {
  const [isStart, setIsStart] = useState(false)
  const [isStopped, setIsStopped] = useState(false)
  const dispatch = useDispatch()

  const score = useSelector((state: RootState) => state.stats.score)
  const fail = useSelector((state: RootState) => state.stats.fail)

  const pause = useSelector((state: RootState) => state.game.pause)
  const activeMole = useSelector((state: RootState) => state.game.activeMole)
  const selectedMole = useSelector(
    (state: RootState) => state.game.selectedMole
  )

  const handleStart = useCallback(async () => {
    setIsStart(true)
  }, [])

  useEffect(() => {
    if (!isStart || isStopped) return

    const interval = setInterval(() => {
      if (score === 100 || fail === 3) {
        setIsStopped(true)
      }

      if (selectedMole === activeMole && selectedMole !== null) {
        dispatch(setSelectedMole(null))
        dispatch(setActiveMole(null))
        dispatch(setPause(moment().add(1, 's').unix()))
        dispatch(scoreIncrement())
      }

      if (selectedMole !== activeMole && selectedMole !== null) {
        dispatch(setSelectedMole(null))
        dispatch(setActiveMole(null))
        dispatch(setPause(moment().add(1, 's').unix()))
        dispatch(failIncrement())
      }

      if (Number(pause) > moment().unix()) {
        return
      }

      if (activeMole === null) {
        dispatch(setPause(moment().add(4, 's').unix()))
        dispatch(setRandomActiveMole())

        return
      }

      dispatch(setActiveMole(null))
      dispatch(failIncrement())
      dispatch(setPause(moment().add(1, 's').unix()))
    }, 200)

    return () => clearInterval(interval)
  }, [activeMole, dispatch, fail, isStart, isStopped, pause, score, selectedMole])

  return (
    <div className="main" onClick={!isStart ? handleStart : () => {}}>
      <h1 className="title">Genocide Of Moles</h1>
      <div className="scene-wrapper">
        {isStart ? (
          <>
            <div className="scene">
              {[...Array(MAX_MOLES)].map((_e, i) => (
                <Mole id={i} key={i}></Mole>
              ))}
            </div>
            <Stats />
          </>
        ) : (
          <p>press to start</p>
        )}
      </div>
    </div>
  )
}

export default App
