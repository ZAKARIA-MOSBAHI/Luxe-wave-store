import { ScrollArea } from "@/admin/components/ui/ScrollArea";
import { useAuth } from "@/context/AuthProvider";
import FavoriteProducts from "@/pages/Profile/components/FavoriteProducts";

import ProfileNav from "@/pages/Profile/components/ProfileNav";
import UserInfo from "@/pages/Profile/components/UserInfo";

function Profile() {
  const { user } = useAuth();
  if (user === null) {
    window.location.href = "/register";
    return null;
  }

  return (
    <div className="h-screen flex gap-4 md:gap-8 border-t border-zinc-100 ">
      <ProfileNav />

      {/* scroll area appearing in the bottom */}
      <ScrollArea className="h-full">
        <div className="px-4 space-y-8">
          <UserInfo />
          <FavoriteProducts />
        </div>
      </ScrollArea>
    </div>
  );
}

export default Profile;
