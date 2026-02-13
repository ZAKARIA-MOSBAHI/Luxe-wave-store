import { DashboardLayout } from "../../components/layout/DashboardLayout";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import OrdersTable from "./components/OrdersTable";
import { OrdersToolbar } from "./components/OrdersToolbar";

const Orders = () => {
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
