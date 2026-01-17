import api from "@/api/axios";
export async function getClientCart() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    if (!accessToken) {
      throw new Error("No access token found"); // this logs ?
    }
    const result = await api.get("/carts/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (e) {
    console.log("error getting client cart");
    console.log(e);
    return e.response?.data || { success: false, message: e.message };
  }
}
export async function addProductToCart(productId, size) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    if (!accessToken) {
      throw new Error("No access token found");
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
    console.log("error getting client cart");
    console.log(e);
    return e.response?.data || { success: false, message: e.message };
  }
}
export async function deleteCartItem(productId, size) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    if (!accessToken) {
      throw new Error("No access token found");
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
    console.log("error deleting item from client cart");
    console.log(e);
    return e.response?.data || { success: false, message: e.message };
  }
}
export async function decrementCartItemQuantity(productId, size) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    if (!accessToken) {
      throw new Error("No access token found");
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
    console.log("error decrementing  item quantity from client cart");
    console.log(e);
    return e.response?.data || { success: false, message: e.message };
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
  } catch (error) {
    return error.response?.data;
  }
}
