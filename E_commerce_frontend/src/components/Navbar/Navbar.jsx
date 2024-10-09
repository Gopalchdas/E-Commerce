import React, { useContext, useState } from "react";
import("./Navbar.css");
import cart from "../Assets/cart.png";
import { Link,useNavigate } from "react-router-dom";
import { ShopContext } from "../../contexts/Shopcontext";
import menuu from "../Assets/menu.png";
import close from "../Assets/close.png";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(ShopContext);
  const [menu, setmenu] = useState("");
  const [sidebarOpen, setsidebarOpen] = useState(false);
  let togglesidebar = () => {
    setsidebarOpen(!sidebarOpen);
  };
  const { getTotalCartItems } = useContext(ShopContext);
  const navigateTo = useNavigate();
  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/user/customer/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        navigateTo("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const goToLogin = () => {
    navigateTo("/login");
  };
  return (
    <>
      <div className="navbar">
        <Link
          style={{ textDecoration: "none", color: "black" }}
          className="navbar-logo"
          to="./"
        >
          <h1 className="one">EVER</h1>
          <h1 className="two">CLOTHS</h1>
        </Link>

        <ul className="navbar-menu">
          <li
            onClick={() => {
              setmenu("home");
            }}
          >
            <Link style={{ textDecoration: "none", color: "black" }} to="./">
              Home
            </Link>
            {menu === "home" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setmenu("men");
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="./mens"
            >
              Mens
            </Link>
            {menu === "men" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setmenu("women");
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="./womens"
            >
              Womens
            </Link>
            {menu === "women" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setmenu("kid");
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="./kids"
            >
              Kids
            </Link>
            {menu === "kid" ? <hr /> : <></>}
          </li>
        </ul>

        <span className="navbar-login-cart">
        {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
          <Link to="./cart" style={{ textDecoration: "none", color: "black" }}>
            <div className="img-cart">
              <div className="image">
                
                <img src={cart} alt="cart-img" />
              </div>
              <div className="cart-count">{getTotalCartItems()}</div>
            </div>
          </Link>
        </span>
        <div className="hamburger" onClick={togglesidebar}>
          {sidebarOpen ? (
            <img src={close} alt="" />
          ) : (
            <img src={menuu} alt="" />
          )}
        </div>
      </div>
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`} id="sidebar">
    
        <ul className="navbar-menu2">
          <Link style={{ textDecoration: "none", color: "black" }} to="./">
            <li >
              Home
            </li>
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to="./mens">
            <li >
              Mens
            </li>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="./womens"
          >
            <li>
              Womens
            </li>
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to="./kids">
            <li >
              Kids
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
