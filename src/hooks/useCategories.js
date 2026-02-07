import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "@/app/slices/categorySlice";
import { getCategories } from "@/services/category.service";

/**
 * Hook to fetch categories and store them in Redux
 * Returns categories, loading state, and error
 */
export const useCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesState.categories);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const result = await getCategories();

      if (result.success) {
        dispatch(setCategories(result.categories));
      }

      setIsLoading(false);
    };

    if (!categories || categories?.length === 0) {
      fetchCategories();
    }
  }, [dispatch, categories]);

  return { categories, isLoading };
};
