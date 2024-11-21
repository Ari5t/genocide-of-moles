import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store'

import MoleImg from '../assets/mole.webp'
import '../styles/Mole.css'
import { useCallback } from 'react'
import { setSelectedMole } from '../store/slices/game-slices'

interface IMoleProps {
  id: number
}

const Mole = ({ id }: IMoleProps) => {
  const dispatch = useDispatch()
  const activeMole = useSelector((state: RootState) => state.game.activeMole)
  const selectedMole = useSelector(
    (state: RootState) => state.game.selectedMole
  )

  const handleClick = useCallback(() => {
    dispatch(setSelectedMole(id))
  }, [dispatch, id])

  return (
    <div
      className={`mole-wrapper ${
        selectedMole === activeMole && id === activeMole
          ? 'success'
          : selectedMole !== activeMole && id === selectedMole
          ? 'fail'
          : ''
      }`}
      onClick={handleClick}
    >
      {id === activeMole ? (
        <img className="mole-img" src={MoleImg} alt="mole" />
      ) : null}
    </div>
  )
}

export default Mole
