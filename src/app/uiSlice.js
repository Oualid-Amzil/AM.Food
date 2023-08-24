import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    message: "",
    isLoading: false,
    firebase: { errorMessage: "" },
  },
  reducers: {
    error(state, action) {
      state.message = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    addFirebaseError(state, action) {
      state.firebase.errorMessage =
        action.payload.message || state.firebase.errorMessage;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
