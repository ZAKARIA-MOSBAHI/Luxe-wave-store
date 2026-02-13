import { OrderCard } from "./components/OrderCard";
import { EmptyStateUI } from "../../components/shared/EmptyStateUI";

import { useUserOrders } from "@/hooks/client/useUserOrders";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export default function OrderHistory() {
  const { orders } = useUserOrders();
  if (orders?.length === 0) {
    return (
      <EmptyStateUI
        title={"No orders yet"}
        description={
          "When you place an order, it will appear here. Start shopping to see your orders!"
        }
        link={<Link to="/">Start Shopping</Link>}
        icon={<Package className="h-10 w-10 text-muted-foreground" />}
      />
    );
  }
  return (
    <div className="max-h-screen overflow-y-scroll  bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

          <p className="text-gray-500">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        {orders?.length > 0 && (
          <div className="flex flex-col gap-6">
            {orders?.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}

        {/* Empty State */}
      </div>
    </div>
  );
}
