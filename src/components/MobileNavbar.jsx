import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
 import { NavLinks } from "@/constants/NavLinks";

 const delays = [
  "delay-0",
  "delay-75",
  "delay-150",
  "delay-200",
  "delay-300",
];

 /*ADD : Logout btn | NavbarFooter*/
export default function MobileNavbar({ isOpen, setIsOpen }) {
  const location = useLocation();
   const { user } = useAuth();
  
  return (  
      <div className={`absolute top-full left-0 w-full bg-black z-[49]
  flex flex-col gap-4 overflow-hidden 
  transition-all duration-500 ease-in-out
  ${isOpen ? "max-h-[400px]" : "max-h-0"}
  `}>
         
        {NavLinks.map((link, index) => (
  <Link
    key={link.name}
    className={`
      font-medium pl-6 p-3 flex items-center justify-center gap-4
      transition-all duration-300 ease-out
      ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
      ${delays[index] || "delay-300"}
      ${
        location.pathname === link.path
          ? "bg-white text-black"
          : "text-white"
      }
    `}
    onClick={() => setIsOpen(false)}
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
            to={"/account"}
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

 