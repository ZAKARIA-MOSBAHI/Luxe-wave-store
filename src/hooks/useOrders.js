import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "@/app/api/orders";
import {
  setAdminOrders,
  setFilteredOrders,
  setFilterOption,
  setSearchQuery,
} from "@/app/slices/adminOrderSlice";
import { toast } from "sonner";

export const useOrders = () => {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.adminOrderState);
  const handleConfirmOrder = async () => {
    alert("not implemented yet!");
  };
  const handleShipOrder = async () => {
    alert("not implemented yet!");
  };
  const handleDeliverOrder = async () => {
    alert("not implemented yet!");
  };
  const handleCancelOrder = async () => {
    alert("not implemented yet!");
  };
  const applyOrderFilters = () => {
    if (!ordersState.orders) return;

    let result = [...ordersState.orders];

    if (ordersState.searchQuery) {
      const query = ordersState.searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order?.userId?.name?.toLowerCase().includes(query) ||
          order?.orderNumber?.toLowerCase().includes(query),
      );
    }

    const filter = ordersState.filterOption?.toLowerCase();
    if (filter && filter !== "all") {
      result = result.filter(
        (order) => order?.orderStatus?.toLowerCase() === filter,
      );
    }

    dispatch(setFilteredOrders(result));
  };

  useEffect(() => {
    if (!ordersState.orders) {
      (async () => {
        const res = await getOrders();
        if (res.success) {
          dispatch(setAdminOrders(res.orders));
          dispatch(setFilteredOrders(res.orders));
        } else {
          toast.error("Failed to fetch orders");
        }
      })();
    }
  }, [dispatch, ordersState.orders]);

  useEffect(() => {
    applyOrderFilters();
  }, [ordersState.orders, ordersState.searchQuery, ordersState.filterOption]);

  return {
    ordersState,
    setSearchQuery: (v) => dispatch(setSearchQuery(v)),
    setFilterOption: (v) => dispatch(setFilterOption(v)),
    handleCancelOrder,
    handleDeliverOrder,
    handleConfirmOrder,
    handleShipOrder,
  };
};
