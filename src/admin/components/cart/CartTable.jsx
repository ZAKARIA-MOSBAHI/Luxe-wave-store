import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  MoreHorizontal,
  Eye,
  Trash2,
  FileText,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminCarts } from "@/hooks/admin/useAdminCarts";
import { useState } from "react";
import { formatDateToText } from "@/utils/formatDateToText";
import { Badge } from "@/components/ui/Badge";

const CartTable = () => {
  const [sortDirections, setSortDirections] = useState({
    items: null,
    total: null,
    updatedAt: null,
  });

  const { filteredCarts, sortCarts } = useAdminCarts();

  const handleDelete = (id) => {
    toast.success("Cart has been deleted");
    console.log("Delete cart:", id);
  };
  const handleSort = (column) => {
    const direction = sortDirections[column] === "asc" ? "desc" : "asc";
    setSortDirections((prev) => ({ ...prev, [column]: direction }));
    sortCarts(column, direction);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("items")}
            >
              <div className="flex items-center">
                Items
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("total")}
            >
              <div className="flex items-center">
                Total
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead
              className="hidden md:table-cell cursor-pointer"
              onClick={() => handleSort("updatedAt")}
            >
              <div className="flex items-center">
                Last Updated
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCarts?.length > 0 ? (
            filteredCarts.map((cart) => (
              <TableRow key={cart._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{cart.userId.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {cart.userId.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{cart.items.length}</TableCell>
                <TableCell>{cart.total}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDateToText(cart.updatedAt)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={cart.status === "active" ? "success" : "warning"}
                  >
                    {cart.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Convert to Order
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDelete(cart._id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Cart
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No carts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartTable;
