import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarts } from "@/services/cart.service";
import { setCarts, setFilteredCarts } from "@/app/slices/adminCartsSlice";
import { sortItems } from "@/utils/sortItems";

export const useAdminCarts = () => {
  const adminCartsState = useSelector((state) => state.adminCartsState);
  const dispatch = useDispatch();
  const sortCarts = (column, order = "asc") => {
    if (!adminCartsState.carts) return;

    const sorted = sortItems(adminCartsState.carts, column, order);
    dispatch(setFilteredCarts(sorted));
  };
  useEffect(() => {
    const fetchCart = async () => {
      const response = await getCarts();
      console.warn("response");
      console.log(response);
      if (response.success) {
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
    sortCarts,
  };
};
