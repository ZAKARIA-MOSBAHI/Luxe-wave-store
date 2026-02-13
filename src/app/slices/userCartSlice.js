import { createSlice } from "@reduxjs/toolkit";

const userCartSlice = createSlice({
  name: "userCartState",
  initialState: {
    data: null,
  },
  reducers: {
    setUserCart: (state, action) => {
      state.data = action.payload;
    },
    clearCartInStore: (state) => {
      state.data = {
        ...state.data,
        items: [],
        total: 0,
        totalAfterDiscount: 0,
        appliedDiscounts: [],
      };
    },
  },
});

export default userCartSlice.reducer;
export const { setUserCart, clearCartInStore } = userCartSlice.actions;
