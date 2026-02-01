import { DashboardLayout } from "@/admin/components/layout/DashboardLayout";
import React from "react";
import { useParams } from "react-router-dom";

export default function EditProductPage() {
  const { productId } = useParams();

  return (
    <DashboardLayout>
      <div>Edit</div>
      <div>{productId}</div>
    </DashboardLayout>
  );
}
