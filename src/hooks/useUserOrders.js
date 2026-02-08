import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientOrders } from "@/services/order.service";
import { setUserOrders } from "@/app/slices/userOrderSlice";

export const useUserOrders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.userOrderState);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getClientOrders();

        if (response?.success) {
          dispatch(setUserOrders(response.orders));
        } else {
          setError(response?.message || "Failed to fetch orders");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!orders) {
      fetchUserOrders();
    }
  }, [dispatch, orders]);

  return {
    orders,
    isLoading,
    error,
  };
};
