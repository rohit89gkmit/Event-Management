import React, { useContext } from 'react';

import AttendeeCard from './AttendeeCard';
import { EventContext } from '../context/EventContext';


const AttendeesList = ( ) => {
    const {attendeesList} = useContext(EventContext);
  return (
    <div className="mt-4">
      <h3 className="text-[18px]">Attendees:</h3>
      <div className='flex flex-col gap-[10px] mt-2'>
        {attendeesList.map(({name,email}) => (
          <AttendeeCard key={email} name={name} email={email}/>
        ))}
      </div>
    </div>
  );
};

export default AttendeesList;
