import React, { useContext } from 'react'
import './CSS/PlaceOrder.css'
import { ShopContext } from '../contexts/Shopcontext'

const PlaceOrder = () => {
  const {getTotalCartPrice}=useContext(ShopContext)
  return (
    <div className='placeorder-main'>
        <h1>Delivery Information </h1>
      <form  className='placeorder' >
    
      <div className="placeorder-left">
        <input type="text" name="" id="" placeholder='First name' />
        <input type="text" name="" id="" placeholder='Last name' />
        <input type="email" placeholder='E-mail' />
        <input type="text" placeholder='Street' />
        <input type="text" placeholder='City' />  
           <input type="text" placeholder='Zip Code' />
           <input type="text" placeholder='Country' />
           <input type="text" placeholder='State' />
           <input type="number" placeholder='Phone number'/>

      </div>
      
      </form>
      <div className="placeorder-right">
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
      
        <button >PROCEED TO PAYMENT</button>
     </div>
   
      </div>


    </div>
  )
}

export default PlaceOrder
