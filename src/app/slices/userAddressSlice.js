import { createSlice } from "@reduxjs/toolkit";

const userAddressSlice = createSlice({
  name: "userAddressState",
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

export const { setUserAddress, clearUserAddress } = userAddressSlice.actions;
export default userAddressSlice.reducer;
