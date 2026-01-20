import Navbar from "./Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import NewsLetter from "./NewsLetter";
import WhyUs from "./WhyUs";

export default function Layout({ isMobileNavOpen, setIsMobileNavOpen }) {
  return (
    <div className="mt-[80px] relative">
      <Navbar
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />

      <main className="flex-1 w-full ">
        <Outlet />
      </main>
      <WhyUs />
      <NewsLetter />
      <Footer />
    </div>
  );
}
