import Navbar from "../ui/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main className="flex-1 w-full ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
