import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loginpage from '../src/pages/Loginpage'
import Singuppage from '../src/pages/Singuppage'
import Homepage from './pages/Homepage'
import {Routes , Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/singup" element={<Singuppage />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App
