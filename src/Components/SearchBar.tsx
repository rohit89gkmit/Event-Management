import React, { useState } from 'react'
interface SearchBarProps {
  onChange: (value: string) => void;
}
const SearchBar = ({ onChange }: SearchBarProps) => {

    
  return (
    <div className='w-[300px] h-[40px] rounded-md border-2 border-gray-500 px-1 '>
        <input  onChange={(e)=>onChange(e.target.value)} className='w-full h-full outline-none text-black text-[18px]' placeholder='Search by title..'/>
    </div>
  )
}

export default SearchBar