import React from 'react'
import SearchBar from '../components/SearchBar'
import ToggleButton from '../components/ToggleButton'
import { Link } from 'react-router-dom'
import EventSummary from '../components/EventSummary'
import EventCard from '../components/EventCard'
const Home = () => {
  return (
    <div className='px-[100px] bg-gray-50 h-screen'>

        <div className='flex justify-between mt-[20px] text-white'>
            <ToggleButton/>
            <SearchBar/>
            <Link to={`/AddEvent`}><button className='bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-500'>Add Event</button></Link>
            <button className='bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-500'>Settings</button>
        </div>
        <EventSummary/>
        <EventCard/>
    </div>
  )
}

export default Home