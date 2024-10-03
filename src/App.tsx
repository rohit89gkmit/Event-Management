import { useState } from 'react'
import './App.css'
function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <p>{count}</p>
    </>
  )
}

export default App
