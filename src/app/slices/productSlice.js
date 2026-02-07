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

    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.filteredProducts.push(action.payload);
    },

    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (p) => p._id === updatedProduct._id,
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }

      const filteredIndex = state.filteredProducts.findIndex(
        (p) => p._id === updatedProduct._id,
      );
      if (filteredIndex !== -1) {
        state.filteredProducts[filteredIndex] = updatedProduct;
      }
    },

    deleteProduct: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((p) => p._id !== id);
      state.filteredProducts = state.filteredProducts.filter(
        (p) => p._id !== id,
      );
    },
  },
});

export default productsSlice.reducer;
export const {
  setProducts,
  setFilterOptions,
  filterProducts,
  setFilteredProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;
