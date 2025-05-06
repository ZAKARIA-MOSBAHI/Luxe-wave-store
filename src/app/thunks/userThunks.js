// userThunks.js (or inside your slice file)
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/users";
// Async method for login
export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await login(payload);
      if (response.message) {
        return rejectWithValue(response);
      }
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ message: "Unknown error" });
    }
  }
);
