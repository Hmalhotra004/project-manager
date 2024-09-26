import { configureStore } from "@reduxjs/toolkit";
import { projectReducer } from "./projectslice";

const store = configureStore({
  reducer: { project: projectReducer },
});

export default store;

export type AppDispatch = typeof store.dispatch;
