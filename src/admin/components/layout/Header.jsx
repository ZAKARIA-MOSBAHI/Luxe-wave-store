import { User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { Logout } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthProvider";
import NotificationMenu from "../NotificationMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotifications } from "@/app/api/notifications";
import { setNotification } from "@/app/slices/notificationSlice";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const notificationsState = useSelector((state) => state.notificationState);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getNotifications(5);
      if (response.success) {
        dispatch(setNotification(response));
      }
    };
    if (!notificationsState.notifications) {
      fetchNotifications();
    }
  }, []);
  return (
    <header className="flex h-16 items-center justify-end gap-8 md:justify-between border-b bg-background px-2 md:px-6">
      {/* Search Bar */}
      <div className="flex bg-red-500 md:w-1/3"></div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <NotificationMenu />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer bg-gray-100 text-lg flex justify-center items-center">
              <AvatarFallback className="">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/account")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={() => Logout()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
