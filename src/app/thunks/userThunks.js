// userThunks.js (or inside your slice file)
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
// Async method for login
export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/login", payload);
      return response.data; // Becomes `action.payload` in `fulfilled`
    } catch (error) {
      return rejectWithValue(error.response.data); // Becomes `action.payload` in `rejected`
    }
  }
);
