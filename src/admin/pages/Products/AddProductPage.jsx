import { AddProductForm } from "@/admin/components/forms/AddProductForm";
import { DashboardLayout } from "@/admin/components/layout/DashboardLayout";
import React from "react";

export default function AddProductPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl tracking-tight font-bold ">Add New Product</h1>
      <p className="text-gray-400 mb-6">
        Fill in the details to add a new product to your inventory.
      </p>
      <AddProductForm />
    </DashboardLayout>
  );
}
