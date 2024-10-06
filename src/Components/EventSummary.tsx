import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../context/EventContext'; // Assuming EventContext has event data
import { formDataType } from '../constants/declarations'; // Assuming this includes the event data type

const EventSummary = () => {
  const {  attendeesList } = useContext(EventContext);

  const eventList = JSON.parse(localStorage.getItem('EventList') as string);

  const [totalUpcomingEvents, setTotalUpcomingEvents] = useState(0);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [eventsThisWeek, setEventsThisWeek] = useState(0);
  const [eventsThisMonth, setEventsThisMonth] = useState(0);
  
  const isThisWeek = (date: Date) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() + (6 - now.getDay())));

    return date >= startOfWeek && date <= endOfWeek;
  };

  const isThisMonth = (date: Date) => {
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };

  useEffect(() => {
    const now = new Date();
    const upcomingEvents = eventList.filter((event: formDataType) => new Date(event.date) > now);
    const attendeesCount = upcomingEvents.reduce((acc:number, event:formDataType) => acc + event.attendees.length, 0);
    const weeklyEvents = upcomingEvents.filter((event: formDataType) => isThisWeek(new Date(event.date)));
    const monthlyEvents = upcomingEvents.filter((event: formDataType) => isThisMonth(new Date(event.date)));

    setTotalUpcomingEvents(upcomingEvents.length);
    setTotalAttendees(attendeesCount);
    setEventsThisWeek(weeklyEvents.length);
    setEventsThisMonth(monthlyEvents.length);
  }, [eventList]);

  return (
    <div className="flex flex-col gap-6 mt-[50px]">
      <h2 className="text-2xl font-bold">Event Summary</h2>

      <div className="flex flex-col gap-4">
        <div className="p-4 bg-blue-200 rounded-md shadow-md w-[200px]">
          <h3 className="text-lg font-semibold">Upcoming Events</h3>
          <p className="text-3xl font-bold">{totalUpcomingEvents}</p>
        </div>

        <div className="p-4 bg-green-200 rounded-md shadow-md w-[200px]">
          <h3 className="text-lg font-semibold">Total Attendees</h3>
          <p className="text-3xl font-bold">{totalAttendees}</p>
        </div>

        <div className="p-4 bg-purple-200 rounded-md shadow-md w-[200px]">
          <h3 className="text-lg font-semibold">Events This Week</h3>
          <p className="text-3xl font-bold">{eventsThisWeek}</p>
        </div>

        <div className="p-4 bg-orange-200 rounded-md shadow-md w-[200px]">
          <h3 className="text-lg font-semibold">Events This Month</h3>
          <p className="text-3xl font-bold">{eventsThisMonth}</p>
        </div>
      </div>
    </div>
  );
};

export default EventSummary;
