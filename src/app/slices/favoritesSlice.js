import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteProducts: [], // This stores the list of products fetched from the server
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favoriteProducts = action.payload;
    },
  },
});

export default favoritesSlice.reducer;
export const { setFavorites } = favoritesSlice.actions;
