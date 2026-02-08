import { CategoryForm } from "@/admin/components/forms/CategoryForm";
import { DashboardLayout } from "@/admin/components/layout/DashboardLayout";
import { useCategories } from "@/hooks/useCategories";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function EditCategoryPage() {
  const { categoryId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const { fetchCategoryById, editCategory } = useCategories();
  const handleSubmit = async (values) => {
    const res = await editCategory(categoryId, values);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchCategoryById(categoryId);
      if (res.success) {
        setInitialData({ name: res.category.name, slug: res.category.slug });
      }
    };
    if (!initialData) {
      fetch();
    }
  }, [categoryId]);
  return (
    <DashboardLayout>
      <Link to="/admin/categories" className="flex items-center gap-2">
        <ArrowLeft /> Back to categories
      </Link>
      <h2 className="text-h2">update Category</h2>
      <p>update category to organize your products.</p>
      <CategoryForm onSubmit={handleSubmit} initialData={initialData} />
    </DashboardLayout>
  );
}
