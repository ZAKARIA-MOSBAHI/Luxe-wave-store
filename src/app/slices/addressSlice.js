import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: null,
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    clearUserAddress: (state) => {
      state.address = null;
    },
  },
});

export const { setUserAddress, clearUserAddress } = addressSlice.actions;
export default addressSlice.reducer;
