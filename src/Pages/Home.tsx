import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { formDataType } from '../constants/declarations';
import ToggleButton from '../components/ToggleButton';
import { Link } from 'react-router-dom';
import EventSummary from '../components/EventSummary';
import EventsList from '../components/EventsList';
import useDebounce from '../hooks/useDebounce';

const Home = () => {
  
  let eventList = JSON.parse(localStorage.getItem('EventList') as string);

  if (!Array.isArray(eventList)) {
    eventList = [];
  } 
  eventList = eventList.sort((a: formDataType, b: formDataType) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  
  const [originalList] = useState<formDataType[]>(eventList); 
  const [list, setList] = useState<formDataType[]>(eventList); 
  const [query, setquery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); 

  const debouncedQuery = useDebounce(query, 2000);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true); 
      const filteredList = originalList.filter((event) =>
        event.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setTimeout(() => {
        setList(filteredList); 
        setLoading(false); 
      }, 500);
    } else {
      setList(originalList); 
      setLoading(false); 
    }
  }, [debouncedQuery, originalList]);
  
  const isThisWeek = (date: Date) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return new Date(date) >= startOfWeek && new Date(date) <= endOfWeek;
  };

  const isThisMonth = (date: Date) => {
    const now = new Date();
    const eventDate = new Date(date);
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  };

  
  const setListByWeekOrMonth = (state: string) => {
    let filteredList = [...originalList]; 
    if (state === 'Weekly') {
      filteredList = filteredList.filter(({ date }) => isThisWeek(new Date(date)));
    } else {
      filteredList = filteredList.filter(({ date }) => isThisMonth(new Date(date)));
    }
    setList(filteredList); 
  };

  return (
    <div className='px-[100px] bg-gray-50 h-screen'>
      <div className='flex justify-between mt-[20px] text-white'>
        <ToggleButton setListByWeekOrMonth={setListByWeekOrMonth} />
        <SearchBar onChange={setquery} />
        <Link to={`/AddEvent/'a'`}>
          <button className='bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-500'>
            Add Event
          </button>
        </Link>
        <button className='bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-500'>
          Settings
        </button>
      </div>
      <div className='flex items-center gap-[140px]'>
        <EventSummary />
        
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader">Loading...</div> 
          </div>
        ) : (
          <EventsList list={list} />
        )}
      </div>
    </div>
  );
};

export default Home;
