import { createSlice } from "@reduxjs/toolkit";

const selectedElementsSlice = createSlice({
  name: "search",
  initialState: {
    selectedElements: {
      type: "",
      cuisine: "",
      intolerance: "",
      diet: "",
      page: 0,
    },
  },
  reducers: {
    addSelectedElements(state, action) {
      state.selectedElements.type =
        action.payload.type || state.selectedElements.type;
      state.selectedElements.cuisine =
        action.payload.cuisine || state.selectedElements.cuisine;
      state.selectedElements.intolerance =
        action.payload.intolerance || state.selectedElements.intolerance;
      state.selectedElements.diet =
        action.payload.diet || state.selectedElements.diet;
      state.selectedElements.page = action.payload.page;
    },
  },
});

export const selectedActions = selectedElementsSlice.actions;

export default selectedElementsSlice;
