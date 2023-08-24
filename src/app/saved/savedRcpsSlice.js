import { createSlice } from "@reduxjs/toolkit";

const savedRcpsSlice = createSlice({
  name: "saved",
  initialState: { recipes: [] },
  reducers: {
    replaceSavedRecipes(state, action) {
      state.recipes = action.payload.items;
    },
    addRecipe(state, action) {
      state.recipes = [action.payload, ...state.recipes];
    },
    removeRecipe(state, action) {
      state.recipes = state.recipes.filter(
        (item) => item.id !== +action.payload
      );
    },
  },
});

export const savedRcpsActions = savedRcpsSlice.actions;

export default savedRcpsSlice;
