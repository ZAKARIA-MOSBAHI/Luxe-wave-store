import { Link, useLocation, useNavigate } from "react-router-dom";
 import HomeIcon from "../assets/client/icons/HomeIcon";
import CollectionsIcon from "../assets/client/icons/CollectionsIcon";
import AboutUsIcon from "../assets/client/icons/AboutUsIcon";
import ContactUsIcon from "../assets/client/icons/ContactUsIcon";
import ProfileIcon from "../assets/client/icons/ProfileIcon";
import { useAuth } from "@/context/AuthProvider";
import { redirectTo } from "@/lib/utils";
import { NavLinks } from "@/constants/NavLinks";

export default function MobileNavbar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (  
      <div className={`${isOpen ? 'top-[70px]' : "-top-[50%]"} w-full  py-4
      absolute  left-0 flex flex-col w-[70%] bg-[#f4f4f4]  z-[49] gap-4 transition-all duration-300`}>
         
        {NavLinks.map((link) => (
          <Link
            key={link.name}
            className={`font-medium pl-6 p-3 flex items-center justify-center gap-4   ${
              location.pathname === link.path
                ? "bg-black text-white"
                : "text-black "
            } transition-all duration-200`}
            onClick={() => {
              setIsOpen(false);
            }}
            to={link.path}
          >
             <span>{link.name.toUpperCase()}</span>
          </Link>
        ))}
        <div
          onClick={() => {
            setIsOpen(false);
            redirectTo(user , navigate)
          }}
          className="cursor-pointer text-gray-600 absolute bottom-10 right-10 w-14 flex justify-center items-center shadow-[0_0_40px_rgba(0,0,0,1)] shadow-gray-200  h-14 rounded-full "
        >
          <ProfileIcon className={"w-6 h-6 "} strokeWidth={2} />
        </div>
      </div>

);
}

/*<nav
 className={`fixed top-0 h-screen w-full   backdrop:blur-lg  z-10 flex items-center  justify-end  transition-all duration-500 bg-gray-500/50 ${
   isOpen ? "top-0" : "-top-[100%]"
 }`}
>
</nav>*/