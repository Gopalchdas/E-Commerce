import React, { useContext } from "react";
import "./NewCollection.css";
import { ShopContext } from "../../contexts/Shopcontext.jsx";
import new_collection from "../Assets/newcollection";
import Item from "../Item/Item";
import newCollectionBanner from "../Assets/newCollectionBanner.png";
const NewCollection = () => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="newcollection">
      <img src={newCollectionBanner} alt="" className="banner" />
      <h1>New collection</h1>
      <hr />
      <div className="newcollection-item">
        {all_product.slice(5, 13).map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              img={item.product_img.url}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollection;
