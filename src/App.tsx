import { useState } from 'react'
import './App.css'
import EventPage from './pages/EventPage'
function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <EventPage/>
    </>
  )
}

export default App
