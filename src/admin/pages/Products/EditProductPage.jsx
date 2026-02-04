import { DashboardLayout } from "@/admin/components/layout/DashboardLayout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/product.service";
import EditProductForm from "@/admin/components/forms/EditProductForm";

export default function EditProductPage() {
  const { productId } = useParams();
  const ProductsState = useSelector((state) => state.products);

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const buildInitialData = (product) => ({
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? "",
      categoryId: product?.categoryId?._id ?? "",
      gender: product?.gender ?? "",
      badge: product?.badge ?? "",
      sizes: product?.sizes ?? [],
      mainImage: undefined, // file only on submit
      additionalImages: [], // file only on submit
    });

    const fetchProduct = async () => {
      // 1️⃣ Try Redux first
      if (ProductsState.products?.length > 0) {
        const foundProduct = ProductsState.products.find(
          (item) => item._id === productId,
        );

        if (foundProduct) {
          setInitialData(buildInitialData(foundProduct));
          return;
        }
      }

      // 2️⃣ Fallback to API
      const result = await getProductById(productId);
      if (result?.success) {
        setInitialData(buildInitialData(result.product));
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, ProductsState.products]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl tracking-tight font-bold">Update Product</h1>
      <p className="text-gray-400 mb-6">
        Modify the product details and save your changes.
      </p>

      {initialData && <EditProductForm initialData={initialData} />}
    </DashboardLayout>
  );
}
