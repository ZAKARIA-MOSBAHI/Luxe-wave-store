// userThunks.js (or inside your slice file)
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { refreshAccessToken } from "../../admin/utils/utils";
import { getProducts } from "../api/products";
// Async method for login
export const getProductsToStore = createAsyncThunk(
  "products/get",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getProducts();
      return data.products;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ message: "Unknown error" });
    }
  }
);
export const addProduct = createAsyncThunk(
  "products/add",
  async (payload, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await api.post("/products", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken,
        },
      });
      return response.data; // Becomes `action.payload` in `fulfilled`
    } catch (error) {
      console.log(error);
      if (!error.response.data) {
        return rejectWithValue({
          message:
            error.message || "An error occurred while adding the product.",
        });
      }
      const { name, message } = error.response.data;

      if (name === "accessTokenExpired") {
        try {
          await refreshAccessToken();
          const newAccessToken = localStorage.getItem("accessToken");
          const newRefreshToken = localStorage.getItem("refreshToken");
          const retryResponse = await api.post("/products/", payload, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              "x-refresh-token": newRefreshToken,
            },
          });
          console.log(retryResponse.data);
          return retryResponse.data;
        } catch (refreshErr) {
          return rejectWithValue({
            message:
              refreshErr.message || "Session expired. Please log in again.",
          });
        }
      } else {
        return rejectWithValue({
          success: false,
        });
      }
    }
  }
);
