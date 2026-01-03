import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
 import { NavLinks } from "@/constants/NavLinks";

 /*ADD : Logout btn | NavbarFooter*/
export default function MobileNavbar({ isOpen, setIsOpen }) {
  const location = useLocation();
   const { user } = useAuth();
  
  return (  
      <div className={`${isOpen ? 'top-[70px]' : "-top-[100%]"} w-full  py-4
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

        {user  ? (
            <Link
            key={"profile"}
            className={`font-medium pl-6 p-3 flex text-red-500 items-center justify-center gap-4 transition-all duration-200`}
            onClick={() => {
              setIsOpen(false);
            }}
            to={"/profile"}
          >
             <span>{"profile".toUpperCase()}</span>
          </Link>
        ): (
           <>
           <Link
            key={"login"}
            className={`font-medium pl-6 p-3 flex text-red-500 items-center justify-center gap-4 transition-all duration-200`}
            onClick={() => {
              setIsOpen(false);
            }}
            to={"/login"}
          >
             <span>{"login".toUpperCase()}</span>
          </Link>
           <Link
            key={"signup"}
            className={`font-medium pl-6 p-3 flex text-red-500 items-center justify-center gap-4 transition-all duration-200`}
            onClick={() => {
              setIsOpen(false);
            }}
            to={"/signup"}
          >
             <span>{"signup".toUpperCase()}</span>
          </Link>
           </>
          
        )}
          
      </div>

);
}

/*<nav
 className={`fixed top-0 h-screen w-full   backdrop:blur-lg  z-10 flex items-center  justify-end  transition-all duration-500 bg-gray-500/50 ${
   isOpen ? "top-0" : "-top-[100%]"
 }`}
>
</nav>*/