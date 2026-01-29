import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
  },
  reducers: {
    setCart: (state, action) => {
      state.data = action.payload;
    },
    clearCart: (state) => {
      state.data = null;
    },
  },
});

export default cartSlice.reducer;
export const { setCart, clearCart } = cartSlice.actions;
