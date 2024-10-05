import React, { useContext, useState } from 'react'
import { formDataType,attendeeType } from '../constants/declarations'
import { formFieldArr } from '../constants/FormFields'
import AttendeesList from './AttendeesList';
import { EventContext } from '../context/EventContext';
import { v4 as uuidv4 } from 'uuid';

const EventForm = () => {
  const {attendeesList,addEvent,addAttendeeToList} = useContext(EventContext);

  const [formData, setFormData] = useState<formDataType>({
    id: uuidv4(),
    title: '',
    date: new Date(),
    description: '',
    limit: 2,
    location: '',
    attendees: []
  });
  
  const [newAttendee, setNewAttendee] = useState<attendeeType>({ name: '', email: '' });

  const [submit, setsubmit]  = useState<boolean>(false);

  const [disabled, setdisabled] = useState<boolean>(false);

  const [showAttendeeForm, setshowAttendeeForm] = useState<boolean>(false);

  const handleFormChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
  }

  
  const handleAttendeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAttendee((prev) => ({ ...prev, [name]: value }));
  };

  

  const addAttendee = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault();
    if(disabled) return
    const isAttendeeExists = attendeesList.some(({email}) => email === newAttendee.email )
    if(!isAttendeeExists) {
      addAttendeeToList(newAttendee);
      if(attendeesList.length+1===Number(formData.limit)) setdisabled(true)
      setNewAttendee({name: '', email: ''});
    }
    else{
      alert('this email is already taken');
    }

  };

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

        <div className='flex flex-col gap-3'>
          <button onClick={()=> setshowAttendeeForm(!showAttendeeForm)} className="text-[18px] bg-blue-500 p-2 rounded-md cursor-pointer text-white mt-4">Add Attendees</button>
              {showAttendeeForm && <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Attendee Name"
                  className="formInput"
                  value={newAttendee.name}
                  onChange={handleAttendeeChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Attendee Email"
                  className="formInput"
                  value={newAttendee.email}
                  onChange={handleAttendeeChange}
                />
                <button disabled={disabled} onClick={addAttendee} className={`${disabled? "bg-green-300":"bg-green-500"} text-white px-4 py-2 rounded`}>
                  Add 
                </button>
              </div>}

              {attendeesList.length > 0 && (
                <AttendeesList/>
              )} 
            </div>
        </div>

    </div>
  )
}

export default EventForm