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
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload,
      );
      state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload,
      );
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount -= 1;
      }
    },
  },
});

export default notificationSlice.reducer;
export const { setNotification, removeNotification, markAsRead } =
  notificationSlice.actions;
