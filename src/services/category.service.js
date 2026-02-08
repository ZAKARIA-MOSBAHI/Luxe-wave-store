import { buildApiResponse } from "@/lib/utils";
import api from "@/services/axios";

export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Something went wrong!",
    );
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Failed to fetch category!",
    );
  }
};

export const createCategory = async (payload) => {
  try {
    const result = await api.post("/categories", payload);

    return result.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't create category!",
    );
  }
};

export const updateCategory = async (id, payload) => {
  try {
    const response = await api.put(`/categories/${id}`, payload);

    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Failed to update category!",
    );
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);

    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Failed to delete category!",
    );
  }
};
