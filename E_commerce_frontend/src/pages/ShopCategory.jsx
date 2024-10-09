import React, { useContext } from "react";
import { ShopContext } from "../contexts/Shopcontext.jsx";
import "../pages/CSS/ShopCategory.css";
import Item from "../components/Item/Item";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="collection_category">
      <h1>{props.category} Category</h1>

      <div className="products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
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
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
