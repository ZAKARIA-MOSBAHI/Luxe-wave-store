import { Archive, Bookmark, Heart, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/admin/components/ui/Button";
import { useDeviceType } from "@/hooks/useDeviceType";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/Tooltip";

const navItems = [
  { icon: Archive, label: "Order History", path: "/profile/orders" },
  { icon: Bookmark, label: "Saved Items", path: "/profile/saved" },
  { icon: Heart, label: "Favorite Products", path: "/profile/favorites" },
  { icon: Settings, label: "Account Settings", path: "/profile/settings" },
];

const ProfileNav = () => {
  const { deviceType } = useDeviceType();
  return (
    <aside className="overflow-auto space-y-2 flex flex-col sticky items-center top-0 left-0  h-screen z-10 md:max-w-[240px] w-[60px] md:w-full border-r border-r-zinc-100 py-8 md:px-4 text-zinc-900">
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          className="w-fit md:w-full justify-start"
          asChild
        >
          <Link to={item.path} className="">
            <item.icon className="scale-[1.3] md:scale-100  " />
            {["tablet", "cellphone"].includes(deviceType) ? null : (
              <p>{item.label}</p>
            )}
          </Link>
        </Button>
      ))}
      <Tooltip>
        <TooltipTrigger className="w-fit md:w-full">
          <Button
            variant="ghost"
            className=" w-full justify-start text-red-400"
          >
            <LogOut className="scale-[1.3] md:scale-100 " />
            {["tablet", "cellphone"].includes(deviceType) ? null : (
              <p>Logout</p>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </aside>
  );
};

export default ProfileNav;
