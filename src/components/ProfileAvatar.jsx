import { cn } from "@/admin/utils/clsx";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import { useAuth } from "@/context/AuthProvider";

export default function ProfileAvatar({ className }) {
  const { user } = useAuth();
  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarFallback className="bg-gray-100">
        {user.name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
