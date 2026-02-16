import { buildApiResponse } from "@/lib/utils";
import api from "@/services/axios";

export const signup = async (payload, setUser) => {
  try {
    const response = await api.post("/users/signup", payload);
    console.log("response.data is ", response.data); // WHY IS THIS NOT logging?
    // response structure => response : {data : {user , success , message } }
    const { accessToken, refreshToken, email, name } = response.data.user;
    localStorage.setItem(
      "user",
      JSON.stringify({ accessToken, refreshToken, email, name }),
    );
    setUser(response.data.user);

    return { success: true };
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't create account!",
    );
  }
};
export const login = async (payload, setUser) => {
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
    setUser(response.data.user);
    // refresh token shouldn't be in local storage
    return { success: true };
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't Login!",
    );
  }
};
export const fetchLoggingUser = async (setUser) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;

    if (!accessToken) {
      // const err = new Error("No access token found");
      // err.name = "accessTokenMissing";
      // throw err;
      localStorage.removeItem("user");
      setUser(null);
    }

    // Initial request with existing access token
    const response = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { accessToken, ...response.data };
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't get account informations!",
    );
  }
};
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't get users!",
    );
  }
};
export const suspendUserInApi = async (userId) => {
  try {
    const response = await api.put(`/users/suspend/${userId}`);

    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't update account informations!",
    );
  }
};
export const deleteUserInApi = async (userId) => {
  try {
    const response = await api.delete(`/users/delete/${userId}`);

    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't delete account!",
    );
  }
};
export const createUserInApi = async (payload) => {
  try {
    const response = await api.post(`/users/create`, payload);
    return response.data;
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't create account!",
    );
  }
};

export const updateUser = async (payload, setUser) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.accessToken) {
      setUser(null);
      return { success: false, message: "No access token found" };
    }

    const response = await api.put("/users/update", payload, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    console.log("%c User updated:", "color: green;", response.data);
    setUser(response.data.user);

    return { success: true, user: response.data.user };
  } catch (e) {
    return buildApiResponse(
      false,
      e?.response?.data?.message || "Couldn't update account informations!",
    );
  }
};
