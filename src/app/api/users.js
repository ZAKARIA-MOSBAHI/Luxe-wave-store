import api from "../../api/axios";

export const login = async (payload) => {
  try {
    const response = await api.post("/users/login", payload);
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
    return user;
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
export const getLoggingUser = async () => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!accessToken) {
      throw new Error({
        name: "accessTokenMissing",
        message: "No access token found",
      });
    }
    console.log("fetching the logging user");
    const response = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log(error?.message?.name);

    if (error.response?.data) {
      return error.response?.data;
    } else {
      return {
        message: "Failed to get user",
      };
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
