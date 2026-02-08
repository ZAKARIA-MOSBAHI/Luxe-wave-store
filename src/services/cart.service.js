import { buildApiResponse } from "@/lib/utils";
import api from "@/services/axios";
export async function getClientCart() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    if (!accessToken) {
      return { success: false, message: "User not authenticated" };
    }
    const result = await api.get("/carts/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't get cart!",
    );
  }
}
export async function addProductToCart(productId, size) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    if (!accessToken) {
      return { success: false, message: "User not authenticated" };
    }
    const result = await api.post(
      "/carts/me/items",
      {
        productId,
        itemSize: size,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return result.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't add product in cart!",
    );
  }
}
export async function deleteCartItem(productId, size) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    if (!accessToken) {
      return { success: false, message: "User not authenticated" };
    }
    const result = await api.delete("/carts/me/items", {
      data: {
        productId,
        itemSize: size,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't delete product from cart!",
    );
  }
}
export async function decrementCartItemQuantity(productId, size) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    if (!accessToken) {
      return { success: false, message: "User not authenticated" };
    }
    const result = await api.put(
      "/carts/me/items/update",
      {
        productId,
        itemSize: size,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return result.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't decrement product quantity!",
    );
  }
}

export async function updateCartItemSize(productId, oldSize, newSize) {
  try {
    // Get access token from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;

    if (!accessToken) {
      console.warn("No access token found. Please login again.");
      localStorage.removeItem("user");
      return { success: false, message: "User not authenticated" };
    }

    // Send PUT request
    const response = await api.put(
      "/carts/me/items/update-size",
      { productId, oldSize, newSize },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't update product size!",
    );
  }
}
