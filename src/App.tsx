import { useState } from 'react'
import './App.css'
import EventPage from './pages/EventPage'
import { EventProvider } from './context/EventContext'
function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <EventProvider>
      <EventPage/>
    </EventProvider>
  )
}

export default App
