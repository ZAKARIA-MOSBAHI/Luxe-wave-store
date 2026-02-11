import {
  createProduct,
  deleteProductById,
  getProducts,
  updateProduct,
} from "@/services/product.service";
import {
  addProductInStore,
  deleteProductFromStore,
  filterProductsInStore,
  setFilteredProducts,
  setFilterOptions,
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

    if (response.success) {
      dispatch(updateProductInStore(response.updatedProduct));
    }
    return response;
  };
  const addProduct = async (formData) => {
    const response = await createProduct(formData);

    if (response.success) {
      dispatch(addProductInStore(response.product));
    }
    return response;
  };
  const deleteProduct = async (productId) => {
    const response = await deleteProductById(productId);

    if (response.success) {
      dispatch(deleteProductFromStore(productId));
    }
    return response;
  };
  const filterProducts = (key, value) => {
    if (options[key] === value) {
      dispatch(filterProductsInStore({ [key]: null }));
    } else {
      dispatch(filterProductsInStore({ [key]: value }));
    }
  };
  const removeFilters = () => {
    dispatch(setFilteredProducts(products));
    dispatch(
      setFilterOptions({
        gender: null,
        category: null,
        price: null,
        size: null,
      }),
    );
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

  return {
    products,
    options,
    filteredProducts,
    editProduct,
    addProduct,
    deleteProduct,
    filterProducts,
    removeFilters,
  };
};
