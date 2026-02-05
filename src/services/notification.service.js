import { buildApiResponse } from "@/lib/utils";
import api from "@/services/axios";
export const getNotifications = async (limit) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const response = await api.get(`/notifications?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return buildApiResponse(
      false,
      error?.message || "Couldn't get notifications!",
    );
  }
};
export const markNotificationAsRead = async (notificationId) => {
  try {
    console.log("marking notif as read ", notificationId);
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const response = await api.put(
      `/notifications/${notificationId}/read`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return buildApiResponse(false, error?.message || "Something went wrong!");
  }
};
export const deleteNotification = async (notificationId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.accessToken;
    const response = await api.delete(`/notifications/${notificationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return buildApiResponse(false, error?.message || "Something went wrong!");
  }
};
