import { createSlice } from "@reduxjs/toolkit";

const clientCartSlice = createSlice({
  name: "clientCartState",
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

export default clientCartSlice.reducer;
export const { setCart, clearCart } = clientCartSlice.actions;
