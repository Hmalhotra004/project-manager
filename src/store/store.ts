import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { projectReducer } from "./projectslice";

const store = configureStore({
  reducer: { project: projectReducer, Auth: authReducer },
});

export default store;

export type AppDispatch = typeof store.dispatch;