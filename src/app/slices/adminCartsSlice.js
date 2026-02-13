import { createSlice } from "@reduxjs/toolkit";

const adminCartsState = createSlice({
  name: "adminCartsState",
  initialState: {
    carts: null,
    filteredCarts: null,
  },
  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
      state.filteredCarts = action.payload;
    },
    setFilteredCarts: (state, action) => {
      state.filteredCarts = action.payload;
    },
  },
});

export default adminCartsState.reducer;
export const { setCarts, setFilteredCarts } = adminCartsState.actions;
