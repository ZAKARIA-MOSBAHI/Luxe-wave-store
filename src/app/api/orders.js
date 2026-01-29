import api from "@/api/axios";
export const getOrders = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const response = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getClientOrders = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const response = await api.get("/orders/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const confirmOrder = async (orderId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const response = await api.put(
      `/orders/update/${orderId}/confirm`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const shipOrder = async (orderId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const response = await api.put(
      `/orders/update/${orderId}/ship`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deliverOrder = async (orderId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const response = await api.put(
      `/orders/update/${orderId}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const cancelOrder = async (orderId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const response = await api.delete(
      `/orders/cancel/${orderId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
