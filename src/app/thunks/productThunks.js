// userThunks.js (or inside your slice file)
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { refreshAccessToken } from "../../utils/utils";
// Async method for login
export const getProducts = createAsyncThunk(
  "products/get",
  async (payload, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await api.get("/products/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken,
        },
      });
      return response.data; // Becomes `action.payload` in `fulfilled`
    } catch (error) {
      const { name, message } = error.response.data;
      if (name === "accessTokenExpired") {
        try {
          await refreshAccessToken();
          const retryResponse = await api.get("/products/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "x-refresh-token": refreshToken,
            },
          });
          return retryResponse.data;
        } catch (refreshErr) {
          return rejectWithValue({
            message:
              refreshErr.message || "Session expired. Please log in again.",
          });
        }
      }
    }
  }
);
