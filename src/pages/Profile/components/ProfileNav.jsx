import { Archive, Bookmark, Heart, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../admin/components/ui/Button";
import { useDeviceType } from "../../../hooks/useDeviceType";

const navItems = [
  { icon: Archive, label: "Order History", path: "/profile/orders" },
  { icon: Bookmark, label: "Saved Items", path: "/profile/saved" },
  { icon: Heart, label: "Favorite Products", path: "/profile/favorites" },
  { icon: Settings, label: "Account Settings", path: "/profile/settings" },
];

const ProfileNav = () => {
  const { deviceType } = useDeviceType();
  return (
    <nav className="space-y-2 flex flex-col items-center fixed top-0 left-0 mt-[70px] h-screen z-10 md:max-w-[240px] w-[60px] md:w-full border-r-2 border-r-zinc-100 py-8 md:px-4 text-zinc-900">
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
      <Button
        variant="ghost"
        className="w-fit md:w-full justify-start text-red-400"
      >
        <LogOut className="scale-[1.3] md:scale-100 " />
        {["tablet", "cellphone"].includes(deviceType) ? null : <p>Logout</p>}
      </Button>
    </nav>
  );
};

export default ProfileNav;
