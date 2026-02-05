import { setCart } from "@/app/slices/cartSlice";
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
 * useCart
 *
 * This hook acts as a thin orchestration layer between:
 * - cart-related API services
 * - the Redux cart slice
 *
 * It exposes high-level cart actions (add, remove, update, fetch)
 * while keeping components free from API and Redux implementation details.
 */
export const useCart = () => {
  const cart = useSelector((state) => state.cart.data); // starts as null
  const dispatch = useDispatch();

  const addToCart = async (productId, sizeChosen) => {
    const response = await addProductToCart(productId, sizeChosen);

    if (response.success) {
      dispatch(setCart(response.cart));
      return buildApiResponse(true, "Product added to cart");
    }

    return buildApiResponse(
      false,
      response?.message || "Failed to add product to cart",
    );
  };

  const deleteItem = async (productId, itemSize) => {
    const response = await deleteCartItem(productId, itemSize);

    if (response.success) {
      dispatch(setCart(response.cart));
      return buildApiResponse(true, "Product removed from cart");
    }

    return buildApiResponse(
      false,
      response?.message || "Failed to delete product from cart",
    );
  };

  const decrementItemQuantity = async (productId, itemSize) => {
    const response = await decrementCartItemQuantity(productId, itemSize);

    if (response.success) {
      dispatch(setCart(response.cart));
      return buildApiResponse(true, "Product quantity decremented");
    }

    return buildApiResponse(
      false,
      response?.message || "Failed to decrement product quantity",
    );
  };

  const updateItemSize = async (productId, oldSize, newSize) => {
    const response = await updateCartItemSize(productId, oldSize, newSize);

    if (response.success) {
      dispatch(setCart(response.cart));
      return buildApiResponse(true, "Product size updated");
    }

    return buildApiResponse(
      false,
      response?.message || "Failed to change product size",
    );
  };

  useEffect(() => {
    const fetchLoggedUserCart = async () => {
      try {
        const response = await getClientCart();
        if (response.success) {
          dispatch(setCart(response.cart));
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
  };
};
