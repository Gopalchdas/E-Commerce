import React from 'react'
import './Breadcrums.css'
import arrow_img from '../Assets/right-arrow.png'
const Breadcrumps = (props) => {
    const {product}=props;
  return (
    <div className='breadcrum'>
<p>      Home <img src={arrow_img} alt="" /> Shop <img src={arrow_img} alt="" />  {product.category}  <img src={arrow_img} alt="" /> {product.name}
</p>  
  </div>
  )
}

export default Breadcrumps;
