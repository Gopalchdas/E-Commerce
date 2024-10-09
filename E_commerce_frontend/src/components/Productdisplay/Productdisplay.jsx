import React, { useContext } from 'react'
import './Productdisplay.css'
import img1 from '../Assets/img1.jpeg'
import { ShopContext } from '../../contexts/Shopcontext'
const Productdisplay = (props) => {
    const{product}=props;
    const{addtocart}=useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product.product_img.url} alt="" />
            <img src={product.product_img.url} alt="" />
            <img src={product.product_img.url} alt="" />
            <img src={product.product_img.url} alt="" />
        </div>
        <div className="productdisplay-img">
        <img src={product.product_img.url} alt="" />

        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="price">
    <div className="old-price">₹{product.old_price}</div>
    <div className="new-price">₹{product.new_price}</div>
        </div>
 <div className="description">
            <p>Product Description</p>
            <div className="description-part">
                {product.description}
            </div>
        </div>
     
      <div className="addcart">  <button onClick={()=>{addtocart(product._id)}}>ADD TO CART</button></div>
      </div>
     
    </div>
  )
}

export default Productdisplay
