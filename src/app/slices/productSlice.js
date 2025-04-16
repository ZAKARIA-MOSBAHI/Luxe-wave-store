import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../thunks/productThunks";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    status: null,
    error: null,
  },
  reducers: {
    setProduct: (state, action) => {
      state.data = action.payload;
    },
    resetRequestResults: (state) => {
      // Resetting the request results to null
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.data = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default productSlice.reducer;
export const { setProduct, resetRequestResults } = productSlice.actions;
