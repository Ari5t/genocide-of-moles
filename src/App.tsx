import { useCallback, useState } from 'react'

import Mole from './components/Mole'

import { timeout } from './utils/timeout'

import './styles/App.css'

const moles = 6

function App() {
  const [isStart, setIsStart] = useState(false)
  const [activeMole, setActiveMole] = useState<number | null>(null)

  const handleStart = useCallback(async () => {
    setIsStart(true)

    while (true) {
      setActiveMole(null)
      await timeout(20)
      setActiveMole(Math.floor(Math.random() * moles))
      await timeout(4000)
    }
  }, [])

  return (
    <div className="main" onClick={!isStart ? handleStart : () => {}}>
      <h1 className="title">Genocide Of Moles</h1>
      <div className="scene-wrapper">
        {isStart ? (
          <div className="scene">
            {[...Array(moles)].map((_e, i) => (
              <Mole active={activeMole === i} key={i}></Mole>
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
