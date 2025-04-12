import { Button } from "../ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import {
  MoreHorizontal,
  Eye,
  Trash2,
  ShoppingCart,
  FileText,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";

const CartTable = ({ carts, sortBy, sortDirection, toggleSort }) => {
  const handleDelete = (id) => {
    toast.success("Cart has been deleted");
    console.log("Delete cart:", id);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort("items")}
            >
              <div className="flex items-center">
                Items
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort("totalValue")}
            >
              <div className="flex items-center">
                Value
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead
              className="hidden md:table-cell cursor-pointer"
              onClick={() => toggleSort("lastUpdated")}
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
          {carts.length > 0 ? (
            carts.map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{cart.user}</div>
                    <div className="text-sm text-muted-foreground">
                      {cart.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{cart.items}</TableCell>
                <TableCell>{cart.totalValue}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {cart.lastUpdated}
                </TableCell>
                <TableCell>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                      cart.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {cart.status}
                  </div>
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
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Edit Items
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Convert to Order
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDelete(cart.id)}
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
