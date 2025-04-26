import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/userThunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    status: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    resetRequestResults: (state) => {
      // Resetting the request results to null
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default userSlice.reducer;
export const { setUser, resetRequestResults } = userSlice.actions;
