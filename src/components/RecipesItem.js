import React from "react";
import { Link } from "react-router-dom";
import "animate.css";
import "./RecipesItem.css";

const RecipesItem = ({ recipe }) => {
  return (
    <Link to={`/details/${recipe.id}`}>
      <div className="animate__animated animate__zoomIn recipe__wrapper">
        <img src={recipe.image} alt="recipe postr" />
      </div>
    </Link>
  );
};

export default RecipesItem;
