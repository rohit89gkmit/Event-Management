import React, {useContext, useState } from 'react'
import { attendeeType } from '../constants/declarations';
import { EventContext } from '../context/EventContext';
interface MyComponentProps {
    limit: number

  }
const AttendeeForm = ({}:MyComponentProps) => {
  
  const {attendeesList,disabled,addAttendeeToList} = useContext(EventContext);

  const [showAttendeeForm, setshowAttendeeForm] = useState<boolean>(false);
  const [newAttendee, setNewAttendee] = useState<attendeeType>({ name: '', email: '' });
  


  const handleAttendeeChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAttendee((prev) => ({ ...prev, [name]: value }));
  });

  const addAttendee = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(disabled) return
    
    const isAttendeeExists = attendeesList.some(({email}) => email === newAttendee.email )

    if(!isAttendeeExists) {
      addAttendeeToList(newAttendee);     
      setNewAttendee({name: '', email: ''});
    }
    else{
      alert('this email is already taken');
    }
  });


    
  return (
    <div className='flex flex-col gap-3'>
          <button onClick={()=> setshowAttendeeForm(!showAttendeeForm)} className="text-[18px] bg-blue-500 p-2 rounded-md cursor-pointer text-white mt-4">Add Attendees</button>
              {showAttendeeForm && (<div className="flex flex-col gap-3">
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
              </div>)}
            </div>
  )
}

export default AttendeeForm