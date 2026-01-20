import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthProvider";

export default function UserHeader() {
  const { user } = useAuth();
  return (
    <div className="flex justify-between items-center pb-4 border-b border-b-1 border-gray-200">
      <Avatar className="h-8 w-8 cursor-pointer bg-gray-100 text-lg flex justify-center items-center">
        <AvatarFallback className="">
          {user?.name?.charAt(0)?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <p className="text-gray-600 text-sm md:text-base">{user?.email}</p>
    </div>
  );
}
