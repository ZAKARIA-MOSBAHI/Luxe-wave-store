import api from "../api/axios";
export const refreshAccessToken = async () => {
  try {
    const response = await api.get("/refresh-token", {
      headers: {
        "x-refresh-token": localStorage.getItem("refreshToken"),
      },
    });

    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // Update axios default header
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return accessToken;
  } catch (err) {
    const { name, message } = err.response.data;
    if (name === "refreshTokenExpired") {
      // Handle refresh token expiration (e.g., redirect to login)
      console.log("Refresh token expired. Please log in again.");
      return (window.location.href = "/register");
    } else {
      throw new Error(err.message);
    }
  }
};
