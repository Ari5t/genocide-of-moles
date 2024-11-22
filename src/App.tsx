import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import Mole from './components/Mole'
import { Stats } from './components/Stats'
import { Modal } from './components/Modal'

import {
  MAX_MOLES,
  setActiveMole,
  setIsStart,
  setIsStopped,
  setPause,
  setRandomActiveMole,
  setSelectedMole,
} from './store/slices/game-slices'
import { failIncrement, scoreIncrement } from './store/slices/stats-slices'
import type { RootState } from './store'

import './styles/App.css'

function App() {
  const dispatch = useDispatch()

  const score = useSelector((state: RootState) => state.stats.score)
  const fail = useSelector((state: RootState) => state.stats.fail)

  const isStart = useSelector((state: RootState) => state.game.isStart)
  const isStopped = useSelector((state: RootState) => state.game.isStopped)
  const pause = useSelector((state: RootState) => state.game.pause)
  const activeMole = useSelector((state: RootState) => state.game.activeMole)
  const selectedMole = useSelector(
    (state: RootState) => state.game.selectedMole
  )

  const handleStart = useCallback(async () => {
    dispatch(setIsStart(true))
  }, [dispatch])

  useEffect(() => {
    if (!isStart || isStopped) return

    const interval = setInterval(() => {
      if (score === 100 || fail === 3) {
        dispatch(setIsStopped(true))
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
  }, [
    activeMole,
    dispatch,
    fail,
    isStart,
    isStopped,
    pause,
    score,
    selectedMole,
  ])

  return (
    <>
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
      <Modal />
    </>
  )
}

export default App
