import { useState } from 'react'
import './App.css'
import EventPage from './pages/EventPage'
import { EventProvider } from './context/EventContext'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  

  return (

    <EventProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/AddEvent/:id' element={<EventPage/>}/>
        </Routes>
        </BrowserRouter>
    </EventProvider>

  )
}

export default App
