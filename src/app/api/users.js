import { refreshAccessToken } from "../../admin/utils/utils";
import api from "../../api/axios";

export const login = async (payload) => {
  try {
    const response = await api.post("/users/login", payload);
    const { accessToken, refreshToken } = response.data;
    if (accessToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    const { email, name, role } = response.data.user;
    const user = {
      email,
      name,
      accessToken,
      refreshToken,
    };
    localStorage.setItem("user", JSON.stringify(user));
    // sending the role to the redux store
    return { ...user, role };
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else {
      return {
        message: "Failed to login",
      };
    }
  }
};
export const fetchLoggingUser = async () => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!accessToken) {
      throw new Error({
        name: "accessTokenMissing",
        message: "No access token found",
      });
    }
    const response = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.data.name === "accessTokenExpired") {
      console.log("access token expired refreshing token ...");
      try {
        await refreshAccessToken();
        const newAccessToken = localStorage.getItem("accessToken");
        const newRefreshToken = localStorage.getItem("refreshToken");
        const retryResponse = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            "x-refresh-token": newRefreshToken,
          },
        });
        console.log(retryResponse.data);
        return retryResponse.data;
      } catch (error) {
        console.log("error while refreshing token");
        return error.response.data;
      }
    } else {
      return error.response?.data;
    }
  }
};
export const getUsers = async () => {
  try {
    console.log("fetching the users");
    const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    if (error.response.data) {
      return error.response.data;
    } else {
      return {
        message: "Failed to get users",
      };
    }
  }
};
