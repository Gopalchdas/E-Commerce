import React, { useContext, useState } from 'react'
import { ShopContext } from '../contexts/Shopcontext.jsx';
import './CSS/LoginSignup.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import {Link, Navigate, useNavigate } from 'react-router-dom';
const LoginSignup = () => {
  const {isAuthenticated,setIsAuthenticated} =useContext(ShopContext);
  const navigate=useNavigate();
   const [formData,setFormData]=useState({
    email:'',
    password:'',
    role:'Customer',
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
const response= await axios.post("http://localhost:4000/user/login",formData,
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
    <div className='login-signup'>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input type="text" name='email' value={formData.email} onChange={handleChange}  placeholder='E-mail Id' />
          <input type="text" name='password' value={formData.password} onChange={handleChange}  placeholder='password' />
        </div>
        <p>not registered?  <Link to={"/register"} >Register</Link></p>
        <button>Login in</button>
        </form>
      </div>
    </div>
  )
}

export default LoginSignup
