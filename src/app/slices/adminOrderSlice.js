import { createSlice } from "@reduxjs/toolkit";

const adminOrderSlice = createSlice({
  name: "adminOrderState",
  initialState: {
    orders: null,
    filteredOrders: null,
    searchQuery: "",
    filterOption: "all",
  },
  reducers: {
    setAdminOrders: (state, action) => {
      state.orders = action.payload;
    },
    setFilteredOrders: (state, action) => {
      state.filteredOrders = action.payload;
    },
    setFilterOption: (state, action) => {
      state.filterOption = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export default adminOrderSlice.reducer;
export const {
  setAdminOrders,
  setFilteredOrders,
  setFilterOption,
  setSearchQuery,
} = adminOrderSlice.actions;
