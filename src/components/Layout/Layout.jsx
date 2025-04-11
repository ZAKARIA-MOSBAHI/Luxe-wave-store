import Navbar from "../ui/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-[1152px] w-full mx-auto px-4 md:px-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
