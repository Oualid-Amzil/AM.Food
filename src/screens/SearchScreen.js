import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import SearchItem from "../components/SearchItem";
import PagesSlider from "../components/UI/PagesSlider";
import { searchActions } from "../app/searchItem";
import Loader from "../components/UI/Loader";
import "./SearchScreen.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const SearchScreen = () => {
  const dispatch = useDispatch();

  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState();
  const offset = useSelector((state) => state.search.searchElements.page);
  const searchWord = useSelector(
    (state) => state.search.searchElements.searchWord
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getRecipes = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchWord}&number=40&offset=${offset}&addRecipeNutrition=true`
        );

        setRecipes(response.data.results);
        setTotalRecipes(response.data.totalResults);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(err.message);
        setIsLoading(false);
      }
    };

    getRecipes();
  }, [searchWord, offset]);

  return (
    <>
      {isLoading && (
        <div className="search__container">
          <Loader />
        </div>
      )}
      {!isLoading && errorMessage && (
        <div className="search__container">
          <h2 style={{ color: "red" }}>{errorMessage}</h2>
        </div>
      )}
      {!isLoading && !errorMessage && recipes.length === 0 && (
        <div className="search__container">
          <h2>{`There is no recipe with this name "${searchWord}"`}</h2>
        </div>
      )}

      {!isLoading && !errorMessage && recipes.length > 0 && (
        <div className="searchScreen">
          <div className="search__wrapper">
            {recipes?.map((item, idx) => (
              <SearchItem key={idx} recipe={item} />
            ))}
          </div>
          <PagesSlider
            totalPages={totalRecipes / 40}
            value={offset / 40}
            clickHandler={(number) =>
              dispatch(searchActions.addSearchElements({ page: number * 40 }))
            }
          />
        </div>
      )}
    </>
  );
};

export default SearchScreen;
