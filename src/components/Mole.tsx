import { useSelector } from 'react-redux'

import { RootState } from '../store'

import MoleImg from '../assets/mole.webp'
import '../styles/Mole.css'

interface IMoleProps {
  id: number
}

const Mole = ({ id }: IMoleProps) => {
  const activeMole = useSelector((state: RootState) => state.game.activeMole)

  return (
    <div className="mole-wrapper">
      {id === activeMole ? (
        <img className="mole-img" src={MoleImg} alt="mole" />
      ) : null}
    </div>
  )
}

export default Mole
