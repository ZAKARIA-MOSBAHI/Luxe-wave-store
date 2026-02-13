import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import favoritesReducer from "./slices/favoritesSlice";
import cartReducer from "./slices/clientcartSlice";
import categoryReducer from "./slices/categorySlice";
import addressReducer from "./slices/addressSlice";
import notificationReducer from "./slices/notificationSlice";
import userOrderReducer from "./slices/userOrderSlice";
import adminOrderReducer from "./slices/adminOrderSlice";
import adminCartsReducer from "./slices/adminCartsSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    favorites: favoritesReducer,
    clientCartState: cartReducer,
    adminCartsState: adminCartsReducer,
    categoriesState: categoryReducer,
    userAddress: addressReducer,
    notificationState: notificationReducer,
    userOrderState: userOrderReducer,
    adminOrderState: adminOrderReducer,
  },
});

export default store;
