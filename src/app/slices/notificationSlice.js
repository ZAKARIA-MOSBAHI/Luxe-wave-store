import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: null,
    unreadCount: 0,
  },
  reducers: {
    setNotification: (state, action) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.isRead).length;
    },
  },
});

export default notificationSlice.reducer;
export const { setNotification } = notificationSlice.actions;
