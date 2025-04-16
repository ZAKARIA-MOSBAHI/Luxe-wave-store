// userThunks.js (or inside your slice file)
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { refreshAccessToken } from "../../utils/utils";
// Async method for login
export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/login", payload);
      const { accessToken, refreshToken } = response.data;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      return response.data;
    } catch (error) {
      // Access token expired, try refreshing
      if (
        error.response?.status === 401 &&
        error.response.data?.name === "accessTokenExpired"
      ) {
        console.log("access token expired, refreshing...");
        // try {
        //   await refreshAccessToken();
        //   const retryResponse = await api.post("/users/login", payload);
        //   return retryResponse.data;
        // } catch (refreshErr) {
        //   return rejectWithValue({
        //     message: "Session expired. Please log in again.",
        //   });
        // }
      }

      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);
