 import ProfileNav from "@/pages/Profile/components/ProfileNav";
import { Outlet } from "react-router-dom";

export default function ProfilePageLayout() {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-10  ">
      <ProfileNav />

      {/* scroll area appearing in the bottom */}
         <section className="h-full w-full col-span-12 md:col-span-9">
          <Outlet />
        </section>
     </section>
  );
}
