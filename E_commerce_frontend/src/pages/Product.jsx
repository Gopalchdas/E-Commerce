import React, { useContext } from 'react'
import { ShopContext } from '../contexts/Shopcontext'
import { useParams } from 'react-router-dom';
import Breadcrumps from '../components/Breadcrums/Breadcrumps';
import './CSS/Product.css'
import Productdisplay from '../components/Productdisplay/Productdisplay';

const Product = () => {
  const {all_product}=useContext(ShopContext);
  const {productId}=useParams();
  const product=all_product.find((e)=>e._id===productId);
  return (
    <div className='product'>
      <Breadcrumps product={product}/>
      <Productdisplay product={product}/>
    </div>
  )
}

export default Product
