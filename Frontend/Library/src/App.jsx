import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SignUp from './components/signup/signup'
import Login from './components/login/login'
import Home from './components/home/home';
import UserHome from './components/userHome/userHome';

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <Routes>
    <Route path="/" element={<SignUp />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/home" element={<Home />}/>
    <Route path="/userHome" element={<UserHome />}/>
    </Routes>
   </Router>
  )
}

export default App
