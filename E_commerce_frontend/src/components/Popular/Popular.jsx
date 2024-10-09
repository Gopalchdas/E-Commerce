import React, { useContext } from "react";
import { ShopContext } from "../../contexts/Shopcontext.jsx";
import "./Popular.css";
import Item from "../Item/Item.jsx";
const Popular = () => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="popular">
      <h1>Popular in men</h1>
      <hr />
      <div className="popular-item">
        {all_product
          .filter((item) => item.category === "Mens")
          .slice(5, 9)
          .map((item, i) => {
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

export default Popular;
