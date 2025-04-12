import { useState } from "react";
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
import { ProductForm } from "../components/forms/ProductForm";
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

// Sample data - in a real application, this would come from an API
const products = [
  {
    id: "prod-1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$129.99",
    stock: 45,
    status: "In Stock",
  },
  {
    id: "prod-2",
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: "$24.99",
    stock: 150,
    status: "In Stock",
  },
  {
    id: "prod-3",
    name: "Blender",
    category: "Home & Kitchen",
    price: "$79.99",
    stock: 23,
    status: "In Stock",
  },
  {
    id: "prod-4",
    name: "Mystery Novel",
    category: "Books",
    price: "$14.99",
    stock: 67,
    status: "In Stock",
  },
  {
    id: "prod-5",
    name: "Board Game",
    category: "Toys & Games",
    price: "$49.99",
    stock: 12,
    status: "Low Stock",
  },
  {
    id: "prod-6",
    name: "Smart Watch",
    category: "Electronics",
    price: "$199.99",
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "prod-7",
    name: "Denim Jeans",
    category: "Clothing",
    price: "$59.99",
    stock: 78,
    status: "In Stock",
  },
  {
    id: "prod-8",
    name: "Coffee Maker",
    category: "Home & Kitchen",
    price: "$89.99",
    stock: 15,
    status: "Low Stock",
  },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    toast.success("Product deleted successfully");
    console.log("Delete product:", id);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Products</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new product to your inventory.
                </DialogDescription>
              </DialogHeader>
              <ProductForm
                onSubmit={() => {
                  toast.success("Product added successfully");
                  setDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>
              Manage your product catalog and inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
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
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Category
                    </TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Stock
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.category}
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.stock}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              product.status === "In Stock"
                                ? "bg-green-100 text-green-800 hover:bg-green-100/80"
                                : product.status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
                                : "bg-red-100 text-red-800 hover:bg-red-100/80"
                            }
                          >
                            {product.status}
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
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleDelete(product.id)}
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
                        No products found.
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

export default Products;
