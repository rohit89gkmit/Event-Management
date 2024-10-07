import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { formDataType,attendeeType } from '../constants/declarations';
import { v4 as uuidv4 } from 'uuid';

interface EventContextType {
  eventList: formDataType[]; 
  attendeesList: attendeeType[] ;
  disabled: boolean;
  formData: formDataType;
  setFormData: React.Dispatch<React.SetStateAction<formDataType>>;
  addEvent: (event: formDataType) => void; 
  addAttendeeToList: (newAttendee: attendeeType) => void;
  removeAttendeeFromList : (attendeeEmail: string) => void
}


export const EventContext = createContext<EventContextType>({
  eventList: JSON.parse(localStorage.getItem('EventList') as string),
  attendeesList: [],
  disabled: false,
  formData: {
    id: uuidv4(),
    title: '',
    date: new Date(),
    description: '',
    limit: 2,
    location: '',
    attendees: []
  },
  setFormData: ()=>{},
  addEvent: ()=>{},
  addAttendeeToList: ()=>{},
  removeAttendeeFromList: ()=>{},
});


export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [eventList, setEventList] = useState<formDataType[]>(() => {
    const savedEvents = localStorage.getItem('eventList');
    return savedEvents ? JSON.parse(savedEvents) : [];
  }); 
  const [attendeesList, setattendeesList] = useState<attendeeType[]>([]); 
  const [disabled, setdisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataType>({
    id: uuidv4(),
    title: '',
    date: new Date(),
    description: '',
    limit: 2,
    location: '',
    attendees: []
  });

  let limit:number = formData.limit;
  useEffect(()=>{
    limit = formData.limit;
    if(disabled) setdisabled(false)
  },[formData])



  const addEvent = (event: formDataType) => {
    
    event = { ...event, attendees: attendeesList };
  
    
    setEventList((prevEvents) => {
      const updatedEvents = [...prevEvents, event];
      return updatedEvents;
    });
  
    
    setattendeesList([]);
  };
  
  
  useEffect(() => {
    if (eventList.length > 0) {
      localStorage.setItem('EventList', JSON.stringify(eventList));
    }
  }, [eventList]);

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
    <EventContext.Provider value={{ eventList, attendeesList,disabled,formData,setFormData, addEvent, addAttendeeToList, removeAttendeeFromList }}>
      {children}
    </EventContext.Provider>
  );
};
