import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  decrementCartItemQuantity,
  deleteCartItem,
  getCarts,
  updateCartItemSize,
} from "@/services/cart.service";
import { setCarts } from "@/app/slices/adminCartsSlice";

/**
 * useCarts
 *
 * Thin orchestration layer between:
 * - Cart API services
 * - Redux cart slice
 *
 * Keeps components free from API and Redux implementation details.
 */
export const useAdminCarts = () => {
  const adminCartsState = useSelector((state) => state.adminCartsState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      const response = await getCarts();
      console.warn("response");
      console.log(response);
      if (response?.success) {
        dispatch(setCarts(response.carts));
      }
    };

    if (adminCartsState.carts === null) {
      fetchCart();
    }
  }, [adminCartsState.carts, dispatch]);

  return {
    carts: adminCartsState.carts,
    filteredCarts: adminCartsState.filteredCarts,
  };
};
