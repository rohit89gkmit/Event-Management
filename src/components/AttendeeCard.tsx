import React, { useContext } from 'react'
import { attendeeType } from '../constants/declarations'
import { EventContext } from '../context/EventContext'

const AttendeeCard = ({name,email} : attendeeType) => {
    const {removeAttendeeFromList} = useContext(EventContext);
  return (
    <div className='flex gap-[20px] items-center'>
        <div>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
        </div>
        <div className='flex gap-4'>
            <button className='border-[2px] border-gray-300 px-2'>Edit</button>
            <button onClick={()=>removeAttendeeFromList(email)} className='border-[2px] border-gray-300 px-2'>Delete</button>
        </div>
    </div>
  )
}

export default AttendeeCard