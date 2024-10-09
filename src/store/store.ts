import { configureStore } from "@reduxjs/toolkit";
import { projectReducer } from "./projectSlice";

const store = configureStore({
  reducer: projectReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
