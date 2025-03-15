import { Router, Routes, Route } from 'react-router'
import Home from './pages/Home';
import Login from './pages/Login';
import Inside from './pages/Inside';
import axios from 'axios';
import './App.css'

function App() {
  axios.defaults.withCredentials=true;
  return (
    <div className='bg-green-300  h-lvh'>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/inside' element={<Inside></Inside>}></Route>
    </Routes>
      </div >
    )
}

export default App
