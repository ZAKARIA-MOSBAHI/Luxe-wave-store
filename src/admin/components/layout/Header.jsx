import { Bell, Search, User } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { Logout } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthProvider";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <header className="flex h-16 items-center justify-end gap-8 md:justify-between border-b bg-background px-2 md:px-6">
      {/* Search Bar */}
      <div className="flex md:w-1/3"></div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New order placed #1234</DropdownMenuItem>
            <DropdownMenuItem>Low stock alert: Product XYZ</DropdownMenuItem>
            <DropdownMenuItem>New user registered</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
            <DropdownMenuItem onClick={() => navigate("/profile")}>
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
