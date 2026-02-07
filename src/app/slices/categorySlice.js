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
        cat._id === updated._id ? updated : cat,
      );

      state.filteredCategories = state.filteredCategories?.map((cat) =>
        cat._id === updated._id ? updated : cat,
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
  },
});

export default categorySlice.reducer;

export const {
  setCategories,
  addCategoryToStore,
  updateCategoryInStore,
  deleteCategoryFromStore,
  filterCategoriesBySlug,
} = categorySlice.actions;
