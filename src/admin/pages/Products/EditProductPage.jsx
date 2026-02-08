import { DashboardLayout } from "@/admin/components/layout/DashboardLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "sonner";
import ProductForm from "@/admin/components/forms/ProductForm";
import { useCategories } from "@/hooks/useCategories";

export default function EditProductPage() {
  const { productId } = useParams();
  const { product } = useProduct(productId);
  const { editProduct } = useProducts();
  const { incrementProductsCount, decrementProductsCount } = useCategories();
  const [initialData, setInitialData] = useState(null);

  const handleSubmit = async (formData) => {
    const oldCategoryId = initialData?.categoryId;

    const newCategoryId = formData.get("categoryId");

    const response = await editProduct(productId, formData);

    if (response.success) {
      if (oldCategoryId && newCategoryId && oldCategoryId !== newCategoryId) {
        decrementProductsCount(oldCategoryId);
        incrementProductsCount(newCategoryId);
      }

      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    const buildInitialData = (product) => ({
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? "",
      categoryId: product?.categoryId?._id ?? "",
      gender: product?.gender ?? "",
      badge: product?.badge ?? "",
      sizes: product?.sizes ?? [],
      mainImage: product?.mainImage?.url,
      additionalImages: product?.additionalImages,
    });
    if (product) {
      setInitialData(buildInitialData(product));
    }
  }, [productId, product]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl tracking-tight font-bold">Update Product</h1>
      <p className="text-gray-400 mb-6">
        Modify the product details and save your changes.
      </p>

      {initialData && (
        <ProductForm initialData={initialData} onSubmit={handleSubmit} />
      )}
    </DashboardLayout>
  );
}
