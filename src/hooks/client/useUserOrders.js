import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClientOrder, getClientOrders } from "@/services/order.service";
import {
  addUserOrderInStore,
  setUserOrders,
} from "@/app/slices/userOrderSlice";

export const useUserOrders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.userOrderState);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUserOrder = async () => {
    const response = await createClientOrder();
    if (response.success) {
      dispatch(addUserOrderInStore(response.order));
    }
    return response;
  };
  useEffect(() => {
    const fetchUserOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getClientOrders();

        if (response.success) {
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
    createUserOrder,
  };
};
