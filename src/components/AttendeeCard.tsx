import React, { useContext } from 'react'
import { attendeeType } from '../constants/declarations'
import { EventContext } from '../context/EventContext'

const AttendeeCard = ({name,email} : attendeeType) => {
    const {removeAttendeeFromList} = useContext(EventContext);  
  return (
    <div className='flex gap-[20px] items-center border-2 border-gray-400 p-2 rounded-md '>
        <div>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
        </div>
        <div className='flex gap-4'>
            <button onClick={()=>removeAttendeeFromList(email)} className='border-[2px] border-gray-300 px-2'>Remove</button>
        </div>
    </div>
  )
}

export default AttendeeCard