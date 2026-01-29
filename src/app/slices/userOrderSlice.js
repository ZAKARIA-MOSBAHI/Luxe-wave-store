import { createSlice } from "@reduxjs/toolkit";

const userOrderSlice = createSlice({
  name: "userOrderState",
  initialState: {
    orders: null,
  },
  reducers: {
    setUserOrder: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export default userOrderSlice.reducer;
export const { setUserOrder } = userOrderSlice.actions;
