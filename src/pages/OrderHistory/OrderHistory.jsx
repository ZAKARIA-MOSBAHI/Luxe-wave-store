import { useEffect, useState } from "react";

import { OrderCard } from "./components/OrderCard";
import { EmptyOrdersState } from "./components/EmptyOrderState";
import { useDispatch, useSelector } from "react-redux";
import { getClientOrders } from "@/app/api/orders";
import { setUserOrders } from "@/app/slices/userOrderSlice";

export default function OrderHistory() {
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
      paymentStatus: "refunded",
      paymentMethod: "CARD",
      createdAt: "2026-01-20T16:45:00Z",
    },
  ];
  const dispatch = useDispatch();
  const userOrderState = useSelector((state) => state.userOrderState);
  const [orders] = useState(mockOrders);
  useEffect(() => {
    const fetchUserOrders = async () => {
      const response = await getClientOrders();
      if (response?.success) {
        console.log(response);
        dispatch(setUserOrders(response?.orders));
      } else {
        console.error(response?.message);
      }
    };
    if (!userOrderState?.orders) {
      fetchUserOrders();
    }
  }, [userOrderState]);

  return (
    <div className="max-h-screen overflow-y-scroll  bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

          <p className="text-gray-500">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        {orders?.length > 0 && (
          <div className="flex flex-col gap-6">
            {userOrderState?.orders?.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {userOrderState?.orders?.length === 0 && <EmptyOrdersState />}
      </div>
    </div>
  );
}
