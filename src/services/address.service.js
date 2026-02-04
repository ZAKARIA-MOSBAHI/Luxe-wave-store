import api from "@/services/axios";

export async function getClientAddress() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;

    if (!accessToken) {
      console.warn("No access token found, clearing user...");
      localStorage.removeItem("user");
      return null;
    }

    const response = await api.get("/address/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    return (
      e.response?.data || {
        success: false,
        message: e.message,
      }
    );
  }
}

export async function createClientAddress(payload) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const result = await api.post("/address/me", payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (e) {
    return (
      e.response?.data || {
        success: false,
        message: e.message,
      }
    );
  }
}
