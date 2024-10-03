import React, { useState } from 'react'
import App from '../App.css'
import { formFieldArr } from '../constants/FormFields'

interface formData{
  title: string,
  date: Date,
  description: string,
  limit: number,
  location: string
}



const EventForm = () => {
  const [formData, setFormData] = useState<formData>()

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    
  }

  return (
    <div className='flex justify-center items-center mt-[100px]'>
      <form>
        <div className='flex flex-col gap-3'>

          {
            formFieldArr.map(({fieldName, type, required, errorMessage,name})=>{
              return (
                <div>

                  <div className='flex gap-[1px]'>
                    <h1 className='text-[18px]'>{fieldName}</h1>
                    {required && <p className='text-red-500'>*</p>}
                  </div>
                  <input onChange={handleChange} name={name} className='formInput' type={type}/>

                </div>
              )
            })
          }

          <button className='w-[400px] h-[40px] text-[18px] text-white rounded-sm bg-blue-500'>Add Event</button>

        </div>

      </form>
    </div>
  )
}

export default EventForm