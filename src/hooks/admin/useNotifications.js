import {
  markAsRead,
  removeNotification,
  setNotification,
} from "@/app/slices/notificationSlice";
import { buildApiResponse } from "@/lib/utils";
import {
  deleteNotification,
  getNotifications,
  markNotificationAsRead,
} from "@/services/notification.service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useNotifications = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector(
    (state) => state.notificationState,
  );

  const markNotifAsRead = async (notificationId) => {
    const response = await markNotificationAsRead(notificationId);
    if (response.success) {
      dispatch(markAsRead(notificationId));
      return { success: true };
    } else {
      return buildApiResponse(false, response.message);
    }
  };
  const deleteNotif = async (notificationId) => {
    const response = await deleteNotification(notificationId);
    if (response.success) {
      dispatch(removeNotification(notificationId));
      return { success: true };
    } else {
      return buildApiResponse(false, response.message);
    }
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      const response = await getNotifications();

      if (response.success) {
        dispatch(
          setNotification({
            notifications: response.notifications,
            unreadCount: response.unreadCount,
          }),
        );
      } else {
        setError(response.message);
        setIsLoading(false);
      }
    };

    if (!notifications || notifications.length === 0) {
      fetchNotifications();
    }
  }, [dispatch, notifications]);

  return {
    notifications,
    unreadCount,
    error,
    isLoading,
    markNotifAsRead,
    deleteNotif,
  };
};
