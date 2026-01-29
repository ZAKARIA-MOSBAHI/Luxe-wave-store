// can you help divide and organise this component into separate and potentialy re-usable components
// right now it's stored in /pages/order
import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/DropdownMenu";
import { Badge } from "@/components/ui/Badge";

import { Search } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "@/app/api/orders";
import {
  setAdminOrders,
  setFilteredOrders,
  setFilterOption,
  setSearchQuery,
} from "@/app/slices/adminOrderSlice";
import OrdersTable from "./components/OrdersTable";
import { OrdersToolbar } from "./components/OrdersToolbar";

const Orders = () => {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.adminOrderState);

  const applyOrderFilters = () => {
    if (!ordersState?.orders) return;

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

  const handleOrderSearch = (value) => {
    dispatch(setSearchQuery(value));
  };

  const handleFilters = (filter) => {
    console.log(filter);
    dispatch(setFilterOption(filter));
  };

  const handleUpdateStatus = (id, status) => {
    toast.success(`Order ${id} status updated to ${status}`);
    console.log("Update order status:", id, status);
  };

  const handleCancelOrder = (id) => {
    alert("Cancel order:", id);
  };
  const handleConfirmOrder = (id) => {
    alert("apply api req to id : ", id);
  };
  const handleShipOrder = (id) => {
    alert("apply api req to id : ", id);
  };
  const handleDeliverOrder = (id) => {
    alert("apply api req to id : ", id);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      if (response.success) {
        dispatch(setAdminOrders(response.orders));
        dispatch(setFilteredOrders(response.orders));
      } else {
        console.error(response?.message);
        toast.error("Failed to fetch orders");
      }
    };
    if (!ordersState?.orders) {
      fetchOrders();
    }
  }, [dispatch, ordersState?.orders]);
  //listener for filters or search  change
  useEffect(() => {
    if (ordersState?.orders) {
      applyOrderFilters();
    }
  }, [
    ordersState?.orders,
    ordersState?.searchQuery,
    ordersState?.filterOption,
  ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Orders</h1>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Order Management</CardTitle>
            <CardDescription>View and manage customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <OrdersToolbar />

            <div className="rounded-md border">
              <OrdersTable />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
