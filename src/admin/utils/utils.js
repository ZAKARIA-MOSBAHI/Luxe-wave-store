import api from "../../api/axios";
export const refreshAccessToken = async () => {
  try {
    const userRefreshToken = JSON.parse(
      localStorage.getItem("user")
    )?.refreshToken;
    const response = await api.get("/refresh-token", {
      headers: {
        "x-refresh-token": userRefreshToken,
      },
    });
    console.log("response  of remaking the token: ", response);

    const { accessToken, refreshToken } = response.data;
    const oldUser = JSON.parse(localStorage.getItem("user"));
    const newUser = {
      ...oldUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    localStorage.setItem("user", JSON.stringify(newUser));

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
      console.log(err);
      throw new Error(err.message);
    }
  }
};
