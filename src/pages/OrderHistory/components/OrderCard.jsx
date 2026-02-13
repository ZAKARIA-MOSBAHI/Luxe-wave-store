import { ChevronRight, Banknote, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { Card, CardContent } from "@/components/ui/Card";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { returnImgUrl } from "@/lib/utils";

export function OrderCard({ order }) {
  const formattedDate = format(new Date(order?.createdAt), "MMM dd, yyyy");

  return (
    <Link to={`/account/order-history/${order?._id}`}>
      <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left section */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900">
                  {order?.orderNumber}
                </h3>
                <OrderStatusBadge
                  status={order?.orderStatus?.toLowerCase()}
                  className={"flex items-center gap-2"}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>

                <span className="flex items-center gap-1.5">
                  <Banknote className="h-4 w-4" />
                  Cash on Delivery
                </span>

                <OrderStatusBadge
                  status={order?.paymentStatus}
                  className={"flex items-center gap-2"}
                />
              </div>

              {/* Items preview */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {order?.items?.slice(0, 3)?.map((item, index) => (
                    <img
                      key={index}
                      src={returnImgUrl(item?.product?.mainImage?.url)}
                      alt={item?.product?.name}
                      className="h-10 w-10 rounded-lg border-2 border-white object-cover"
                    />
                  ))}

                  {order?.items?.length > 3 && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-white bg-gray-100 text-xs font-medium text-gray-500">
                      +{order?.items?.length - 3}
                    </div>
                  )}
                </div>

                <span className="text-sm text-gray-500">
                  {order?.items?.length}{" "}
                  {order?.items?.length === 1 ? "item" : "items"}
                </span>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-semibold text-gray-900">
                  {order?.total?.toFixed(2)} MAD
                </p>
              </div>

              <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
