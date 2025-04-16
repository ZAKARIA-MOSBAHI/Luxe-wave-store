import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/client/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../../context/ProductContext";
import SearchIcon from "../../assets/client/icons/SearchIcon";
import ProfileIcon from "../../assets/client/icons/ProfileIcon";
import MenuIcon from "../../assets/client/icons/MenuIcon";
import CartIcon from "../../assets/client/icons/CartIcon";
import Headroom from "react-headroom";
import MobileNavbar from "../MobileNavbar";
import { useSelector } from "react-redux";
function Navbar() {
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
            <SearchIcon
              className={"cursor-pointer"}
              onClick={() => setShowSearch(true)}
            />
            <div className="group relative hidden md:block">
              <ProfileIcon onClick={redirectTo} className={"cursor-pointer"} />
            </div>
            <Link to="/cart" className="relative  cursor-pointer">
              <CartIcon />
              <p
                className={`${
                  cart.items.length === 0 ? "hidden" : ""
                } absolute right-[-5px] bottom-[-5px] rounded-full w-4 text-center leading-4 bg-red-500  text-white aspect-square  text-[8px]`}
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
