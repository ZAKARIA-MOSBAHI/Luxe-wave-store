import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCategories,
  addCategoryToStore,
  updateCategoryInStore,
  deleteCategoryFromStore,
  filterCategoriesBySlug,
} from "@/app/slices/categorySlice";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from "@/services/category.service";

export const useCategories = () => {
  const dispatch = useDispatch();

  const { categories, filteredCategories } = useSelector(
    (state) => state.categoriesState,
  );

  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);

    const result = await getCategories();

    if (result.success) {
      dispatch(setCategories(result.categories));
    }

    setIsLoading(false);
  };

  const addCategory = async (payload) => {
    const result = await createCategory(payload);

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
  };
};
