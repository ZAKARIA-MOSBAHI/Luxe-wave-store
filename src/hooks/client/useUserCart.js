import { clearCartInStore, setUserCart } from "@/app/slices/userCartSlice";
import {
  addProductToCart,
  decrementCartItemQuantity,
  deleteCartItem,
  getClientCart,
  updateCartItemSize,
} from "@/services/cart.service";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buildApiResponse } from "@/lib/utils";

/**
 * useUserCart
 *
 * This hook acts as a thin orchestration layer between:
 * - cart-related API services
 * - the Redux cart slice
 *
 * It exposes high-level cart actions (add, remove, update, fetch)
 * while keeping components free from API and Redux implementation details.
 */
export const useUserCart = () => {
  const cart = useSelector((state) => state.clientCartState.data); // starts as null
  const dispatch = useDispatch();

  const addToCart = async (productId, sizeChosen) => {
    const response = await addProductToCart(productId, sizeChosen);

    if (response.success) {
      dispatch(setUserCart(response.cart));
    }
    return response;
  };

  const deleteItem = async (productId, itemSize) => {
    const response = await deleteCartItem(productId, itemSize);

    if (response.success) {
      dispatch(setUserCart(response.cart));
    }
    return response;
  };

  const decrementItemQuantity = async (productId, itemSize) => {
    const response = await decrementCartItemQuantity(productId, itemSize);

    if (response.success) {
      dispatch(setUserCart(response.cart));
    }
    return response;
  };

  const updateItemSize = async (productId, oldSize, newSize) => {
    const response = await updateCartItemSize(productId, oldSize, newSize);

    if (response.success) {
      dispatch(setUserCart(response.cart));
    }
    return response;
  };
  const clearCartInStore = () => {
    dispatch(clearCartInStore());
  };
  useEffect(() => {
    const fetchLoggedUserCart = async () => {
      try {
        const response = await getClientCart();
        if (response.success) {
          dispatch(setUserCart(response.cart));
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    // Cache-first strategy: fetch only when cart is not yet initialized
    if (cart === null) {
      fetchLoggedUserCart();
    }
  }, [cart, dispatch]);

  return {
    cart,
    addToCart,
    deleteItem,
    decrementItemQuantity,
    updateItemSize,
    clearCartInStore,
  };
};
