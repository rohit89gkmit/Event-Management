import React, { createContext, useState, ReactNode } from 'react';
import { formDataType,attendeeType } from '../constants/declarations';
import { limit } from '../constants/constant';

interface EventContextType {
  eventList: formDataType[]; 
  attendeesList: attendeeType[] ;
  disabled: boolean;
  addEvent: (event: formDataType) => void; 
  addAttendeeToList: (newAttendee: attendeeType) => void;
  removeAttendeeFromList : (attendeeEmail: string) => void
}


export const EventContext = createContext<EventContextType>({
  eventList: [],
  attendeesList: [],
  disabled: false,
  addEvent: ()=>{},
  addAttendeeToList: ()=>{},
  removeAttendeeFromList: ()=>{},
});


export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [eventList, setEventList] = useState<formDataType[]>([]); 
  const [attendeesList, setattendeesList] = useState<attendeeType[]>([]); 
  const [disabled, setdisabled] = useState<boolean>(false);

  
  const addEvent = (event: formDataType) => {
    const clonedEvent = {...event, attendees: attendeesList}
    
    setEventList((prevEventList) => [...prevEventList, clonedEvent]);
    setattendeesList([])
  };

  const addAttendeeToList = (newAttendee:attendeeType) => {
    if (newAttendee.name && newAttendee.email) {
      setattendeesList((prev)=>[...prev, newAttendee]);
      if(attendeesList.length+1===Number(limit)) setdisabled(true);
    }
  };

  const removeAttendeeFromList = (attendeeEmail:string)=>{
    let arr = [...attendeesList];
    arr = arr.filter(({email})=>email!==attendeeEmail);
    setattendeesList(arr);
    setdisabled(false)
  }

  

  return (
    <EventContext.Provider value={{ eventList, attendeesList,disabled, addEvent, addAttendeeToList, removeAttendeeFromList }}>
      {children}
    </EventContext.Provider>
  );
};
