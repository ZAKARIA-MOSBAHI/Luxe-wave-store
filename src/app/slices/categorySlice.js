import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: null,
    filteredCategories: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.filteredCategories = action.payload;
    },
    setFilteredCategories: (state, action) => {
      state.filteredCategories = action.payload;
    },
    addCategoryToStore: (state, action) => {
      if (!state.categories) return;

      state.categories = [action.payload, ...state.categories];
      state.filteredCategories = [
        action.payload,
        ...(state.filteredCategories || []),
      ];
    },

    updateCategoryInStore: (state, action) => {
      if (!state.categories) return;

      const updated = action.payload;

      state.categories = state.categories.map((cat) =>
        cat._id === updated._id
          ? { ...cat, name: updated.name, slug: updated.slug }
          : cat,
      );

      state.filteredCategories = state.filteredCategories?.map((cat) =>
        cat._id === updated._id
          ? { ...cat, name: updated.name, slug: updated.slug }
          : cat,
      );
    },

    deleteCategoryFromStore: (state, action) => {
      if (!state.categories) return;

      const id = action.payload;

      state.categories = state.categories.filter((cat) => cat._id !== id);

      state.filteredCategories = state.filteredCategories?.filter(
        (cat) => cat._id !== id,
      );
    },

    filterCategoriesBySlug: (state, action) => {
      if (!state.categories) return;

      const searchTerm = action.payload.toLowerCase();

      state.filteredCategories = state.categories.filter((cat) =>
        cat.slug.toLowerCase().includes(searchTerm),
      );
    },
    incrementCategoryProductsCount: (state, action) => {
      if (!state.categories) return;

      const categoryId = action.payload;

      const increment = (cat) =>
        cat._id === categoryId
          ? {
              ...cat,
              productsCount: (cat.productsCount ?? 0) + 1,
            }
          : cat;

      state.categories = state.categories.map(increment);
      state.filteredCategories = state.filteredCategories?.map(increment);
    },

    decrementCategoryProductsCount: (state, action) => {
      if (!state.categories) return;

      const categoryId = action.payload;

      const decrement = (cat) =>
        cat._id === categoryId
          ? {
              ...cat,
              productsCount: Math.max((cat.productsCount ?? 1) - 1, 0),
            }
          : cat;

      state.categories = state.categories.map(decrement);
      state.filteredCategories = state.filteredCategories?.map(decrement);
    },
  },
});

export default categorySlice.reducer;

export const {
  setCategories,
  addCategoryToStore,
  updateCategoryInStore,
  deleteCategoryFromStore,
  filterCategoriesBySlug,
  incrementCategoryProductsCount,
  decrementCategoryProductsCount,
  setFilteredCategories,
} = categorySlice.actions;
