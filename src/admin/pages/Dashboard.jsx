import { DashboardLayout } from "../components/layout/DashboardLayout";
import { StatCard } from "../components/dashboard/StatCard";
import { SalesChart } from "../components/dashboard/SalesChart";
import { RecentOrders } from "../components/dashboard/RecentfOrders";
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            icon={DollarSign}
            variant="success"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Orders"
            value="356"
            icon={ShoppingCart}
            variant="default"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Products"
            value="128"
            icon={Package}
            variant="info"
            trend={{ value: 3.1, isPositive: true }}
          />
          <StatCard
            title="Customers"
            value="573"
            icon={Users}
            variant="warning"
            trend={{ value: 5.7, isPositive: true }}
          />
        </div>

        {/* Sales Chart Section */}
        <SalesChart />

        {/* Recent Orders Table */}
        <RecentOrders />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
