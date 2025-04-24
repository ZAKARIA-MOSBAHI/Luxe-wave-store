import { createSlice } from "@reduxjs/toolkit";
import { addProduct, getProducts } from "../thunks/productThunks";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null, // This stores the list of products fetched from the server
    status: null, // This stores the loading or success/failure status
    error: null, // This stores any errors during product operations
  },
  reducers: {
    setProduct: (state, action) => {
      state.data = action.payload;
    },
    resetRequestResults: (state) => {
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get products
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.data = action.payload.products; // Populate with the list of fetched products
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Handle the error
      })

      // Add product (does not affect the product list in `state.data`)
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.status = "success";
        state.error = null;
        // You might want to handle the success state here, like showing a success message
        // No changes to `state.data` as it's not meant to store the single added product
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Handle the error
      });
  },
});

export default productSlice.reducer;
export const { setProduct, resetRequestResults } = productSlice.actions;
