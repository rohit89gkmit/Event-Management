import React, { useState } from 'react'

const ToggleButton = () => {
    const [toggle, setToggle] = useState<string>('Weekly');

    const handleToggle = (state:string)=> {
        if((state==='Weekly' && toggle==='Monthly') || (state==='Monthly' && toggle==='Weekly')) setToggle(state);
    }

  return (
    <div className='w-[200px] h-[30px] bg-white flex rounded-[15px] border-[1px] border-gray-300 text-black cursor-pointer'>
        <div onClick={()=>handleToggle('Weekly')} className={`${toggle==='Weekly'?"bg-black text-white":null} w-[50%] h-full rounded-[15px] overflow-none text-center`}>Weekly</div>
        <div onClick={()=>handleToggle('Monthly')} className={`${toggle==='Monthly'?"bg-black text-white":null} w-[50%] h-full rounded-[15px] overflow-none text-center`}>Monthly</div>
    </div>
  )
}

export default ToggleButton