import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const ShopContext = createContext({ isAuthenticated: false,});
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopcontextProvider = (props) => {
  const [cartitems, setcartItem] = useState(getDefaultCart());
  const [all_product,set_all_product]=useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/products/getallproduct",
          {
            withCredentials: true,
          }
        );
        set_all_product(data.products);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchProducts();
  }, []);



  const addtocart = (itemId) => {
    if (!cartitems[itemId]) {
      setcartItem((prev) => ({ ...prev, [itemId]:1 }));
    }
    else{
      setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removeFromCart = (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

const getTotalCartItems=()=>{
  let totalItem=0;
  for (const item in cartitems)
    {
if (cartitems[item]>0) {
  totalItem+=cartitems[item];
} 

} 
return totalItem ;
};
const getTotalCartPrice=()=>{
let totalPrice=0;
for(const item in cartitems){
if (cartitems[item]>0) {
  let iteminfo=all_product.find((product)=>product._id===(item));
totalPrice+=iteminfo.new_price*cartitems[item];
}
}
return totalPrice;
};
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState({});
  const ContextValue = {getTotalCartItems,all_product, cartitems, addtocart, removeFromCart,getTotalCartPrice,isAuthenticated, setIsAuthenticated,user, setUser};


  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopcontextProvider;
