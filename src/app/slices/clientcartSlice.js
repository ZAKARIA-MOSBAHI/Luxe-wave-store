import { createSlice } from "@reduxjs/toolkit";

const clientCartSlice = createSlice({
  name: "userCartState",
  initialState: {
    data: null,
  },
  reducers: {
    setUserCart: (state, action) => {
      state.data = action.payload;
    },
    clearCart: (state) => {
      state.data = null;
    },
  },
});

export default clientCartSlice.reducer;
export const { setUserCart, clearCart } = clientCartSlice.actions;
