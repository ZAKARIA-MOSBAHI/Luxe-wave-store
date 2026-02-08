import { buildApiResponse } from "@/lib/utils";
import api from "@/services/axios";
export const getProducts = async () => {
  try {
    const response = await api.get("/products/");
    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't get products!",
    );
  }
};
// this not used
export const getFilteredProducts = async (filterOptions) => {
  console.log("hello there from getFilteredProducts", filterOptions);

  try {
    const response = await api.post("/products/filter", filterOptions);
    console.log("📦 Response from backend:", response);
    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't get products!",
    );
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);

    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't get product!",
    );
  }
};

// ADMIN API CALLS
export const createProduct = async (payload) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const result = await api.post("/products", payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't create product!",
    );
  }
};
export const updateProduct = async (productId, payload) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const result = await api.put(`/products/${productId}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.error("h");
    console.log(result.data);
    return result.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't update product",
    );
  }
};
export const deleteProductById = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;

    if (!accessToken) {
      localStorage.removeItem("user");
      return buildApiResponse(false, "Unauthorized");
    }
    const response = await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Failed to delete product data",
    );
  }
};
