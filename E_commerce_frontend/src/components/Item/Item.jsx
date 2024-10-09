import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
  return (
    <div className='item-conatainer'>
  <Link to={`/product/${props.id}`}><div className="image"><img src={props.img} alt="img"   /></div></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="new-price">{"\u20B9"}{props.new_price}</div>
        <div className="old-price">{"\u20B9"}{props.old_price}</div>
      </div>

    </div>
  )
}

export default Item
