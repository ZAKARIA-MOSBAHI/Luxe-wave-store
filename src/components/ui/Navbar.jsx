import { json, Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/client/assets";
import { useContext, useMemo, useState } from "react";
import { ShopContext } from "../../context/ProductContext";
import SearchIcon from "../../assets/client/icons/SearchIcon";
import ProfileIcon from "../../assets/client/icons/ProfileIcon";
import MenuIcon from "../../assets/client/icons/MenuIcon";
import CartIcon from "../../assets/client/icons/CartIcon";
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
import { Button } from "../../admin/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../admin/components/ui/DropdownMenu";
import { useAuth } from "../../context/AuthProvider";
function Navbar() {
  const { isAdmin, isLoading } = useAuth();
  const { logo } = assets;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);
  const { setShowSearch, cart } = useContext(ShopContext);
  const redirectTo = () => {
    if (data !== null) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  return (
    <Headroom>
      {/* THE HEADER START HERE  */}
      <div className="flex items-center h-[80px] border-b bg-white">
        <div
          className={`max-w-[1052px]  px-4  w-full mx-auto  flex items-center justify-between font-medium `}
        >
          <Link to={"/"}>
            <img src={logo} className="w-36 cursor-pointer" alt="" />
          </Link>
          <ul className="hidden md:flex items-center gap-5 text-gray-700 text-sm">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/collections/1">COLLECTIONS</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
          </ul>
          <div className="flex items-center gap-6">
            <Search
              size={28}
              onClick={() => setShowSearch(true)}
              className="cursor-pointer"
            />

            <div className="group relative hidden md:block">
              {localStorage.getItem("user") ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <UserRound size={28} className="cursor-pointer" />
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
                    {isLoading ? null : isAdmin ? (
                      <DropdownMenuItem
                        onClick={() => navigate("/admin/dashboard")}
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />

                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <UserRound
                  size={28}
                  onClick={() => navigate("/register")}
                  className="cursor-pointer"
                />
              )}
            </div>
            <Link to="/cart" className="relative  cursor-pointer">
              <ShoppingCart size={28} />

              <p
                className={`${
                  cart.items.length === 0 ? "hidden" : ""
                } absolute right-[-5px] top-[-5px] rounded-full w-4 text-center leading-4 bg-red-500  text-white aspect-square  text-[8px]`}
              >
                {cart.items.length}
              </p>
            </Link>
            {/* className="w-5 cursor-pointer sm:hidden" */}
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
