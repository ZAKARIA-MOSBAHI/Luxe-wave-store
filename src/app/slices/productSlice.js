import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    options: {
      gender: null,
      category: null,
      price: null,
      size: null,
    },
    filteredProducts: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilterOptions: (state, action) => {
      state.options = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    filterProducts: (state, action) => {
      const { gender, category, price, size } = action.payload;
      console.log(action.payload);
      let filtered = [...state.products];

      if (gender !== null) {
        filtered = filtered.filter((product) => product.gender === gender);
      }

      if (category !== null) {
        filtered = filtered.filter((product) => product.category === category);
      }

      if (price !== null) {
        filtered = filtered.filter((product) => product.price <= price);
      }

      if (size !== null) {
        filtered = filtered.filter((product) => product.size.includes(size));
      }

      state.filteredProducts = filtered;
    },
  },
});

export default productsSlice.reducer;
export const {
  setProducts,
  setFilterOptions,
  filterProducts,
  setFilteredProducts,
} = productsSlice.actions;
