import * as React from "react";
import { cn } from "../../utils/clsx";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

const inputVariants = cva(
  "flex w-full border border-zinc-900 bg-white  ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-zinc-900 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",

  {
    variants: {
      variant: { sharp: "rounded-none", default: "rounded-md" },
      size: {
        default: "h-10 px-3 py-2 text-base md:text-sm file:text-sm ",
        lg: "h-11  px-4 py-3 text-lg md:text-base file:text-base",
        xl: "h-13  px-6 py-4 text-lg md:text-base file:text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
const Input = React.forwardRef(
  ({ className, type, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    return (
      <Comp
        className={cn(inputVariants({ variant, size, className }))}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
