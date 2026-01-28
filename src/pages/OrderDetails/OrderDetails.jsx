import { useParams, Link } from "react-router-dom";
import { OrderStatusBadge } from "../OrderHistory/components/OrderStatusBadge";
import { PaymentStatusBadge } from "../OrderHistory/components/PaymentStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
const mockOrders = [
  {
    _id: "1",
    orderNumber: "ORD-001",
    userId: "user-123",
    items: [
      {
        product: {
          name: "Classic Denim Jacket",
          mainImage:
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=200&h=200&fit=crop",
          price: 129.99,
        },
        quantity: 1,
        size: "M",
      },
      {
        product: {
          name: "Slim Fit Chinos",
          mainImage:
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=200&fit=crop",
          price: 79.99,
        },
        quantity: 2,
        size: "32",
      },
    ],
    total: 289.97,
    shippingAddress: {
      street: "123 Main Street",
      city: "New York",
      country: "United States",
      zipcode: "10001",
    },
    orderStatus: "delivered",
    paymentStatus: "paid",
    paymentMethod: "CARD",
    createdAt: "2026-01-25T10:30:00Z",
  },
  {
    _id: "2",
    orderNumber: "ORD-002",
    userId: "user-123",
    items: [
      {
        product: {
          name: "Oversized Hoodie",
          mainImage:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop",
          price: 89.99,
        },
        quantity: 1,
        size: "L",
      },
    ],
    total: 89.99,
    shippingAddress: {
      street: "456 Oak Avenue",
      city: "Los Angeles",
      country: "United States",
      zipcode: "90001",
    },
    orderStatus: "shipped",
    paymentStatus: "paid",
    paymentMethod: "CARD",
    createdAt: "2026-01-26T14:15:00Z",
  },
  {
    _id: "3",
    orderNumber: "ORD-003",
    userId: "user-123",
    items: [
      {
        product: {
          name: "Wool Blend Overcoat",
          mainImage:
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&h=200&fit=crop",
          price: 249.99,
        },
        quantity: 1,
        size: "L",
      },
      {
        product: {
          name: "Cotton Crew Neck T-Shirt",
          mainImage:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
          price: 34.99,
        },
        quantity: 3,
        size: "M",
      },
    ],
    total: 354.96,
    shippingAddress: {
      street: "789 Pine Road",
      city: "Chicago",
      country: "United States",
      zipcode: "60601",
    },
    orderStatus: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "COD",
    createdAt: "2026-01-28T09:00:00Z",
  },
  {
    _id: "4",
    orderNumber: "ORD-004",
    userId: "user-123",
    items: [
      {
        product: {
          name: "High-Waist Skinny Jeans",
          mainImage:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop",
          price: 99.99,
        },
        quantity: 1,
        size: "28",
      },
      {
        product: {
          name: "Leather Belt",
          mainImage:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
          price: 45.99,
        },
        quantity: 1,
        size: "M",
      },
    ],
    total: 145.98,
    shippingAddress: {
      street: "321 Elm Street",
      city: "Miami",
      country: "United States",
      zipcode: "33101",
    },
    orderStatus: "cancelled",
    paymentStatus: "unpaid",
    paymentMethod: "CARD",
    createdAt: "2026-01-20T16:45:00Z",
  },
];
export default function OrderDetails() {
  const { orderId } = useParams();
  const order = mockOrders.find((o) => o._id === orderId);

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
    new Date(order.createdAt),
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
                {order.orderNumber}
              </h1>
              <OrderStatusBadge
                className={"flex items-center gap-2"}
                status={order.orderStatus}
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
              ${order.total.toFixed(2)}
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
                {order.items.map((item, index) => (
                  <OrderItemCard key={index} item={item} />
                ))}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>${order.total.toFixed(2)}</span>
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
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.zipcode}
                </p>
                <p>{order.shippingAddress.country}</p>
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
                  <PaymentStatusBadge
                    className={"flex items-center gap-2"}
                    status={order.paymentStatus}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Method</span>
                  <span className="flex items-center gap-2 font-medium">
                    {order.paymentMethod === "CARD" ? (
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
                    Items ({order.items.length})
                  </span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
