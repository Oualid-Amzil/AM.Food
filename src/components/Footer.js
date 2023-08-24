import React from "react";
import {
  FaFacebookF,
  FaRss,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__lists">
        <ul>
          <h1 style={{ fontFamily: "PT Serif" }}>
            <span style={{ color: "#30af61", fontFamily: "PT Serif" }}>
              A.M
            </span>{" "}
            Food
          </h1>
          <p>
            AM Food is a website used to descover a variety of famous food and
            drink recipes.
          </p>
        </ul>

        <ul>
          <h2 style={{ fontFamily: "PT Serif" }}>About</h2>
          <li>About Us</li>
          <li>Receip</li>
          <li>Download</li>
          <li>Contact</li>
        </ul>
        <ul>
          <h2 style={{ fontFamily: "PT Serif" }}>Company</h2>
          <li>Our Receip</li>
          <li>Subscribe Us</li>
          <li>FAQ</li>
        </ul>
        <ul>
          <h2 style={{ fontFamily: "PT Serif" }}>Support</h2>
          <li>Account</li>
          <li>Support Center</li>
          <li>Feedback</li>
          <li>Accebility</li>
        </ul>
        <ul>
          <h2 style={{ fontFamily: "PT Serif" }}>Get in Touch</h2>
          <li>Question or feedback?</li>
          <li>We'd love to hear from you</li>
        </ul>
      </div>

      <div className="footer__bottom">
        <p>Copyright , Amzil 2023, All right reserved</p>
        <div className="social__media">
          <div className="footer__icon">
            <FaFacebookF />
          </div>

          <div className="footer__icon">
            <FaTwitter />
          </div>
          <div className="footer__icon">
            <FaRss />
          </div>
          <div className="footer__icon">
            <FaGooglePlusG />
          </div>
          <div className="footer__icon">
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
