import React from 'react'
import SearchBar from '../Components/SearchBar'
import ToggleButton from '../Components/ToggleButton'

const Home = () => {
  return (
    <div className='px-[100px]'>

        <div className='flex justify-between mt-[20px] text-white'>
            <ToggleButton/>
            <SearchBar/>
            <button className='bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-500'>Add Event</button>
            <button className='bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-500'>Settings</button>
        </div>

    </div>
  )
}

export default Home