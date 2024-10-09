import React from "react";
import "./Footer.css";
import youtube from '../Assets/youtube.png'
import insta from '../Assets/insta.png'
import X from '../Assets/X.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <h2>QUICK LINKS</h2>
        <ul>
          <h5>Men</h5>
          <h5>Women</h5>
          <h5>Kid</h5>
        </ul>
      </div>

      <div className="footer-middle">
        <h2>CONTACT US</h2>

        <ul>
          <h5>+91 1111111111</h5>
          <h5>@email.com</h5>
          <h5>Delhi 110001</h5>
        </ul>
      </div>

      <div className="footer-right">
        <h2>FOLLOW US</h2>
        <img src={insta} alt="insta-logo" />
        <img src={X} alt="X-logo" />
        <img src={youtube} alt="youtube-logo" />
      </div>
    </div>
  );
};

export default Footer;
