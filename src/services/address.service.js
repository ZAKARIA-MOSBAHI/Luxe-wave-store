import { buildApiResponse } from "@/lib/utils";
import api from "@/services/axios";

export async function getClientAddress() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;

    if (!accessToken) {
      localStorage.removeItem("user");
      return buildApiResponse(false, "User is not authenticated!");
    }

    const response = await api.get("/address/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    return buildApiResponse(false, e?.message || "Something went wrong!");
  }
}

export async function createClientAddress(payload) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;

    if (!accessToken) {
      return buildApiResponse(false, "User is not authenticated!");
    }

    const result = await api.post("/address/me", payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (e) {
    return buildApiResponse(false, e?.message || "Something went wrong!");
  }
}
