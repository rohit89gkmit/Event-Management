import React, { createContext, useState, ReactNode } from 'react';
import { formDataType,attendeeType } from '../constants/declarations';


interface EventContextType {
  eventList: formDataType[]; 
  attendeesList: attendeeType[] ;
  addEvent: (event: formDataType) => void; 
  addAttendeeToList: (newAttendee: attendeeType) => void;
  removeAttendeeFromList : (attendeeEmail: string) => void
}


export const EventContext = createContext<EventContextType>({
  eventList: [],
  attendeesList: [],
  addEvent: ()=>{},
  addAttendeeToList: ()=>{},
  removeAttendeeFromList: ()=>{}
});


export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [eventList, setEventList] = useState<formDataType[]>([]); 
  const [attendeesList, setattendeesList] = useState<attendeeType[]>([]); 

  
  const addEvent = (event: formDataType) => {
    const clonedEvent = {...event, attendees: attendeesList}
    
    setEventList((prevEventList) => [...prevEventList, clonedEvent]);
    setattendeesList([])
    console.log('list is ',eventList);
  };

  const addAttendeeToList = (newAttendee:attendeeType) => {
    if (newAttendee.name && newAttendee.email) {
      setattendeesList((prev)=>[...prev, newAttendee]);
    }
  };

  const removeAttendeeFromList = (attendeeEmail:string)=>{
    let arr = [...attendeesList];
    arr = arr.filter(({email})=>email!==attendeeEmail);
    setattendeesList(arr);
  }

  

  return (
    <EventContext.Provider value={{ eventList, attendeesList, addEvent, addAttendeeToList, removeAttendeeFromList }}>
      {children}
    </EventContext.Provider>
  );
};
