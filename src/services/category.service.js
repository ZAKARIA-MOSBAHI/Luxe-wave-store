import { buildApiResponse } from "@/lib/utils";
import api from "@/services/axios";
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    return buildApiResponse(false, error?.message || "Something went wrong!");
  }
};
