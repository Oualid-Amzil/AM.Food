import React from "react";
import { CiMail } from "react-icons/ci";
import mealBowl from "../images/brooke-lark-aGjP08-HbYY-unsplash.jpg";
import "./SubscribeSection.css";

const SubscribeSection = () => {
  return (
    <div
      className="subscribe"
      style={{
        background: `url(${mealBowl}) center no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <h1 style={{ fontFamily: "PT Serif" }}>
        Suscribe to get weekly recipe updates
      </h1>
      <div className="subscribe__input">
        <CiMail style={{ fontSize: "25px", color: "grey" }} />
        <input type="text" placeholder="Enter your email here" />
        <button>Subscribe</button>
      </div>
      <div className="subscribe__gradient" />
    </div>
  );
};

export default SubscribeSection;
