import api from "../../api/axios";
export const getProducts = async () => {
  try {
    const response = await api.get("/products/");
    return response.data;
  } catch (error) {
    return { success: false, message: error?.response?.message };
  }
};
export const getFilteredProducts = async (filterOptions) => {
  console.log("hello there from getFilteredProducts", filterOptions);

  try {
    const response = await api.post("/products/filter", filterOptions);
    console.log("📦 Response from backend:", response);
    return response.data;
  } catch (error) {
    console.error(
      "🔥 Backend call failed:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);

    return response.data;
  } catch (error) {
    console.log("error is : ");
    console.log(error.response.data);
    if (error.response) {
      return error.response.data.message;
    } else {
      return { success: false, message: "Failed to fetch product data" };
    }
  }
};
export const deleteProductById = async (productId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("deleting...");
    console.log("Product deleted successfully ");
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to delete product data");
    }
  }
};
export const getClientFavoriteProducts = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const result = await api.get("/favorites", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};
export const removeFavoriteProduct = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const result = await api.delete(`/favorites/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result.data;
  } catch (e) {
    return e.response.data;
  }
};
export const addFavoriteProduct = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const result = await api.post(
      `/favorites/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log("adding favorite product");

    return result.data;
  } catch (e) {
    console.log("error adding favorite product");
    console.log(e);
    return e.response.data;
  }
};

// ADMIN API CALLS
export const createProduct = async (payload) => {
  try {
    console.log("hello from createProduct api");
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const result = await api.post("/products", payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (e) {
    console.log("error adding   product");
    console.log(e);
    return e.response.data;
  }
};
