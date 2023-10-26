import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { savedRcpsActions } from "../app/saved/savedRcpsSlice";
import instance from "../instance";
import { MdTimer } from "react-icons/md";
import { FaHotjar } from "react-icons/fa";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import Loader from "../components/UI/Loader";
import { sendSavedRecipes } from "../app/saved/saved-actions";
import "./RecipeDetails.css";

const API_KEY = process.env.REACT_APP_API_KEY;

let isInitial = true;

const RecipeDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const recipeId = params.id;

  const savedRcps = useSelector((state) => state.saved.recipes);

  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [isSaved, setIsSaved] = useState(
    savedRcps.some((element) => element.id === +recipeId) ? true : false
  );

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendSavedRecipes(savedRcps));
  }, [savedRcps, dispatch]);

  useEffect(() => {
    const getRecipe = async () => {
      setIsLoading(false);
      setErrorMessage(null);
      try {
        const response = await instance.get(
          `/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true&analyzedInstructions=true`
        );

        setRecipe(response.data);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(err.message);
        setIsLoading(false);
      }
    };

    getRecipe();
  }, [recipeId]);

  return (
    <>
      {isLoading && (
        <div className="details__container">
          <Loader />
        </div>
      )}
      {!isLoading && errorMessage && (
        <div className="details__container">
          <h2 style={{ color: "red" }}>{errorMessage}</h2>
        </div>
      )}
      {!isLoading && !errorMessage && (
        <div className="details__wrapper">
          <div className="saved__icon">
            <button
              onClick={() => {
                if (!isSaved) {
                  dispatch(
                    savedRcpsActions.addRecipe({
                      id: recipe?.id,
                      image: recipe?.image,
                      title: recipe?.title,
                      length: recipe?.extendedIngredients?.length,
                      calories: recipe?.nutrition?.nutrients[0]?.amount,
                    })
                  );
                  setIsSaved(true);
                } else {
                  dispatch(savedRcpsActions.removeRecipe(recipeId));
                  setIsSaved(false);
                }
              }}
            >
              {!isSaved ? (
                <BsBookmark style={{ fontSize: "30px", color: "#30af61" }} />
              ) : (
                <BsFillBookmarkFill
                  style={{
                    fontSize: "30px",

                    color: "#30af61",
                  }}
                />
              )}
            </button>
            {!isSaved ? (
              <span>add to save list</span>
            ) : (
              <span>remove from save list</span>
            )}
          </div>
          <div className="details__left">
            <div className="recipe__image">
              <img
                src={`https://spoonacular.com/recipeImages/${params?.id}-312x231.jpg`}
                alt="recipe"
              />
            </div>
            <div className="recipe__ingredient">
              <div className="ingredient__label">
                <h2>Ingredients</h2>
                <h3>{recipe?.extendedIngredients?.length}</h3>
              </div>
              <div className="ingredient__list">
                {recipe?.extendedIngredients?.map((item, idx) => (
                  <div className="list__item" key={idx}>
                    {" "}
                    <div className="ingredient__img">
                      <img
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                        alt="ingridient poster"
                      />
                    </div>
                    <div className="ingredient__amount">
                      <h3>{item.name}</h3>
                      <h4>{`${item.amount} ${item.unit}`}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="details__right">
            <div className="recipe__types">
              {recipe?.dishTypes?.map((item, idx) => (
                <div className="recipe__label" key={idx}>
                  {item}
                </div>
              ))}
            </div>

            <h1 style={{ fontFamily: "PT Serif" }}>{recipe?.title}</h1>
            <div className="recipe__values">
              <div className="value__wrapper">
                <h3>Prep In:</h3>
                <span>
                  <MdTimer />
                  {`${recipe?.readyInMinutes}min`}
                </span>
              </div>

              <div className="value__wrapper">
                <h3>Calories:</h3>
                <span>
                  <FaHotjar style={{ color: "orange" }} />
                  {recipe?.nutrition?.nutrients[0]?.amount} Kacl
                </span>
              </div>
            </div>

            <div className="recipe__nutrition">
              <h3>Nutrition per serving:</h3>
              <div className="nutritions">
                {recipe?.nutrition?.nutrients?.map((item, idx) => {
                  if (idx > 0) {
                    return (
                      <div className="nutrition__type" key={idx}>
                        <span>{`${item.amount} ${item.unit}`}</span>
                        <h5 style={{ fontFamily: "PT Serif" }}>{item.name}</h5>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
            <div className="recipe__instructions">
              <h3>Instructions:</h3>
              {recipe?.analyzedInstructions &&
                recipe?.analyzedInstructions[0]?.steps?.map((item, idx) => (
                  <div className="instruction__step" key={idx}>
                    <h2 style={{ fontFamily: "PT Serif" }}>{item.number}</h2>
                    <p>{item.step}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
