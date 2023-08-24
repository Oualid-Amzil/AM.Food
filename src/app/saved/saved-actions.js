import axios from "axios";

import { uiActions } from "../uiSlice";
import { savedRcpsActions } from "./savedRcpsSlice";

export const sendSavedRecipes = (elements) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    dispatch(uiActions.addFirebaseError({ message: null }));
    try {
      await axios({
        method: "put",
        url: `
        https://am-food-15af9-default-rtdb.firebaseio.com/savedList/
        ${userId}.json?auth=${token}`,
        data: {
          saveRecipes: elements,
        },
      });
    } catch (error) {
      dispatch(uiActions.addFirebaseError({ message: error.message }));
    }
  };
};

export const getSavedRecipes = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    dispatch(uiActions.addFirebaseError({ message: null }));

    try {
      const response = await axios({
        method: "get",
        url: `
        https://am-food-15af9-default-rtdb.firebaseio.com/savedList/
        ${userId}.json?auth=${token}
        `,
      });
      dispatch(
        savedRcpsActions.replaceSavedRecipes({
          items: response.data?.saveRecipes || [],
        })
      );
    } catch (error) {
      dispatch(uiActions.addFirebaseError({ message: error.message }));
    }
  };
};
