import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const statusConfig = {
  pending: {
    label: "pending",
    icon: Package,
    badgeVariant: "warning",
  },
  shipped: {
    label: "shipped",
    icon: Truck,
    badgeVariant: "info",
  },

  delivered: {
    label: "delivered",
    icon: CheckCircle2,
    badgeVariant: "success",
  },
  cancelled: {
    label: "cancelled",
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
  const Icon = variant?.icon;

  return (
    <Badge className={className} variant={variant?.badgeVariant}>
      <Icon className="h-3.5 w-3.5" />
      {variant?.label}
    </Badge>
  );
}
