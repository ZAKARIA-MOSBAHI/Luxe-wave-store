import {
  createProduct,
  getProducts,
  updateProduct,
} from "@/services/product.service";
import {
  addProductInStore,
  setFilteredProducts,
  setProducts,
  updateProductInStore,
} from "@/app/slices/productSlice";
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
      dispatch(updateProductInStore(response.updatedProduct));
    }
    return response;
  };
  const addProduct = async (formData) => {
    const response = await createProduct(formData);
    console.warn("create response ");
    console.log(response);
    if (response.success) {
      dispatch(addProductInStore(response.product));
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

  return { products, options, filteredProducts, editProduct, addProduct };
};
