import { useState } from 'react'
import './App.css'
import EventPage from './pages/EventPage'
import { EventProvider } from './context/EventContext'
import Home from './pages/Home'


function App() {
  

  return (

    <EventProvider>
      <Home/>
      <EventPage/>
    </EventProvider>

  )
}

export default App
