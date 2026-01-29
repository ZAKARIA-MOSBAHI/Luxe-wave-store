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
export const getClientOrders = async () => {};
