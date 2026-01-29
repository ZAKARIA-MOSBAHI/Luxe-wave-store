import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Bell, Check } from "lucide-react";
import NotificationItem from "./Notifications/NotificationItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NotificationMenu() {
  const notificationsState = useSelector((state) => state.notificationState);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {notificationsState.unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
              {notificationsState.unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          <Button variant={"ghost"} onClick={() => alert("mark all as read")}>
            {" "}
            <Check size={20} />
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notificationsState.notifications?.map((notification) => (
          <DropdownMenuItem key={notification._id}>
            <NotificationItem notification={notification} />
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>
          <Link to="/admin/notifications " className="w-full">
            <Button className=" w-full"> See All</Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
