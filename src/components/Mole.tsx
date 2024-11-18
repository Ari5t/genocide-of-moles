import '../styles/Mole.css'

import MoleImg from '../assets/mole.webp'

function Mole() {
  return (
    <div className="mole-wrapper">
      <img className='mole-img' src={MoleImg} alt="mole" />
    </div>
  )
}

export default Mole
