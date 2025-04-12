import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import { Badge } from "../ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { MoreHorizontal, Eye } from "lucide-react";
import { cn } from "../../utils/utils";
// Sample data - in a real application, this would come from an API
const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "Apr 9, 2025",
    total: "$245.99",
    status: "completed",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "Apr 8, 2025",
    total: "$189.50",
    status: "processing",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "Apr 8, 2025",
    total: "$78.25",
    status: "shipped",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "Apr 7, 2025",
    total: "$342.00",
    status: "processing",
    items: 4,
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    date: "Apr 7, 2025",
    total: "$125.75",
    status: "pending",
    items: 2,
  },
];

export function RecentOrders() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          A list of your store's most recent orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {order.date}
                </TableCell>
                <TableCell>
                  <OrderStatus status={order.status} />
                </TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                <TableCell>
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
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Cancel order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function OrderStatus({ status }) {
  return (
    <Badge
      className={cn(
        "capitalize",
        status === "completed" &&
          "bg-green-100 text-green-800 hover:bg-green-100/80",
        status === "processing" &&
          "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
        status === "shipped" &&
          "bg-purple-100 text-purple-800 hover:bg-purple-100/80",
        status === "pending" &&
          "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
        status === "cancelled" && "bg-red-100 text-red-800 hover:bg-red-100/80"
      )}
    >
      {status}
    </Badge>
  );
}
