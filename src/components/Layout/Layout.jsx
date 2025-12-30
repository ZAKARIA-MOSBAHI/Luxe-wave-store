import Navbar from "./Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="mt-[80px]">
      <Navbar />

      <main className="flex-1 w-full ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
