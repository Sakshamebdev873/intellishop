import React from 'react'
import Homepage from './pages/HomePage'
import { Route, Routes } from 'react-router'

const App = () => {
  return (
    <Routes>
<Route path='/' element={<Homepage/>}/>

    </Routes>
  )
}

export default App