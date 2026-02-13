import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle,
  Eye,
  MoreHorizontal,
  PackageCheck,
  PackageX,
  Printer,
  Truck,
} from "lucide-react";
import { useAdminOrders } from "@/hooks/admin/useAdminOrders";
import { Link } from "react-router-dom";
export default function OrdersActions({ order }) {
  const {
    handleConfirmOrder,
    handleCancelOrder,
    handleDeliverOrder,
    handleShipOrder,
  } = useAdminOrders();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            className="flex items-center "
            to={`/admin/orders/${order?._id}`}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Printer className="mr-2 h-4 w-4" />
          Print Invoice
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => handleConfirmOrder(order?._id)}
          className="flex items-center gap-2"
          disabled={order?.orderStatus?.toLowerCase() !== "pending"}
        >
          <CheckCircle className="w-4 h-4" />
          Confirm Order
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleShipOrder(order?._id)}
          className="flex items-center gap-2"
          disabled={order?.orderStatus?.toLowerCase() !== "confirmed"}
        >
          <Truck className="w-4 h-4" />
          Ship Order
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleDeliverOrder(order?._id)}
          className="flex items-center gap-2"
          disabled={order?.orderStatus?.toLowerCase() !== "shipped"}
        >
          <PackageCheck className="w-4 h-4" />
          Deliver Order
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {order?.orderStatus?.toLowerCase() !== "shipped" &&
          order?.orderStatus?.toLowerCase() !== "cancelled" &&
          order?.orderStatus?.toLowerCase() !== "delivered" && (
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={() => handleCancelOrder(order?._id)}
            >
              <PackageX className="mr-2 h-4 w-4" />
              Cancel Order
            </DropdownMenuItem>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
