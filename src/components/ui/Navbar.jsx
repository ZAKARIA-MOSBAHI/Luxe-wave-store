import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/client/assets";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ProductContext";

import MenuIcon from "../../assets/client/icons/MenuIcon";

import Headroom from "react-headroom";
import MobileNavbar from "../MobileNavbar";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../admin/components/ui/DropdownMenu";
import { useAuth } from "../../context/AuthProvider";
import { Avatar, AvatarFallback } from "./Avatar";
import { Logout } from "@/lib/utils";
import SearchInput from "./SearchInput";
function Navbar() {
  const { logo } = assets;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { showSearch, setShowSearch, cart } = useContext(ShopContext);
  const { isAdmin, user } = useAuth();
  const redirectTo = () => {
    if (user !== null) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  return (
    // can't apply bg color which cause the logo to be transparent
    <Headroom className="z-10 relative">
      {/* THE HEADER START HERE  */}
      <div className="flex items-center bg-white text-sm h-[70px] border-b border-gray-200">
        <div
          className={`max-w-[1152px]  px-4  w-full mx-auto  flex items-center justify-between font-medium `}
        >
          <div className="flex gap-4">
            <Link to={"/"}>
              <img src={logo} className="w-36 cursor-pointer" alt="" />
            </Link>
            <ul className="hidden md:flex items-center  gap-6 text-gray-900 text-sm px-4 border-l border-gray-200">
              <NavLink to="/">HOME</NavLink>
              <NavLink to="/collections/1">COLLECTIONS</NavLink>
              <NavLink to="/about">ABOUT</NavLink>
              <NavLink to="/contact">CONTACT</NavLink>
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <SearchInput
              setShowSearch={setShowSearch}
              showSearch={showSearch}
            />

            <div className="group relative hidden md:block">
              {user && Object.keys(user).length > 0 ? (
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
                      <UserRound className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem
                        onClick={() => navigate("/admin/dashboard")}
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />

                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        Logout();
                      }}
                      className="text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <UserRound
                  size={24}
                  onClick={() => navigate("/register")}
                  className="cursor-pointer"
                />
              )}
            </div>
            <Link to="/cart" className="relative  cursor-pointer">
              <ShoppingCart size={24} strokeWidth={2} />

              <p
                className={`${
                  cart.items.length === 0 ? "hidden" : ""
                } absolute right-[-5px] top-[-5px] rounded-full w-4 text-center leading-4 bg-red-500  text-white aspect-square  text-[8px]`}
              >
                {cart.items.length}
              </p>
            </Link>

            <MenuIcon
              onClick={() => setIsOpen(true)}
              className={"md:hidden cursor-pointer"}
            />
          </div>
          {/* side bar for smaller screens  */}
          <MobileNavbar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            redirectTo={redirectTo}
          />
        </div>
      </div>
    </Headroom>
  );
}

export default Navbar;
