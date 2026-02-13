import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCategories,
  addCategoryToStore,
  updateCategoryInStore,
  deleteCategoryFromStore,
  filterCategoriesBySlug,
  incrementCategoryProductsCount,
  decrementCategoryProductsCount,
  setFilteredCategories,
} from "@/app/slices/categorySlice";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from "@/services/category.service";
import { sortItems } from "@/utils/sortItems";

export const useCategories = () => {
  const dispatch = useDispatch();

  const { categories, filteredCategories } = useSelector(
    (state) => state.categoriesState,
  );

  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);

    const result = await getCategories();
    console.warn("cat results");
    console.log(result);
    if (result.success) {
      dispatch(setCategories(result.categories));
    }

    setIsLoading(false);
  };

  const addCategory = async (payload) => {
    const result = await createCategory(payload);
    console.warn("result ");
    console.log(result);
    if (result.success) {
      dispatch(addCategoryToStore(result.category));
    }

    return result;
  };

  const editCategory = async (id, payload) => {
    const result = await updateCategory(id, payload);

    if (result.success) {
      dispatch(updateCategoryInStore(result.category));
    }

    return result;
  };

  const removeCategory = async (id) => {
    const result = await deleteCategory(id);

    if (result.success) {
      dispatch(deleteCategoryFromStore(id));
    }

    return result;
  };

  const fetchCategoryById = async (id) => {
    const categoryFromStore = categories?.find((c) => c._id === id);
    if (categoryFromStore) {
      return { success: true, category: categoryFromStore };
    }

    const result = await getCategoryById(id);
    return result;
  };

  const searchCategories = (searchTerm) => {
    dispatch(filterCategoriesBySlug(searchTerm));
  };
  const incrementProductsCount = (catId) =>
    dispatch(incrementCategoryProductsCount(catId));

  const decrementProductsCount = (catId) =>
    dispatch(decrementCategoryProductsCount(catId));

  const sortCategories = (column = "productsCount", direction = "asc") => {
    const sorted = sortItems(categories, column, direction);
    dispatch(setFilteredCategories(sorted));
  };
  useEffect(() => {
    if (categories === null) {
      fetchCategories();
    }
  }, [categories]);

  return {
    categories,
    filteredCategories,
    isLoading,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
    fetchCategoryById,
    searchCategories,
    incrementProductsCount,
    decrementProductsCount,
    sortCategories,
  };
};
