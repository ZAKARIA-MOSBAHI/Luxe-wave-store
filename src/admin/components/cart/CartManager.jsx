import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import {
  carts,
  getTimeDifference,
  SortByOptions,
  SortDirections,
} from "../../utils/cartUtils";
import CartSearch from "./CartSearch";
import CartTable from "./CartTable";

const CartManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(SortByOptions.LAST_UPDATED);
  const [sortDirection, setSortDirection] = useState(SortDirections.DESC);

  const filteredCarts = carts
    .filter(
      (cart) =>
        cart.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cart.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cart.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === SortByOptions.TOTAL_VALUE) {
        const aValue = parseFloat(a.totalValue.replace("$", ""));
        const bValue = parseFloat(b.totalValue.replace("$", ""));
        return sortDirection === SortDirections.ASC
          ? aValue - bValue
          : bValue - aValue;
      } else if (sortBy === SortByOptions.ITEMS) {
        return sortDirection === SortDirections.ASC
          ? a.items - b.items
          : b.items - a.items;
      } else {
        // Sort by lastUpdated (default)
        const aDate = getTimeDifference(a.lastUpdated);
        const bDate = getTimeDifference(b.lastUpdated);
        return sortDirection === SortDirections.ASC
          ? aDate - bDate
          : bDate - aDate;
      }
    });

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(
        sortDirection === SortDirections.ASC
          ? SortDirections.DESC
          : SortDirections.ASC
      );
    } else {
      setSortBy(column);
      setSortDirection(SortDirections.DESC);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Active Shopping Carts</CardTitle>
        <CardDescription>View and manage user shopping carts</CardDescription>
      </CardHeader>
      <CardContent>
        <CartSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CartTable
          carts={filteredCarts}
          sortBy={sortBy}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
        />
      </CardContent>
    </Card>
  );
};

export default CartManager;
