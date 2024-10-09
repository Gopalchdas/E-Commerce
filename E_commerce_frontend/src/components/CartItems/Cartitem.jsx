import React, { useContext } from 'react'
import './Cartitem.css'
import { ShopContext } from '../../contexts/Shopcontext'
import { Link } from 'react-router-dom';
const Cartitem = () => {
    const {all_product,cartitems,addtocart,removeFromCart,getTotalCartPrice}=useContext(ShopContext);

 

  return (
    <div className='cartitems'>
      <div className='format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
   
      </div>
         <hr />
     <div className='format'>
     { all_product.map((e)=>{
        
   
        if (cartitems[e._id]>0) {
          
            return <div key={e._id}>
                <div className='format-in'>
                <img src={e.product_img.url} alt="img" />
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <p><button onClick={()=>{removeFromCart(e.id)}}> - </button>  {cartitems[e._id]}  <button onClick={()=>{addtocart(e._id)}}> + </button></p>
                <p>₹{e.new_price*cartitems[e._id]}</p>
           
            </div>
            </div>
        }
        return null;
        
     })}
     </div>
     <div className="cartTotal">
        <h1>Cart Totals</h1>
        <div className="total-item">
            <p>Subtotal</p>
            <p>₹{getTotalCartPrice()}</p>
        
        </div>
        <div className="total-item">
            <p>Shiping fee</p>
            <p>₹{getTotalCartPrice()>0?50:0}</p>
            
        </div>
        <div className="total-item">
            <p>Total</p>
            <p>₹{getTotalCartPrice()===0?0:getTotalCartPrice()+50}</p>
        </div>
        <Link to="/order">
        <button >PROCEED TO CHECKOUT</button></Link>
     </div>
    </div>
  )
}

export default Cartitem
