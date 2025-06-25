import api from "../../api/axios";

export const refreshAccessToken = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const refreshToken = user?.refreshToken;

    if (!refreshToken) throw new Error("No refresh token found");

    const response = await api.get("/refresh-token", {
      headers: {
        "x-refresh-token": refreshToken,
      },
    });

    console.log("New token response:", response);

    const { accessToken } = response.data;

    // Update Axios default Authorization header
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return accessToken;
  } catch (err) {
    const name = err?.response?.data?.name;
    const message =
      err?.response?.data?.message || err.message || "Unknown error";

    if (name === "refreshTokenExpired") {
      console.warn("Refresh token expired. Logging out...");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return null;
    }

    console.error("Token refresh failed:", message);
    throw new Error(message);
  }
};
