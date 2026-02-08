import { buildApiResponse } from "@/lib/utils";
import api from "@/services/axios";
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
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't Get User Favorite Products",
    );
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
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't Remove Favorite!",
    );
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

    return result.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't Add Favorite!",
    );
  }
};
