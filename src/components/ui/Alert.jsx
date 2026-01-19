import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-md border px-4 py-3 text-sm sm:text-base flex items-start gap-2",
  {
    variants: {
      variant: {
        default: "bg-zinc-50 text-zinc-900 border-zinc-200",
        error: "bg-red-50 text-red-900 border-red-200",
        warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
        success: "bg-green-50 text-green-900 border-green-200",
        info: "bg-blue-50 text-blue-900 border-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(alertVariants({ variant, className }))}
        {...props}
      />
    );
  },
);
Alert.displayName = "Alert";

const AlertContent = ({ className, ...props }) => (
  <div className={cn("flex-1 leading-relaxed", className)} {...props} />
);

const AlertAction = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "font-semibold underline underline-offset-4 hover:opacity-80 whitespace-nowrap",
          className,
        )}
        {...props}
      />
    );
  },
);
AlertAction.displayName = "AlertAction";

export { Alert, AlertContent, AlertAction, alertVariants };
