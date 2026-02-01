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
      state.options = { ...state.options, ...action.payload };
      const { gender, category, price, size } = state.options;
      let filtered = [...state.products];

      if (gender !== null) {
        filtered = filtered.filter((product) => product.gender === gender);
      }

      if (category !== null) {
        filtered = filtered.filter(
          (product) => product.categoryId.name.toLowerCase() === category,
        );
      }

      if (price !== null) {
        if (price === "low to high") {
          filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (price === "high to low") {
          filtered = [...filtered].sort((a, b) => b.price - a.price);
        }
      }
      if (size !== null) {
        filtered = filtered.filter((product) =>
          Object.keys(product.sizes).includes(size),
        );
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
