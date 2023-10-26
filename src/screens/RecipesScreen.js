import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipesItem from "../components/RecipesItem";
import PagesSlider from "../components/UI/PagesSlider";
import { selectedActions } from "../app/selectedElements";
import instance from "../instance";
import "animate.css";

import { types, cuisines, intolerances, diets } from "../requests";
import Loader from "../components/UI/Loader";
import "./RecipesScreen.css";

const API_KEY = process.env.REACT_APP_API_KEY;

let isInitial = true;

const RecipesScreen = () => {
  const dispatch = useDispatch();

  const [recipes, setRecipes] = useState([]);
  const type = useSelector((state) => state.selected.selectedElements.type);
  const cuisine = useSelector(
    (state) => state.selected.selectedElements.cuisine
  );
  const intolerance = useSelector(
    (state) => state.selected.selectedElements.intolerance
  );
  const diet = useSelector((state) => state.selected.selectedElements.diet);
  const [totalRecipes, setTotalRecipes] = useState();
  const offset = useSelector((state) => state.selected.selectedElements.page);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await instance.get(
          `/complexSearch?apiKey=${API_KEY}&type=${type}&cuisine=${cuisine}&intolerances=${intolerance}&diet=${diet}&number=40&offset=${offset}&addRecipeNutrition=true`
        );

        setRecipes(response.data.results);
        setTotalRecipes(response.data.totalResults);

        setIsLoading(false);
      } catch (err) {
        setErrorMessage(err.message);
        setIsLoading(false);
      }
    };
    if (!isInitial) {
      getRecipes();
    }
  }, [type, cuisine, intolerance, offset, diet]);

  return (
    <div className="recipesScreen">
      <div className="side__bar">
        <div className="animate__animated animate__fadeInLeft label">
          <h2>Types: </h2>
          <select
            className="select"
            value={type}
            name="types"
            onChange={(event) => {
              isInitial = false;
              dispatch(
                selectedActions.addSelectedElements({
                  type: event.target.value,
                  page: 0,
                })
              );
            }}
          >
            <option value={null}>--Options --</option>
            {types.map((item, idx) => (
              <option key={idx} className="option" value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="animate__animated animate__fadeInLeft label">
          <h2>Cuisines: </h2>
          <select
            className="select"
            value={cuisine}
            name="cuisines"
            onChange={(event) => {
              isInitial = false;
              dispatch(
                selectedActions.addSelectedElements({
                  cuisine: event.target.value,
                  page: 0,
                })
              );
            }}
          >
            <option value={null}>--Options --</option>
            {cuisines.map((item, idx) => (
              <option key={idx} className="option" value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="animate__animated animate__fadeInRight label">
          <h2>Intolerances: </h2>
          <select
            className="select"
            value={intolerance}
            name="intolerances"
            onChange={(event) => {
              isInitial = false;
              dispatch(
                selectedActions.addSelectedElements({
                  intolerance: event.target.value,
                  page: 0,
                })
              );
            }}
          >
            <option value={null}>-- Options --</option>
            {intolerances.map((item, idx) => (
              <option key={idx} className="option" value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="animate__animated animate__fadeInRight label">
          <h2>Diets: </h2>
          <select
            className="select"
            value={diet}
            name="diets"
            onChange={(event) => {
              isInitial = false;
              dispatch(
                selectedActions.addSelectedElements({
                  diet: event.target.value,
                  page: 0,
                })
              );
            }}
          >
            <option value={null}>--Options --</option>
            {diets.map((item, idx) => (
              <option key={idx} className="option" value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading && (
        <div className="recipes__container">
          <Loader />
        </div>
      )}
      {!isLoading && errorMessage && (
        <div className="recipes__container">
          <h2 style={{ color: "red" }}>{errorMessage}</h2>
        </div>
      )}
      {!isLoading && !errorMessage && !isInitial && recipes.length === 0 && (
        <div className="recipes__container">
          <h2 style={{ color: "#726c6c" }}>There is no recipes.</h2>
        </div>
      )}
      {!isLoading && !errorMessage && recipes.length > 0 && (
        <div className="recipes__content">
          <div className="recipes__wrapper">
            {recipes?.map((item, idx) => (
              <RecipesItem key={idx} recipe={item} />
            ))}
          </div>
          <PagesSlider
            totalPages={totalRecipes / 40}
            value={offset / 40}
            clickHandler={(number) =>
              dispatch(
                selectedActions.addSelectedElements({ page: number * 40 })
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default RecipesScreen;
