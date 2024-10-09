import React, { useContext, useState } from 'react'
import { ShopContext } from '../contexts/Shopcontext.jsx';
import './CSS/RegisterSignup.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import {Link, Navigate, useNavigate } from 'react-router-dom';
const RegisterSignup = () => {

  const {isAuthenticated,setIsAuthenticated} =useContext(ShopContext);
  const navigate=useNavigate();
   const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    role:"Customer",
  });
  const handleChange=(e)=>{
   const {name,value}=e.target;
   setFormData((prevData)=>({
    ...prevData,
    [name]:value,
   }));};

   const handleSubmit=async(e)=>{
    e.preventDefault();
try {
const response= await axios.post("http://localhost:4000/user/signUp",formData,
  {withCredentials:true,headers:{
    "Content-Type":"application/json"}});
      toast.success(response.data.message);
     setIsAuthenticated(true);
      navigate('/');
} catch (error) {
  toast.error(error.response.data.message);
};
   };
   if (isAuthenticated) {
    return <Navigate to={"/"}/>
   };
  return (
    <div className='Register-page'>
      <h1>Register</h1>
      <p>Please Register to continue!</p>
      <form onSubmit={handleSubmit} className='form'>
     <div className="input-feild"> <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} className='inp' placeholder='First Name'/>
      <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} className='inp' placeholder='Last Name'/>
      <input type="text" name='email' value={formData.email} onChange={handleChange} className='inp' placeholder='Email'/>
      <input type="text" name='password' value={formData.password} onChange={handleChange} className='inp' placeholder='Password'/></div>
      
      <button className='button'>Register</button>
      </form>
    </div>
  )
}

export default RegisterSignup

