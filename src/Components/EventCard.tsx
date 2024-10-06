import React from 'react'
import { formDataType } from '../constants/declarations'
import { Link } from 'react-router-dom';

interface MyComponentProps{
    id: string;
    title: string;
    date: Date;
    location: string;
} 
const EventCard = ({id,title,date,location}:MyComponentProps) => {

    const formatDateAndTime = (dateString: Date) => {
        const dateObj = new Date(dateString);
      
        const optionsDate: Intl.DateTimeFormatOptions = { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long', 
        };
        const formattedDate = dateObj.toLocaleDateString(undefined, optionsDate);
      
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes().toString().padStart(2, '0'); 
      
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; 
        const formattedTime = `${formattedHours} : ${minutes} ${period}`;
      
        return { formattedDate, formattedTime };
    };
    const { formattedDate, formattedTime } = formatDateAndTime(date);

  return (
    <div className='w-[250px] h-[350px] bg-white shadow-md rounded-[10px] p-3 mt-[19px]'>
        <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center gap-4'>
                <h1 className='font-semibold text-[18px]'>{title}</h1>
                <div className='flex gap-3 items-center'>
                    <i className="fa-regular fa-calendar text-[18px]"></i>
                    <div className='w-[170px] py-2 bg-gray-100  px-[6px] rounded-[8px]'>{formattedDate}</div>
                </div>
                <div className='flex gap-3 items-center'>
                    <i className="fa-regular fa-clock text-[18px]"></i>
                    <div className='w-[170px] py-2 bg-gray-100 rounded-[8px] px-[6px]'>{formattedTime}</div>
                </div>
                <div className='flex gap-3 items-center'>
                    <i className="fa-solid fa-location-dot text-[20px]"></i>
                    <div className='w-[170px] py-2 bg-gray-100 rounded-[8px] px-[6px]'>{location}</div>
                </div>
                <div>

                </div>
                <Link to={`/AddEvent/${id}`}><button className='bg-black text-white rounded-md text-[18px] px-4 py-1'>Edit Event</button></Link>
            </div>
        </div>
    </div>
  )
}

export default EventCard