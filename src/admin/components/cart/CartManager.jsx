import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import CartSearch from "./CartSearch";
import CartTable from "./CartTable";

const CartManager = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Active Shopping Carts</CardTitle>
        <CardDescription>View and manage user shopping carts</CardDescription>
      </CardHeader>
      <CardContent>
        <CartSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CartTable />
      </CardContent>
    </Card>
  );
};

export default CartManager;
