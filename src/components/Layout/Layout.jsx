import Navbar from "./Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
 
export default function Layout({  setIsMobileNavOpen}) {
  return (
    <div className="mt-[80px] relative">
      <Navbar   setIsMobileNavOpen={setIsMobileNavOpen} />
      

      <main className="flex-1 w-full ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
