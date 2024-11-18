import './styles/App.css'
import Mole from './components/Mole'

const moles = 6

function App() {
  return (
    <>
      <h1 className="title">Genocide Of Moles</h1>
      <div className="scene-wrapper">
        <div className="scene">
          {[...Array(moles)].map((_e, i) => (
            <Mole key={i}></Mole>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
