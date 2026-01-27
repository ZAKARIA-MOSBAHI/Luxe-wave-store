import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Bell } from "lucide-react";
import NotificationItem from "./Notifications/NotificationItem";
import { useSelector } from "react-redux";

export default function NotificationMenu() {
  const notificationsState = useSelector((state) => state.notificationState);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {notificationsState.notifications?.filter((n) => !n.isRead).length >
            0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
              {notificationsState.notifications.filter((n) => !n.isRead).length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notificationsState.notifications?.map((notification) => (
          <DropdownMenuItem key={notification._id}>
            <NotificationItem notification={notification} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
