/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    // const [userdata,setUserdata] = useState({});
    const navigate = useNavigate();
  const getUser = async()=>{
    try {
      //isse sara milega ki kya conatct number ye wo
      const response = await axios.get("http://localhost:5000/login/success",{withCredentials:true});
    //   setUserdata(response.data.user);
    } catch (error) {
        navigate("/login") //isse redirect ki kahi frm kahi kuch kuch
    }
  }
  useEffect(()=>{
    getUser()
  },[]); 
  return (
    <div>Home</div>
  )
}

export default Home