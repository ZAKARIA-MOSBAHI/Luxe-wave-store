import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/client/assets";
import { useContext, useEffect, useState } from "react"; 
import {
  LayoutDashboard,
  LogOut,
   Menu,
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
} from "@/components/ui/DropdownMenu";
import { useAuth } from "../../context/AuthProvider";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import { Logout } from "@/lib/utils";
import SearchInput from "../ui/SearchInput";
import SearchResults from "../ui/SearchResults";
import useDebounce from "@/hooks/useDebounce";
 import { useSelector } from "react-redux";
import { NavLinks } from "@/constants/NavLinks";
import { useSearch } from "@/context/SearchContext";
import MobileNavbar from "../MobileNavbar";

function Navbar({isMobileNavOpen, setIsMobileNavOpen}) {
  const { logo } = assets;
  const [hideLogo , setHideLogo] = useState(false);
  const cartState = useSelector((state) => state.cart.data);
   const navigate = useNavigate();
  const { showSearch, searchQuery, searchProduct, setSearchResults } =useSearch()
  const debouncedSearchQuery = useDebounce(searchQuery);
  const { user } = useAuth();

  
  useEffect(() => {
    setSearchResults([]);
    if (debouncedSearchQuery.length === 0) {
      console.log("search query is empty do nothing");
      return;
    } else {
      console.log("time has ended , making the api call ");
      searchProduct(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);
useEffect(() => {
  if (showSearch) {
    const isSmallScreen = window.innerWidth < 900;
    setHideLogo(isSmallScreen);
  } else {
    setHideLogo(false);
  }
}, [showSearch]);


  return (
        <nav  className="fixed top-0 left-0 w-full z-50 flex items-center bg-white text-sm h-[70px] border-b border-gray-200">
        <div
          className={`max-w-[1152px]  px-4  w-full mx-auto  flex items-center justify-between font-medium `}
        >
          <div className="flex gap-4">
            {hideLogo ? null : <Link to={"/"}>
              <img src={logo} className="w-36 cursor-pointer" alt="" />
            </Link> }
            <ul className="hidden md:flex items-center  gap-6 text-gray-900 text-sm px-4 border-l border-gray-200">
              {
                NavLinks.map((link)=>(
                  <NavLink key={link.name} to={link.path}>{link.name.toUpperCase()}</NavLink>

                ))
              }
              
            </ul>
          </div>

          <div className="flex relative h-[70px] items-center gap-6">
            <SearchInput />

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
                    <DropdownMenuItem onClick={() => navigate("/account")}>
                      <UserRound className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>

                    {user.role === "admin" && (
                      <DropdownMenuItem
                        onClick={() => navigate("/admin/products")}
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
                  onClick={() => navigate("/login")}
                  className="cursor-pointer"
                />
              )}
            </div>
            <Link to="/cart" className="relative  cursor-pointer">
              <ShoppingCart size={24} strokeWidth={2} />

              <p
                className={`${
                  cartState?.items && cartState?.items?.length > 0
                    ? ""
                    : "hidden"
                } absolute right-[-5px] top-[-5px] rounded-full w-4 text-center leading-4 bg-red-500  text-white aspect-square  text-[8px]`}
              >
                {cartState?.items?.length}
              </p>
            </Link>

            <Menu
              onClick={() => setIsMobileNavOpen(prev => !prev )}
              className={"md:hidden cursor-pointer"}
            />
          </div>
          
        </div>

        {showSearch && searchQuery.trim().length > 0 && <SearchResults />}
        <MobileNavbar isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen}/>
      </nav>
  
    );
}

export default Navbar;
