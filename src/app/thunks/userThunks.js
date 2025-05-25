// userThunks.js (or inside your slice file)
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoggingUser, login } from "../api/users";
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
export const getLoggingUser = createAsyncThunk(
  "user/me",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchLoggingUser(payload);
      console.log("api response : ", response);
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
