import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <p className='text-red-600'>{count}</p>
    </>
  )
}

export default App
