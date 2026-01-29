import { Badge } from "@/components/ui/Badge";

import { TableCell, TableRow } from "@/components/ui/Table";
import { formatDistanceToNow } from "date-fns";
import { badgeColorsConfig } from "../../../../constants/order.constants";
import OrdersActions from "./OrdersActions";

export const OrderRow = ({ order }) => (
  <TableRow key={order?._id}>
    <TableCell className="font-medium">{order?.orderNumber}</TableCell>
    <TableCell>{order?.userId?.name}</TableCell>
    <TableCell className="hidden md:table-cell">
      {formatDistanceToNow(new Date(order?.createdAt), {
        addSuffix: true,
      })}
    </TableCell>
    <TableCell>
      <Badge variant={badgeColorsConfig[order?.orderStatus?.toLowerCase()]}>
        {order?.orderStatus?.toLowerCase()}
      </Badge>
    </TableCell>
    <TableCell className="hidden md:table-cell">
      <Badge variant={badgeColorsConfig[order?.paymentStatus?.toLowerCase()]}>
        {order?.paymentStatus?.toLowerCase()}
      </Badge>
    </TableCell>
    <TableCell className="text-right">{order?.total}</TableCell>
    <TableCell>
      <OrdersActions order={order} />
    </TableCell>
  </TableRow>
);
