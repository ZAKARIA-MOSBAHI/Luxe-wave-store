import { setCart } from "@/app/slices/cartSlice";
import { getClientCart } from "@/services/cart.service";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// NEXT : ADD (add|update|delete product )
export const useCart = () => {
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLoggedUserCart = async () => {
      try {
        const response = await getClientCart();
        if (response.success) {
          dispatch(setCart(response?.cart));
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    // cache-first: do not refetch if cart already exists
    if (!cart) {
      fetchLoggedUserCart();
    }
  }, [cart, dispatch]);

  return { cart };
};
