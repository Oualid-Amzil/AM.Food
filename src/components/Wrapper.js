import React from "react";
import mealPrep from "../images/brooke-lark-wMzx2nBdeng-unsplash.jpg";

import "./Wrapper.css";

const Wrapper = ({ children }) => {
  return (
    <div
      className="wrapper"
      style={{
        background: `url(${mealPrep}) center no-repeat`,
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
