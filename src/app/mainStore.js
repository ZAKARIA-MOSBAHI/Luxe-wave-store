import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import favoritesReducer from "./slices/favoritesSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import addressReducer from "./slices/addressSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    categoriesState: categoryReducer,
    userAddress: addressReducer,
  },
});

export default store;
