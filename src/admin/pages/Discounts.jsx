import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/DropdownMenu";
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import DiscountForm from "../components/forms/DiscountForm";
import { PhoneInput } from "../components/ui/PhoneInput";

// Sample data - in a real application, this would come from an API
const discounts = [
  {
    code: "SUMMER21",
    type: "Percentage",
    value: 20,
    validFrom: "2023-06-01",
    validTo: "2023-09-01",
    minCartValue: 100,
    maxDiscount: 50,
  },
  {
    code: "WINTER21",

    type: "Fixed",
    value: 10,
    validFrom: "2023-12-01",
    validTo: "2023-12-31",
    minCartValue: 50,
    maxDiscount: 20,
  },
];

const Discounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredDiscounts = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    toast.success("Product deleted successfully");
    console.log("Delete product:", id);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Discounts</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Discount
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Discount</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new discount to your inventory.
                </DialogDescription>
              </DialogHeader>
              <DiscountForm
                onSubmit={() => {
                  toast.success("Discount Created Successfully !", {
                    action: {
                      label: "Close",
                      onClick: () => console.log("Undo"),
                    },
                  });
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Discounts Inventory</CardTitle>
            <CardDescription>
              Manage your discount catalog and inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search discounts..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Valid from
                    </TableHead>
                    <TableHead>Valid to</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDiscounts.length > 0 ? (
                    filteredDiscounts.map((discount, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {discount.code}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {discount.type}
                        </TableCell>
                        <TableCell>{discount.value}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {discount.validFrom}
                        </TableCell>
                        <TableCell>{discount.validTo}</TableCell>
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
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleDelete(discount.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No discount found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Discounts;
