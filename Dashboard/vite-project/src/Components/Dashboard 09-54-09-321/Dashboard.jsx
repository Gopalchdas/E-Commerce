import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const { isAuthenticated, admin } = useContext(Context);
  // const [appointment, setAppointment] = useState("");
  const [products, setProducts] = useState("");
  if (!isAuthenticated) {
    return <Navigate to={'/login'}/>
  };
  const handleUpdateStatus = async (productId, availability) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/products/updateproduct/${productId}`,
        { availability },
        { withCredentials: true }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, availability }
            : product
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    
    }
  };

  const handleDeleteStatus=async(productId)=>{
    try {
      const {data}=await axios.delete(`http://localhost:4000/products/updateproduct/${productId}`,{withCredentials:true});

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success(data.message);
  
    } catch (error) {
      toast.error(error.response.data.message);
    
    }
  };


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/products/getallproduct", {
          withCredentials: true,
        });
        setProducts(data.products);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

 

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div
      className="dashboard"
      style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
    >
      <div className="dashboard-top">
        <div className="top-item">
          <h1>Hello !</h1>
          <h2>{`${admin.firstName} ${admin.lastName}`}</h2>
        </div>
        <div className="top-item-right">
          <h1>Total Products</h1>
          <h2>{`${products.length}`}</h2>
        </div>
      </div>
      <div className="dashboard-bottom">
        <div className="dashboard-info">
          <h2>Products</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Old_Price</th>
                <th>New_Price</th>
                <th>Availibility</th>
                <th>Remove</th>
            
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((prod) => {
                  return (
                    <tr key={prod._id}>
                      <td>{prod.name}</td>
                      <td>{prod.category}</td>
                      <td>{prod.old_price}</td>
                      <td>{prod.new_price}</td>
                      <td>
                        <select
                          name="availability"
                          value={prod.availability}
                          onChange={(e) =>
                            handleUpdateStatus(prod._id, e.target.value)
                          }
                          className="stat"
                        >
                          <option value="true">true</option>
                          <option value="false">false</option>
                
                        </select>
                      </td>
                      <td>
                        {prod.availability === true ? (
                          <p>
                            <button onClick={(e)=>handleDeleteStatus(prod._id)} className="rem"> x </button>
                          </p>
                        ) : (
                          <p>
                          <button onClick={(e)=>handleDeleteStatus(prod._id)} className="rem"> x </button>
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No Product</td>
                  <td>No Product</td>
                  <td>No Product</td>
                  <td>No Product</td>
                  <td>No Product</td>
                  <td>No Product</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
