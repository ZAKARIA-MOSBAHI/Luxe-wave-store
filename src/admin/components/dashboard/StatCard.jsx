import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { cn } from "../../utils/clsx";
import { cva } from "class-variance-authority";

const iconVariants = cva("h-8 w-8 rounded-md p-1.5", {
  variants: {
    variant: {
      default: "bg-blue-100 text-blue-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-amber-100 text-amber-700",
      danger: "bg-red-100 text-red-700",
      info: "bg-indigo-100 text-indigo-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  variant,
  className,
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn(iconVariants({ variant }))} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p
            className={cn(
              "mt-1 text-xs",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            <span>
              {trend.isPositive ? "↑" : "↓"} {trend.value}%
            </span>
            <span className="text-muted-foreground"> vs last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
