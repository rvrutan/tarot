import { useState } from 'react'
// import './App.css'
import Card from './components/Card'
// import 'm00.jpg' from '../../server/assets/cards'

function App() {
  const [count, setCount] = useState(0)
  const name = "Fool"
  const image = '/cards/m00.jpg'

  return (
    <>
    <Card name={name} image={image}/>
    </>
  )
}

export default App
