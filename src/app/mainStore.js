import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import favoritesReducer from "./slices/favoritesSlice";
import cartReducer from "./slices/cartSlice.js";
import categoryReducer from "./slices/categorySlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    categoriesState: categoryReducer,
  },
});

export default store;
