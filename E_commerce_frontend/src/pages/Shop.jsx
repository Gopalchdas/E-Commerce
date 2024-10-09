import React from "react";
import Hero from "../components/Hero/Hero.jsx";
import Popular from "../components/Popular/Popular.jsx";
import Newsletter from "../components/Newsletter/Newsletter.jsx";
import NewCollection from "../components/NewCollection/NewCollection.jsx";
import "./CSS/Shop.css";
const Shop = () => {
  return (
    <div className="App">
      <Hero />
      <Popular />
      <NewCollection />
      <Newsletter />
    </div>
  );
};

export default Shop;
