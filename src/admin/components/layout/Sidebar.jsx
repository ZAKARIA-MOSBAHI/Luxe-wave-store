import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/utils";
import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";
import { ScrollArea } from "../ui/ScrollArea";
import { useIsMobile } from "../../hooks/useIsMobile";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  List,
  FolderTree,
  Menu,
  X,
  LogOut,
  Store,
} from "lucide-react";
import { AdminAssets } from "../../assets/AdminAssets";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: List,
  },
  {
    title: "Cart",
    href: "/admin/carts",
    icon: ShoppingCart,
  },
];

export function Sidebar() {
  const { logoWhite } = AdminAssets;
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-4 left-4 z-50 md:hidden",
          isOpen ? "text-white" : ""
        )}
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-sidebar  bg-black z-50 transition-all duration-300 ease-in-out",
          isOpen || !isMobile ? "translate-x-0" : "-translate-x-full",
          isMobile ? "w-64" : "w-64 md:w-72"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center space-x-2">
              <img
                src={logoWhite}
                alt="store logo"
                loading="lazy"
                className="w-36  "
              />
            </div>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground"
                onClick={toggleSidebar}
              >
                <X size={18} />
              </Button>
            )}
          </div>

          <Separator className="bg-gray-50/20" />

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={isMobile ? toggleSidebar : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                    location.pathname === item.href
                      ? "bg-gray-100/50 text-white"
                      : "text-white hover:bg-gray-100/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </ScrollArea>

          <Separator className="bg-gray-50/20" />

          {/* Footer */}
          <div className="px-4 py-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-white cursor-pointer
             hover:bg-gray-100/50 "
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
