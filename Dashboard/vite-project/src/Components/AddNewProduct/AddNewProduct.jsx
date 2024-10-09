import React, { useContext, useState } from "react";
import "./AddNewProduct.css";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../Assets/logoHc.png";
import te from "../Assets/te.webp";

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category:"",
    new_price: "",
    old_price: "",
  });
 const[product_img,setProduct_img]=useState("");
 const[product_img_Preview,setProduct_img_Preview]=useState(""); 
 const data={
  ...formData,
  product_img,
  product_img_Preview
 } ;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAvtar = async (e) => {
    const file = await e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
   setProduct_img(file);
      setProduct_img_Preview( reader.result);
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/products/addproduct",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(data);
    }
  };
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="addnewdoctor">
      <img src={logo} alt="logo" />
      <h1>ADD NEW PRODUCT</h1>
      <form onSubmit={handleSubmit}>
        <div className="avtar">
          <img
            src={
              product_img_Preview ? `${product_img_Preview}` : te
            }
            alt=""
          />
          <input type="file" onChange={handleAvtar}  />
        </div>
        <div className="form-container"><div className="form-container-input">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name" className="inp"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description" className="inp"
          />
        </div >
        <div className="form-container-input">
          
          <input
            type="number"
            name="old_price"
            value={formData.old_price}
            onChange={handleChange}
            placeholder="Old_price" className="inp"
          />
          <input
            type="number"
            name="new_price"
            value={formData.new_price}
            onChange={handleChange}
            placeholder="New_price" className="inp"
          />
        </div>
        <div className="form-container-input">
        <select name="category" value={formData.category} onChange={handleChange} className="inp">
            <option value="">select Category</option>
            <option value="Mens">Mens</option>
            <option value="Womens">Womens</option>
            <option value="Kids">Kids</option>
          </select>
          </div>
          <button className="button">Add New Product</button></div>
      </form>
    </div>
  );
};

export default AddNewDoctor;
