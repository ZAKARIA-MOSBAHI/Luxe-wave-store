import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import producReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: producReducer,
  },
});

export default store;
