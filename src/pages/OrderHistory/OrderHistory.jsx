import { OrderCard } from "./components/OrderCard";
import { EmptyOrdersState } from "./components/EmptyOrderState";

import { useUserOrders } from "@/hooks/useUserOrders";

export default function OrderHistory() {
  const { orders } = useUserOrders();

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
        {orders?.length === 0 && <EmptyOrdersState />}
      </div>
    </div>
  );
}
