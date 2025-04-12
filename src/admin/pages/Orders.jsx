import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../components/ui/DropdownMenu";
import { Badge } from "../components/ui/Badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import {
  Search,
  MoreHorizontal,
  Eye,
  FileEdit,
  Printer,
  PackageX,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

// Sample data - in a real application, this would come from an API
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "Apr 9, 2025",
    total: "$245.99",
    status: "completed",
    items: 3,
    paymentStatus: "paid",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "Apr 8, 2025",
    total: "$189.50",
    status: "processing",
    items: 2,
    paymentStatus: "paid",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "Apr 8, 2025",
    total: "$78.25",
    status: "shipped",
    items: 1,
    paymentStatus: "paid",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "Apr 7, 2025",
    total: "$342.00",
    status: "processing",
    items: 4,
    paymentStatus: "paid",
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    date: "Apr 7, 2025",
    total: "$125.75",
    status: "pending",
    items: 2,
    paymentStatus: "pending",
  },
  {
    id: "ORD-006",
    customer: "Sarah Taylor",
    date: "Apr 6, 2025",
    total: "$89.99",
    status: "cancelled",
    items: 1,
    paymentStatus: "refunded",
  },
  {
    id: "ORD-007",
    customer: "David Brown",
    date: "Apr 6, 2025",
    total: "$432.50",
    status: "shipped",
    items: 5,
    paymentStatus: "paid",
  },
  {
    id: "ORD-008",
    customer: "Linda Miller",
    date: "Apr 5, 2025",
    total: "$156.75",
    status: "completed",
    items: 2,
    paymentStatus: "paid",
  },
];

function OrderStatus({ status }) {
  return (
    <Badge
      className={
        status === "completed"
          ? "bg-green-100 text-green-800 hover:bg-green-100/80"
          : status === "processing"
          ? "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
          : status === "shipped"
          ? "bg-purple-100 text-purple-800 hover:bg-purple-100/80"
          : status === "pending"
          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
          : "bg-red-100 text-red-800 hover:bg-red-100/80"
      }
    >
      {status}
    </Badge>
  );
}

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter(
    (order) =>
      (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || order.status === statusFilter)
  );

  const handleUpdateStatus = (id, status) => {
    toast.success(`Order ${id} status updated to ${status}`);
    console.log("Update order status:", id, status);
  };

  const handleCancelOrder = (id) => {
    toast.success(`Order ${id} has been cancelled`);
    console.log("Cancel order:", id);
  };

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by order ID or customer..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter Status
                    {statusFilter !== "all" && (
                      <Badge className="ml-2 capitalize">{statusFilter}</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <DropdownMenuRadioItem value="all">
                      All
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="pending">
                      Pending
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="processing">
                      Processing
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="shipped">
                      Shipped
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="completed">
                      Completed
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="cancelled">
                      Cancelled
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Payment
                    </TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {order.date}
                        </TableCell>
                        <TableCell>
                          <OrderStatus status={order.status} />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant="outline"
                            className={
                              order.paymentStatus === "paid"
                                ? "border-green-500 text-green-500"
                                : order.paymentStatus === "pending"
                                ? "border-yellow-500 text-yellow-500"
                                : "border-red-500 text-red-500"
                            }
                          >
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {order.total}
                        </TableCell>
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
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileEdit className="mr-2 h-4 w-4" />
                                Edit Order
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                Print Invoice
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>
                                Update Status
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id, "processing")
                                }
                                disabled={
                                  order.status === "processing" ||
                                  order.status === "cancelled"
                                }
                              >
                                Mark as Processing
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id, "shipped")
                                }
                                disabled={
                                  order.status === "shipped" ||
                                  order.status === "cancelled" ||
                                  order.status === "completed"
                                }
                              >
                                Mark as Shipped
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id, "completed")
                                }
                                disabled={
                                  order.status === "completed" ||
                                  order.status === "cancelled"
                                }
                              >
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {order.status !== "cancelled" &&
                                order.status !== "completed" && (
                                  <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600"
                                    onClick={() => handleCancelOrder(order.id)}
                                  >
                                    <PackageX className="mr-2 h-4 w-4" />
                                    Cancel Order
                                  </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
