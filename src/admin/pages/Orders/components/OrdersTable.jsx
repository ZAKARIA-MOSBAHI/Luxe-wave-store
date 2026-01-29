import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { useOrders } from "@/hooks/useOrders";

import { OrderRow } from "./OrderRow";
function OrdersTable() {
  const { ordersState } = useOrders();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Payment</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="w-[70px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordersState?.filteredOrders?.length > 0 ? (
          ordersState?.filteredOrders?.map((order) => (
            <OrderRow key={order?._id} order={order} />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No orders found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default OrdersTable;
