import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { savedRcpsActions } from "../app/saved/savedRcpsSlice";
import "./SavedItem.css";
import { useDispatch } from "react-redux";
import "animate.css";

const SavedItem = ({ recipe }) => {
  const dispatch = useDispatch();

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className="animate__animated animate__zoomIn savedItem">
      <div className="delete__icon">
        <button
          onClick={() => dispatch(savedRcpsActions.removeRecipe(recipe.id))}
        >
          <MdDelete style={{ fontSize: "19px" }} />
        </button>
        <span>delete</span>
      </div>
      <Link to={`/details/${recipe.id}`}>
        <img src={recipe.image} alt="recipe poster" />
        <div className="saved__details">
          <h2>{truncate(recipe.title, 25)}</h2>
          <div className="saved__sub">
            <h3>
              Ingredients: <span>{recipe.length}</span>
            </h3>
            <h3>
              Calories: <span>{recipe.calories} kcal</span>
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SavedItem;
