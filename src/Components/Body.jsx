/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react'
import Axios from 'axios';

const Body = () => {
    
    const [data,setdata] = useState("");
    const getdata = async()=>{
        const response = await Axios.get(`http://localhost:5000/getData`);
        setdata(response.data);
    }
    useEffect(()=>{
        getdata();
    },[]);
  return (
    <div>{data}</div>
  )
}

export default Body;