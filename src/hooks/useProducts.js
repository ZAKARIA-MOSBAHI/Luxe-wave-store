import { getProducts } from "@/services/product.service";
import { setFilteredProducts, setProducts } from "@/app/slices/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProducts = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await getProducts();
        if (results.success) {
          dispatch(setProducts(results?.products));
          dispatch(setFilteredProducts(results?.products));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    if (!productsState.products?.length) {
      fetchProducts();
    }
  }, [dispatch, productsState.products?.length]);

  return productsState;
};
