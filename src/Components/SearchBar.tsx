import React, { useState } from 'react'

const SearchBar = () => {
    const [query, setquery] = useState<string>('');

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setquery(e.target.value);
    }
  return (
    <div className='w-[300px] h-[40px] rounded-md border-2 border-gray-500 px-1 '>
        <input value={query} onChange={handleOnChange} className='w-full h-full outline-none text-[18px]' placeholder='Search by title..'/>
    </div>
  )
}

export default SearchBar