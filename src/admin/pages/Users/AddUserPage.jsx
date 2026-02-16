import { UserForm } from "@/admin/components/forms/UserForm";

export default function AddUserPage() {
  const handleSubmit = (values) => {
    console.warn("form submit");
    console.log(values);
  };
  return (
    <div>
      <h3 className="typography-h3">Add New Product</h3>
      <p className="text-zinc-200">
        Fill in the details to add a new user to your inventory.
      </p>

      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
