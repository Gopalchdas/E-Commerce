import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import person from "../Assets/person.png";
const Doctors = () => {
  const { isAuthenticated } = useContext(Context);
  const [products, setProducts] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/products/getallproduct",
          {
            withCredentials: true,
          }
        );
        setProducts(data.products);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchProducts();
  }, []);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="products">
      <h1>Products</h1>
      <div className="banner">
        {products && products.length > 0 ? (
          products.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="head">
                  {" "}
                  <img
                    src={element.product_img && element.product_img.url}
                    alt={person}
                  />
                  <h3> {element.name}</h3>
                  <h4>{element.category}</h4>
                </div>

                <div className="card-details">
                  <p className="em">
                    description:<span> {element.description}</span>
                  </p>
                  <p>Old_price: {element.old_price}</p>
                  <p>New_price: {element.new_price}</p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No registered products</h1>
        )}
      </div>
    </div>
  );
};

export default Doctors;
