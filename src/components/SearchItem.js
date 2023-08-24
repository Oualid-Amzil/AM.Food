import React from "react";
import { Link } from "react-router-dom";
import { MdTimer } from "react-icons/md";
import { FaHotjar } from "react-icons/fa";
import { BiDish } from "react-icons/bi";
import "animate.css";

import "./SearchItem.css";

const SearchItem = ({ recipe }) => {
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <Link to={`/details/${recipe.id}`}>
      <div className="animate__animated animate__zoomIn searchItem__container">
        <img src={recipe.image} alt="recipe poster" />

        <div className="searchRcp__info">
          <h2>{truncate(recipe.title, 15)}</h2>
          <div className="search__sub">
            <div className="medium__element">
              <h4>Servings:</h4>
              <span>
                {recipe.servings}
                <BiDish style={{ color: "whitesmoke", fontSize: "21px" }} />
              </span>
            </div>
            <div className="medium__element">
              <FaHotjar style={{ color: "orange" }} />
              <span>{recipe?.nutrition?.nutrients[0]?.amount} kcal</span>
            </div>
          </div>
          <span>
            <MdTimer />
            {`${recipe.readyInMinutes}min`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
