import '../styles/Mole.css'

import MoleImg from '../assets/mole.webp'

interface IMoleProps {
  active: boolean
}

const Mole = ({ active }: IMoleProps) => {
  return (
    <div className="mole-wrapper">
      {active ? <img className="mole-img" src={MoleImg} alt="mole" /> : null}
    </div>
  )
}

export default Mole
