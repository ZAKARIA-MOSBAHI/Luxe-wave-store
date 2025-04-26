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
    console.log("fetching the logging user");
    const response = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).accessToken
        }`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else {
      return {
        message: "Failed to get user",
      };
    }
  }
};
