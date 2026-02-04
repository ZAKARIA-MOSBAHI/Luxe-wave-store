import { getNotifications } from "@/services/notification.service";
import { setNotification } from "@/app/slices/notificationSlice";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NotificationItem from "../components/Notifications/NotificationItem";
import { Button } from "@/components/ui/Button";

export default function AdminNotificationsPage() {
  const navigate = useNavigate();
  const notificationsState = useSelector((state) => state.notificationState);
  const dispatch = useDispatch();
  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin"); // fallback route
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getNotifications();
      if (response.success) {
        dispatch(setNotification(response));
      }
    };

    if (
      !notificationsState.notifications ||
      notificationsState.notifications?.length === 5
    ) {
      fetchNotifications();
    }
  }, []);
  return (
    <div className="max-w-2xl h-full w-full  mx-auto">
      <div className="flex justify-between items-center  border-b border-b-gray-900">
        <Link onClick={goBack} className="py-4 flex gap-2 items-center">
          <ArrowLeft size={20} />{" "}
          <span className="font-medium">Back to Dashboard</span>
        </Link>
        <Button variant="ghost" onClick={() => alert("mark all as read")}>
          <Check />
        </Button>
      </div>
      <div className="flex flex-col divide-y divide-gray-200">
        {notificationsState.notifications?.map((notification) => (
          <NotificationItem
            className={"py-4"}
            key={notification?._id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
}
