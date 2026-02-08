import { CategoryForm } from "@/admin/components/forms/CategoryForm";
import { DashboardLayout } from "@/admin/components/layout/DashboardLayout";
import { useCategories } from "@/hooks/useCategories";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function AddCategoryPage() {
  const { addCategory } = useCategories();
  const handleSubmit = async (data) => {
    const res = await addCategory(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <DashboardLayout>
      <Link to="/admin/categories" className="flex items-center gap-2">
        <ArrowLeft /> Back to categories
      </Link>
      <h2 className="text-h2">Add New Category</h2>
      <p>Create a new category to organize your products.</p>
      <CategoryForm onSubmit={handleSubmit} />
    </DashboardLayout>
  );
}
