import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  confirmOrder,
  deliverOrder,
  getOrders,
  shipOrder,
} from "@/services/order.service";
import {
  setAdminOrders,
  setFilteredOrders,
  setFilterOption,
  setSearchQuery,
  updateOrder,
} from "@/app/slices/adminOrderSlice";
import { toast } from "sonner";

export const useOrders = () => {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.adminOrderState);

  const handleConfirmOrder = async (orderId) => {
    const response = await confirmOrder(orderId);
    if (response?.success) {
      dispatch(updateOrder(response.order));
      toast.success("Order Confirmed! ");
    } else {
      toast.error("Couldn't Confirm Order!");
    }
  };
  const handleShipOrder = async (orderId) => {
    const response = await shipOrder(orderId);
    if (response?.success) {
      dispatch(updateOrder(response.order));
      toast.success("Order Shipped! ");
    } else {
      toast.error("Couldn't Ship Order!");
    }
  };
  const handleDeliverOrder = async (orderId) => {
    const response = await deliverOrder(orderId);
    if (response?.success) {
      dispatch(updateOrder(response.order));
      toast.success("Order Delivered! ");
    } else {
      toast.error("Couldn't Deliver Order!");
    }
  };
  const handleCancelOrder = async (orderId) => {
    const response = await cancelOrder(orderId);
    if (response?.success) {
      dispatch(updateOrder(response.order));
      toast.success("Order Cancelled! ");
    } else {
      toast.error("Couldn't Cancelled Order!");
    }
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
