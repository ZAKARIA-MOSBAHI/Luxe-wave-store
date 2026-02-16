import { UserForm } from "@/admin/components/forms/UserForm";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function AddUserPage() {
  const { createUser } = useAdminUsers();

  const handleSubmit = async (values) => {
    let formdata = {};
    Object.keys(values).forEach((key) => {
      if (key === "confirmPassword") return;
      formdata[key] = values[key];
    });
    const res = await createUser(formdata);
    if (res.success) {
      toast.success(res.message);
      return true;
    } else {
      toast.error(res.message);
      return false;
    }
  };
  return (
    <div>
      <Link to="/admin/users" className="flex items-center gap-2">
        <ArrowLeft /> Back to users
      </Link>
      <h3 className="typography-h3">Add New Product</h3>
      <p className="text-zinc-200">
        Fill in the details to add a new user to your inventory.
      </p>

      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
