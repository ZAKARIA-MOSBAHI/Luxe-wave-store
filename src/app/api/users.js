import { refreshAccessToken } from "../../admin/utils/utils";
import api from "../../api/axios";

export const signup = async (payload, setUser) => {
  try {
    const response = await api.post("/users/signup", payload);
    console.log("response.data is ", response.data); // WHY IS THIS NOT logging?
    // response structure => response : {data : {user , success , message } }
    const { accessToken, refreshToken, email, name } = response.data.user;
    localStorage.setItem(
      "user",
      JSON.stringify({ accessToken, refreshToken, email, name })
    );
    setUser(response.data.user);

    return { success: true };
  } catch (error) {
    console.log("error data is ", error);
    // error structure => error : {response : {data : {field , success , message } }}
    return error;
  }
};
export const login = async (payload, setUser) => {
  try {
    const response = await api.post("/users/login", payload);
    console.log("api response : ", response);

    const { accessToken, refreshToken } = response.data;
    if (accessToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    const { email, name } = response.data.user;
    const user = {
      email,
      name,
      accessToken,
      refreshToken,
    };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(response.data.user);
    // refresh token shouldn't be in local storage
    return { success: true };
  } catch (error) {
    console.log("api error : ", error);
    if (error.response.data) {
      return {
        success: false,
        message: error.response.data.message,
      };
    } else {
      return {
        message: "Failed to login",
      };
    }
  }
};
export const fetchLoggingUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;

    if (!accessToken) {
      const err = new Error("No access token found");
      err.name = "accessTokenMissing";
      throw err;
      // why the code completes executing after this throw?
    }

    // Initial request with existing access token
    const response = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { accessToken, ...response.data };
  } catch (error) {
    const backendErrorName = error.response?.data?.name;

    if (backendErrorName === "accessTokenExpired") {
      console.warn("Access token expired. Attempting refresh...");

      try {
        await refreshAccessToken(); // Assumes it updates localStorage with new tokens

        const newUser = JSON.parse(localStorage.getItem("user"));
        const newAccessToken = newUser?.accessToken;
        const newRefreshToken = newUser?.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          throw new Error("Missing new tokens after refresh");
        }

        // Retry the original request with refreshed token
        const retryResponse = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            "x-refresh-token": newRefreshToken, // if required by your backend
          },
        });

        return { accessToken: newAccessToken, ...retryResponse.data };
      } catch (refreshError) {
        console.error("Error during token refresh:", refreshError);
        console.error("Token refresh failed. Logging out.");
        window.location.href = "/login"; // force re-auth
        return null;
      }
    } else {
      // Other errors (not related to token)
      console.error(error);
      localStorage.removeItem("user");
      return null;
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
