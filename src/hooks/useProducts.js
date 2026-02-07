import { getProducts, updateProduct } from "@/services/product.service";
import { setFilteredProducts, setProducts } from "@/app/slices/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, options, filteredProducts } = useSelector(
    (state) => state.products,
  );
  const editProduct = async (productId, formData) => {
    const response = await updateProduct(productId, formData);
    console.warn("update response ");
    console.log(response);
    if (response.success) {
      dispatch(updateProduct(response.updateProduct));
    }
    return response;
  };
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

    if (!products?.length) {
      fetchProducts();
    }
  }, [dispatch, products?.length]);

  return { products, options, filteredProducts, editProduct };
};
