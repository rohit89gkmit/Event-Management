import React, { useEffect, useContext, useState } from 'react'
import { formDataType,attendeeType } from '../constants/declarations'
import { formFieldArr } from '../constants/FormFields'
import AttendeesList from './AttendeesList';
import { EventContext } from '../context/EventContext';
import { v4 as uuidv4 } from 'uuid';
import AttendeeForm from './AttendeeForm';
import { useParams } from 'react-router-dom';

const EventForm = () => {
  const {attendeesList,formData,setFormData,addEvent,addAttendeeToList} = useContext(EventContext);

  const list = JSON.parse(localStorage.getItem('EventList') as string);
  const {id} = useParams();

  useEffect(() => {
    if (id && list) {
      const dataToUpdate = list.find((event: formDataType) => event.id === id);
      if (dataToUpdate) {
        setFormData(dataToUpdate); 
      }
    }
  }, [id]);
  
  const [submit, setsubmit]  = useState<boolean>(false);

  const handleFormChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleAddEvent = (e:React.FormEvent<HTMLFormElement>)=>{

    e.preventDefault();
    setsubmit(true);

    if(formData.title && formData.limit && formData.location){
      addEvent(formData);
      setFormData({
        id: uuidv4(),
        title: '',
        date: new Date(),
        description: '',
        limit: 2,
        location: '',
        attendees: []
    })
    setsubmit(false)
    alert('Event added successfully');
    } 
  }


  return (
    <div className='flex justify-center items-center mt-[100px]'>

      <div className='flex gap-[100px]'>
        <form onSubmit={handleAddEvent}>
          <div className='flex flex-col gap-3'>
            {
              formFieldArr.map(({fieldName, type, required, errorMessage,name},idx)=>{
                return (
                  <div key={idx} >

                    <div className='flex gap-[1px]'>
                      <h1 className='text-[18px]'>{fieldName}</h1>
                      {required && <p className='text-red-500'>*</p>}
                    </div>
                    <input 
                      onChange={handleFormChange} 
                      name={name} 
                      className='formInput' 
                      type={type}
                      value={formData[name as keyof formDataType] as string | number }
                      />
                      
                    {(submit && !formData[name as keyof formDataType]) && (<p className='text-red-600'>{errorMessage}</p>)}
                  </div>
                )
              }) 
            }
            <button type='submit' className='w-[400px] h-[40px] text-[18px] text-white rounded-sm bg-blue-500'>Add Event</button>
          </div>
        </form>

        <AttendeeForm limit={formData.limit}/>

        {attendeesList.length > 0 && (
                <AttendeesList/>
              )} 
        </div>

    </div>
  )
}

export default EventForm