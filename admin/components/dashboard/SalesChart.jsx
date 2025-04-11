import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Sample data - in a real application, this would come from an API
const monthlyData = [
  { name: "Jan", total: 4500 },
  { name: "Feb", total: 6300 },
  { name: "Mar", total: 5900 },
  { name: "Apr", total: 8100 },
  { name: "May", total: 7200 },
  { name: "Jun", total: 9000 },
  { name: "Jul", total: 7800 },
  { name: "Aug", total: 8600 },
  { name: "Sep", total: 10200 },
  { name: "Oct", total: 9100 },
  { name: "Nov", total: 12000 },
  { name: "Dec", total: 16000 },
];

const weeklyData = [
  { name: "Mon", sales: 2400, orders: 35 },
  { name: "Tue", sales: 1980, orders: 28 },
  { name: "Wed", sales: 2800, orders: 40 },
  { name: "Thu", sales: 3200, orders: 45 },
  { name: "Fri", sales: 4300, orders: 60 },
  { name: "Sat", sales: 5100, orders: 72 },
  { name: "Sun", sales: 3500, orders: 50 },
];

export function SalesChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          View your store's sales performance over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="monthly" className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => ["$" + value.toLocaleString(), "Sales"]}
                  labelFormatter={(label) => `${label} 2024`}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#3182ce"
                  fill="#bfdbfe"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="weekly" className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#3182ce" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                <Tooltip
                  formatter={(value, name) => {
                    return name === "sales"
                      ? ["$" + value.toLocaleString(), "Sales"]
                      : [value, "Orders"];
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="sales"
                  fill="#3182ce"
                  name="Sales"
                />
                <Bar
                  yAxisId="right"
                  dataKey="orders"
                  fill="#10b981"
                  name="Orders"
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
