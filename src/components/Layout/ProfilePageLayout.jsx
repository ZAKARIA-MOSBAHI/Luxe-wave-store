import { ScrollArea } from "@/admin/components/ui/ScrollArea";
import ProfileNav from "@/pages/Profile/components/ProfileNav";
import { Outlet } from "react-router-dom";

export default function ProfilePageLayout() {
  return (
    <div className="h-screen flex gap-4 md:gap-8 border-t border-zinc-100 ">
      <ProfileNav />

      {/* scroll area appearing in the bottom */}
      <ScrollArea className="h-full w-full">
        <div className="px-4 ">
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  );
}
