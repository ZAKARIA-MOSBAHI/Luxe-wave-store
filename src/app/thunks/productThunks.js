// userThunks.js (or inside your slice file)
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
// Async method for login
export const getProducts = createAsyncThunk(
  "products/get",
  async (payload, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await api.get("/products/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken,
        },
      });
      return response.data; // Becomes `action.payload` in `fulfilled`
    } catch (error) {
      return rejectWithValue(error.response.data); // Becomes `action.payload` in `rejected`
    }
  }
);
