import { Archive, Heart, LogOut, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/admin/components/ui/Button";
import { useDeviceType } from "@/hooks/useDeviceType";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/Tooltip";
import { useEffect, useState } from "react";
import { cn } from "@/admin/utils/clsx";

const navItems = [
  { icon: Settings, label: "Account Infos", path: "/profile" },
  { icon: Heart, label: "Favorite Products", path: "/profile/favorites" },
  { icon: Archive, label: "Order History", path: "/profile/orders" },
];

const ProfileNav = () => {
  const [activeTab, setActiveTab] = useState(null);
  const { deviceType } = useDeviceType();
  const location = useLocation();
  useEffect(() => {
    navItems.map((item) => {
      if (item.path === location.pathname) {
        setActiveTab(item.path);
      }
    });
  }, []);
  return (
    <aside className="overflow-auto space-y-2 flex flex-col sticky items-center top-0 left-0  h-screen z-10 md:max-w-[240px] w-[60px] md:w-full border-r border-r-zinc-100 py-8 md:px-4 text-zinc-400">
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          className={cn(
            "w-fit md:w-full justify-start",
            activeTab === item.path && "bg-zinc-100 text-zinc-900"
          )}
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
    </aside>
  );
};

export default ProfileNav;
