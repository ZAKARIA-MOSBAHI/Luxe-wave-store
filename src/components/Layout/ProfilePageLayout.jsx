import ProfileNav from "@/pages/Profile/components/ProfileNav";
import { Outlet } from "react-router-dom";

export default function ProfilePageLayout() {
  return (
    <div className="grid grid-cols-12 gap-4  ">
      <ProfileNav />

      {/* scroll area appearing in the bottom */}
      <div className="h-full w-full col-span-12 md:col-span-9">
        <Outlet />
      </div>
    </div>
  );
}
