import ProductForm from "@/admin/components/forms/ProductForm";
import { DashboardLayout } from "@/admin/components/layout/DashboardLayout";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "sonner";

export default function AddProductPage() {
  const { addProduct } = useProducts();
  const handleSubmit = async (formData) => {
    const response = await addProduct(formData);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <DashboardLayout>
      <h1 className="text-3xl tracking-tight font-bold ">Add New Product</h1>
      <p className="text-gray-400 mb-6">
        Fill in the details to add a new product to your inventory.
      </p>
      <ProductForm onSubmit={handleSubmit} />
    </DashboardLayout>
  );
}
