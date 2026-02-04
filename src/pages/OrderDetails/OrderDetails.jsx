import { useParams, Link } from "react-router-dom";
import { OrderStatusBadge } from "../OrderHistory/components/OrderStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Banknote,
  MapPin,
  Package,
} from "lucide-react";
import { format } from "date-fns";
import { OrderItemCard } from "./components/OrderItemCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getClientOrderById } from "@/services/order.service";

export default function OrderDetails() {
  const { orderId } = useParams();
  const userOrderState = useSelector((state) => state.userOrderState);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchClientOrderById = async () => {
      const response = await getClientOrderById(orderId);
      if (response?.success) {
        console.log(response);
        setOrder(response?.order);
      } else {
        console.error(response?.message);
      }
    };
    if (!userOrderState?.orders) {
      fetchClientOrderById();
    } else {
      setOrder(userOrderState?.orders?.find((o) => o._id === orderId));
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mx-auto mb-4">
            <Package className="h-8 w-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Order not found
          </h2>
          <p className="text-gray-500 mb-4">
            The order you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/account/order-history">Back to Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = format(
    new Date(order?.createdAt),
    "MMMM dd, yyyy 'at' h:mm a",
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl py-8 px-4">
        {/* Back Button */}
        <Link
          to="/account/order-history"
          className="inline-flex items-center gap-2  hover:underline transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {order?.orderNumber}
              </h1>
              <OrderStatusBadge
                className={"flex items-center gap-2"}
                status={order?.orderStatus}
              />
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">
              ${order?.total.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order?.items.map((item, index) => (
                  <OrderItemCard key={index} item={item} />
                ))}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>${order?.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-gray-900">
                <p>{order?.shippingAddress.street}</p>
                <p>
                  {order?.shippingAddress.city},{" "}
                  {order?.shippingAddress.zipcode}
                </p>
                <p>{order?.shippingAddress.country}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <OrderStatusBadge
                    className={"flex items-center gap-2"}
                    status={order?.paymentStatus}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Method</span>
                  <span className="flex items-center gap-2 font-medium">
                    {order?.paymentMethod === "CARD" ? (
                      <>
                        <CreditCard className="h-4 w-4" /> Card
                      </>
                    ) : (
                      <>
                        <Banknote className="h-4 w-4" /> Cash on Delivery
                      </>
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Items ({order?.items.length})
                  </span>
                  <span>${order?.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${order?.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
