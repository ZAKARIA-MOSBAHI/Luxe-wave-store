import { useParams, Link, useNavigate } from "react-router-dom";
import { OrderStatusBadge } from "../OrderHistory/components/OrderStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
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
import { EmptyStateUI } from "@/components/shared/EmptyStateUI";

export default function OrderDetails({ fetchOrderById }) {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetchOrderById(orderId);
      if (response.success) {
        setOrder(response.order);
      }
    };

    fetchOrder();
  }, [orderId, fetchOrderById]);

  if (!order) {
    return (
      <EmptyStateUI
        title={"Order not found!"}
        description={"The order you're looking for doesn't exist."}
        icon={<Package className="h-8 w-8 text-gray-500" />}
        link={<Link onClick={goBack}>Back to Orders</Link>}
      />
    );
  }

  const formattedDate = format(
    new Date(order?.createdAt),
    "MMMM dd, yyyy 'at' h:mm a",
  );

  return (
    <div className="min-h-screen ">
      <div className="container max-w-4xl ">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={goBack}
          className="inline-flex items-center gap-2  hover:underline transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Button>

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
