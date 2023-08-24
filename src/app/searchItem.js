import { createSlice } from "@reduxjs/toolkit";

const searchItemsSlice = createSlice({
  name: "search",
  initialState: {
    searchElements: {
      searchWord: "",
      page: 0,
    },
  },
  reducers: {
    addSearchElements(state, action) {
      state.searchElements.searchWord =
        action.payload.searchWord || state.searchElements.searchWord;
      state.searchElements.page =
        action.payload.page || state.searchElements.page;
    },
  },
});

export const searchActions = searchItemsSlice.actions;

export default searchItemsSlice;
