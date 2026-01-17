import api from "@/api/axios";

export async function getClientAddress(setUserAddress) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;

    if (!accessToken) {
      console.warn("No access token found, clearing user...");
      localStorage.removeItem("user");
      setUserAddress(null);
      return null;
    }

    const response = await api.get("/address/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setUserAddress(response.data || null);

    return response.data;
  } catch (error) {
    const backendErrorName = error.response?.data?.name;

    if (backendErrorName === "accessTokenExpired") {
      console.warn("Access token expired. You need to login again...");
      localStorage.removeItem("user");
      setUserAddress(null);
    } else {
      console.error("Error fetching client address:", error);
      setUserAddress(null);
    }

    return null;
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

    return result.data; // { user, newAddress }
  } catch (e) {
    console.log("error creating address");
    console.log(e);

    return (
      e.response?.data || {
        success: false,
        message: e.message,
      }
    );
  }
}
