import './App.css';
import React from 'react'
import {Routes,Route} from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';
import Login from './Components/Login';
import Home from './Components/Home';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        


      </Routes>
      <Footer />
    </div>
  )
}

export default App