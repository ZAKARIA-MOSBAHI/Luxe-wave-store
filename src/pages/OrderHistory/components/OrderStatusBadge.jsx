import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useEffect } from "react";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Package,
    badgeVariant: "warning",
  },
  confirmed: {
    label: "Confirmed",
    icon: Truck,
    badgeVariant: "info",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    badgeVariant: "info",
  },

  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    badgeVariant: "success",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    badgeVariant: "danger",
  },
  paid: {
    label: "Paid",
    icon: CheckCircle,
    badgeVariant: "success",
  },
  unpaid: {
    label: "Unpaid",
    icon: AlertCircle,
    badgeVariant: "warning",
  },
  refunded: {
    label: "Refunded",
    icon: XCircle,
    badgeVariant: "danger",
  },
};

export function OrderStatusBadge({ status, className }) {
  const variant = statusConfig[status?.toLowerCase()];
  useEffect(() => {
    console.log("render");
  }, []);

  if (!variant) {
    return (
      <Badge className={className} variant="secondary">
        {status ?? "Unknown"}
      </Badge>
    );
  }

  const Icon = variant.icon;

  return (
    <Badge className={className} variant={variant.badgeVariant}>
      <Icon className="h-3.5 w-3.5 mr-1" />
      {variant.label}
    </Badge>
  );
}
