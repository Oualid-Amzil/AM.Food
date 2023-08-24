import { configureStore } from "@reduxjs/toolkit";
import searchItemsSlice from "./searchItem";
import selectedElementsSlice from "./selectedElements";
import uiSlice from "./uiSlice";
import authSlice from "./auth/authSlice";
import savedRcpsSlice from "./saved/savedRcpsSlice";

export const store = configureStore({
  reducer: {
    search: searchItemsSlice.reducer,
    selected: selectedElementsSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    saved: savedRcpsSlice.reducer,
  },
});
