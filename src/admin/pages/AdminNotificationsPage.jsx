import { ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NotificationItem from "../components/Notifications/NotificationItem";
import { Button } from "@/components/ui/Button";
import { useNotifications } from "@/hooks/useNotifications";

export default function AdminNotificationsPage() {
  const navigate = useNavigate();
  const { notifications } = useNotifications();
  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin"); // fallback route
    }
  };

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
        {notifications?.map((notification) => (
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
