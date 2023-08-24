import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "animate.css";
import axios from "axios";

import saladBowl from "../images/hermes-rivera-OzBLe_Eg1mg-unsplash.jpg";
import "./Banner.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const Banner = () => {
  const [recipes, setRecipes] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=2&type=salad`
      );

      setRecipes(response.data.recipes);
    };

    getRecipes();
  }, []);

  return (
    <div className="banner">
      <div className="animate__animated animate__fadeInLeft banner__left">
        <h1 style={{ fontFamily: "PT Serif" }}>
          LET'S START COOKING WITH POPULAR RECIPES
        </h1>
        <div className="text">
          <p>Want to learn cook but confused how to start?</p>
          <p>No need to worry again!</p>
        </div>
        <div className="banner__buttons">
          {!isAuthenticated ? (
            <Link to="/signin">
              <button className="banner__button">Get Started</button>
            </Link>
          ) : (
            <Link to="/recipes">
              <button className="banner__button">Explore Menu</button>
            </Link>
          )}
        </div>
      </div>
      <div className="animate__animated animate__fadeInRight banner__right">
        <img src={saladBowl} alt="salad bowl" />
        <Link to={`/details/${recipes[0]?.id}`}>
          <div className="first__card">
            <div className="card__label">
              <img
                src={`https://spoonacular.com/recipeImages/${recipes[0]?.id}-480x360.jpg`}
                alt="poster"
              />
              <h3 style={{ fontFamily: "PT Serif" }}>{recipes[0]?.title}</h3>
            </div>
            <ul>
              {recipes[0]?.extendedIngredients.map((item, idx) => {
                if (idx < 7) {
                  return <li key={idx}>{item?.name},</li>;
                }
                return null;
              })}
            </ul>
          </div>
        </Link>
        <Link to={`/details/${recipes[1]?.id}`}>
          <div className="second__card">
            <div className="card__label">
              <img
                src={`https://spoonacular.com/recipeImages/${recipes[1]?.id}-480x360.jpg`}
                alt="poster"
              />
              <h3 style={{ fontFamily: "PT Serif" }}>{recipes[1]?.title}</h3>
            </div>
            <ul>
              {recipes[1]?.extendedIngredients.map((item, idx) => {
                if (idx < 4) {
                  return <li key={idx}>{item?.name},</li>;
                }
                return null;
              })}
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default memo(Banner);
