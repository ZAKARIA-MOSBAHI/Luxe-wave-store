import { createSlice } from "@reduxjs/toolkit";

const userOrderSlice = createSlice({
  name: "userOrderState",
  initialState: {
    orders: null,
  },
  reducers: {
    setUserOrders: (state, action) => {
      state.orders = action.payload;
    },
    addUserOrderInStore: (state, action) => {
      if (!state.orders) return;

      state.orders.unshift(action.payload);
    },
  },
});

export default userOrderSlice.reducer;
export const { setUserOrders, addUserOrderInStore } = userOrderSlice.actions;
