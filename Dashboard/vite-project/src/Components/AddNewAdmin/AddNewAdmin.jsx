import React, { useContext, useState } from 'react'
import './AddNewAdmin.css'
import { Context } from '../../main';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../Assets/logoHc.png'
const AddNewAdmin = () => {
  const {isAuthenticated} =useContext(Context);
   const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
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
const response= await axios.post("http://localhost:4000/user/admin/addnew",formData,
  {withCredentials:true,headers:{
    "Content-Type":"application/json"}});
      toast.success(response.data.message);
      setFormData({ firstName:"",
      lastName:"",
      email:"",
      password:"",});
} catch (error) {
  toast.error(error.response.data.message);
};
   };
   if (!isAuthenticated) {
    return <Navigate to={"/login"}/>
   };
  return (
    <div className='addnewadmin'>
      <img src={logo} alt="logo" />
      <h1>ADD NEW ADMIN</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} className='inp' placeholder='firstName'/>
      <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} className='inp' placeholder='lastName'/>
      <input type="text" name='email' value={formData.email} onChange={handleChange} className='inp' placeholder='email'/>
      <input type="text" name='password' value={formData.password} onChange={handleChange} className='inp' placeholder='password'/>
      <button className='button' >Add New  Admin</button>
      </form>
    </div>
  )
}

export default AddNewAdmin;
