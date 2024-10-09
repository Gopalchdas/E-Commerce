import React, { useContext, useEffect, useState } from 'react'
import {Context} from '../../main';
import './Messages.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const Messages = () => {
const {isAuthenticated}=useContext(Context);
const [message,setMessage]=useState([]);
useEffect(()=>{
  const fetchMessage=async()=>{
    try {
      const {data}=await axios.get("http://localhost:4000/allMessages",{withCredentials:true},);
      setMessage(data.messages);
    } catch (error) {
      console.log("Error occured while fetching messages",error);
    }
  }; fetchMessage();
},[]);
if (!isAuthenticated) {
  return <Navigate to={'/login'}/>
};
  return (
    <div className='messages'>
      <h1>Subscribers</h1>
    <span> {
message && message.length>0 ?(message.map(element=>{
  return (
    <div className="card" key={element._id}>
     <div className="card-details"> 
      <p>Email: <span>{element.email}</span></p>
     </div>
    </div>
  )
})):(<h2>No Message</h2>)
}</span>
    </div>
  )
}

export default Messages;
