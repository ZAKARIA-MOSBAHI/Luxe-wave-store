import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import producReducer from "./slices/productSlice";
import favoritesReducer from "./slices/favoritesSlice";
import cartReducer from "./slices/cartSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: producReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export default store;
