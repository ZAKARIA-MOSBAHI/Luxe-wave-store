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
      return rejectWithValue({ message: "Unknown error" });
    }
  }
);
