import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Badge } from "@/components/ui/Badge";
import { Search, Filter } from "lucide-react";
import { orderFilterOptions } from "../../../../constants/order.constants";
import { useOrders } from "../../../../hooks/useOrders";

export const OrdersToolbar = () => {
  const { ordersState, setFilterOption, setSearchQuery } = useOrders();
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by order ID or customer..."
          className="w-full pl-8"
          value={ordersState?.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter Status
            {ordersState?.filterOption !== "all" && (
              <Badge className="ml-2 capitalize">
                {ordersState?.filterOption}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={ordersState?.filterOption}
            onValueChange={setFilterOption}
          >
            {orderFilterOptions.map((opt) => (
              <DropdownMenuRadioItem
                value={opt}
                key={opt}
                className="capitalize"
              >
                {opt}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
