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
  },
});

export default cartSlice.reducer;
export const { setCart } = cartSlice.actions;
