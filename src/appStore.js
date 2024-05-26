import { configureStore } from "@reduxjs/toolkit";
import paramReducer from "./parameterSlice";

const appStore = configureStore({
  reducer: {
    parameter: paramReducer,
  },
});

export default appStore;
