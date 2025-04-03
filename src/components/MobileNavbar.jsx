import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ProductContext";
import { useContext } from "react";
import DropdownIcon from "../assets/client/icons/DropdownIcon";
import HomeIcon from "../assets/client/icons/HomeIcon";
import CollectionsIcon from "../assets/client/icons/CollectionsIcon";
import AboutUsIcon from "../assets/client/icons/AboutUsIcon";
import ContactUsIcon from "../assets/client/icons/ContactUsIcon";
import ProfileIcon from "../assets/client/icons/ProfileIcon";

export default function MobileNavbar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { LoggedIn } = useContext(ShopContext);
  const links = [
    {
      name: "Home",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Collections",
      path: "/collections/1",
      icon: CollectionsIcon,
    },
    {
      name: "About",
      path: "/about",
      icon: AboutUsIcon,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: ContactUsIcon,
    },
  ];
  return (
    <div
      className={`fixed top-0 h-screen w-full   backdrop:blur-lg  z-10 flex items-center  justify-end  transition-all duration-500 bg-gray-500/50 ${
        isOpen ? "right-0" : "-right-[100%]"
      }`}
    >
      <div className="relative flex flex-col w-[70%] bg-white h-[90%] gap-4 rounded-md">
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className="cursor-pointer flex items-center gap-4 p-3 border-b-2 border-gray-100/50"
        >
          <DropdownIcon className={"rotate-90 w-4 h-4 stroke-[6]"} />
          <p className="cursor-pointer">Back</p>
        </div>
        {links.map((link) => (
          <Link
            key={link.name}
            className={`text-gray-600 pl-6 p-3 flex items-center gap-4 border-l-4 ${
              location.pathname === link.path
                ? "border-gray-900"
                : "border-transparent"
            } transition-all duration-200`}
            onClick={() => {
              setIsOpen(false);
            }}
            to={link.path}
          >
            {<link.icon className={"w-6 h-6"} />}
            <span>{link.name}</span>
          </Link>
        ))}
        <div
          onClick={() => {
            setIsOpen(false);
            LoggedIn ? navigate("/profile") : navigate("/register");
          }}
          className="cursor-pointer text-gray-600 absolute bottom-10 right-10 w-14 flex justify-center items-center shadow-[0_0_40px_rgba(0,0,0,1)] shadow-gray-200  h-14 rounded-full "
        >
          <ProfileIcon className={"w-6 h-6 "} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
