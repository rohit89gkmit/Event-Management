import React from 'react'
import { formDataType } from '../constants/declarations'
import EventCard from './EventCard'

interface MyComponentProps {
    list: formDataType[]
  }
const EventsList = ({list} : MyComponentProps) => {
    // const eventList = JSON.parse(localStorage.getItem('EventList') as string)
  return (
    <div className='grid grid-cols-3 gap-x-6'>
        {
            list.map((event:formDataType)=>{
                return <EventCard id={event.id} title={event.title} date={event.date} location={event.location} key={event.id}/>
            })
        }
    </div>
  )
}

export default EventsList