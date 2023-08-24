import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SavedItem from "../components/SavedItem";
import { sendSavedRecipes } from "../app/saved/saved-actions";
import "./SavedScreen.css";

let isInitial = true;

const SavedScreen = () => {
  const dispatch = useDispatch();

  const savedRcps = useSelector((state) => state.saved.recipes);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendSavedRecipes(savedRcps));
  }, [savedRcps, dispatch]);

  return (
    <div className="savedScreen">
      <h1>Recipes You Saved:</h1>
      {savedRcps.length === 0 && (
        <div className="saved__container">
          <h2>You haven't saved any recipe yet.</h2>
        </div>
      )}
      {savedRcps.length > 0 && (
        <div className="saved__wrapper">
          {savedRcps?.map((item, idx) => (
            <SavedItem key={idx} recipe={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedScreen;
