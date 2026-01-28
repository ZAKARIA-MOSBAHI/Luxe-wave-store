import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function EmptyOrdersState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
        <Package className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No orders yet
      </h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        When you place an order, it will appear here. Start shopping to see your
        orders!
      </p>
      <Button asChild>
        <Link to="/">Start Shopping</Link>
      </Button>
    </div>
  );
}
