import React, { useState } from 'react'
import './Newsletter.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const Newsletter = () => {
  const [formData,setFormData]=useState({
    email:'',
  });
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value,
    }));

  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/send",formData,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res=>{
        toast.success(res.data.message || 'Form submitted successfully!');
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting form!');
    }
  };


  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your E-mail</h1>
      <p>Subscribe to our nesletter and stay updated</p>
      <br />
      <form onSubmit={handleSubmit} className="newsletter-input">
    
            <input type="text" onChange={handleChange}  name='email' value={formData.email} />
            <button >Subscribe</button>
    
      </form>
    </div>
  )
}

export default Newsletter
