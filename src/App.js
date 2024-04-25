import './App.css';
import React from 'react'
import {Routes,Route} from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Home from './Components/Home';
import Store from './Components/Store';
const App = () => {
  return (
      <div className="app-container">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="store/:id" element={<Store />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App