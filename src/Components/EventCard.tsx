import React from 'react'

const EventCard = () => {
  return (
    <div className='w-[270px] h-[350px] bg-white shadow-md rounded-[10px] p-3 mt-[19px]'>
        <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center gap-4'>
                <h1 className='font-semibold text-[18px]'>Meet with Johnson</h1>
                <div className='flex gap-3 items-center'>
                    <i className="fa-regular fa-calendar text-[18px]"></i>
                    <div className='w-[170px] py-4 bg-gray-100 rounded-[8px]'></div>
                </div>
                <div className='flex gap-3 items-center'>
                    <i className="fa-regular fa-clock text-[18px]"></i>
                    <div className='w-[170px] py-4 bg-gray-100 rounded-[8px]'></div>
                </div>
                <div className='flex gap-3 items-center'>
                    <i className="fa-solid fa-location-dot text-[20px]"></i>
                    <div className='w-[170px] py-4 bg-gray-100 rounded-[8px]'></div>
                </div>
                <div>

                </div>
                <button className='bg-black text-white rounded-md text-[18px] px-4 py-1'>Edit Event</button>
            </div>
        </div>
    </div>
  )
}

export default EventCard