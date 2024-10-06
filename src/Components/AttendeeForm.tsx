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
  const [error,seterror] = useState({type: '', message: ''});


  const handleAttendeeChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAttendee((prev) => ({ ...prev, [name]: value }));
  });

  const isValidEmail = (email:string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const addAttendee = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(disabled) return;

    if(!newAttendee.name) {seterror({type:'name', message: 'Name is required'}); return};
    if(!newAttendee.email) {seterror({type:'email', message: 'Email is required'}); return}
    if(!isValidEmail(newAttendee.email)){seterror({type:'email', message: 'Invalid email format'}); return}
    
    seterror({type:'',message:''})
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
                {
                    error.type==='name' && (<p className='text-red-400'>{error.message}</p>)
                }
                <input
                  type="email"
                  name="email"
                  placeholder="Attendee Email"
                  className="formInput"
                  value={newAttendee.email}
                  onChange={handleAttendeeChange}
                />
                {
                    error.type==='email' && (<p className='text-red-400'>{error.message}</p>)
                }
                <button disabled={disabled} onClick={addAttendee} className={`${disabled? "bg-green-300":"bg-green-500"} text-white px-4 py-2 rounded`}>
                  Add 
                </button>
              </div>)}
            </div>
  )
}

export default AttendeeForm