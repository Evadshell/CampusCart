/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import env from "dotenv";
const URL = process.env.URL;
const Body = () => {
    const [data,setdata] = useState("");
    const getdata = async()=>{
        const response = await Axios.get(`${URL}/getData`);
        setdata(response.data);
    }
    useEffect(()=>{
        getdata();
    },[]);
  return (
    <div>{data}</div>
  )
}

export default Body