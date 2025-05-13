import { useAuth } from "../../context/AuthProvider";
import FavoriteProducts from "./components/favoriteProducts";
import ProfileNav from "./components/ProfileNav";
import UserInfo from "./components/UserInfo";

function Profile() {
  const { user } = useAuth();
  if (user === null) {
    window.location.href = "/register";
    return null;
  }

  return (
    <div className="border-t-2 border-zinc-100 ">
      <ProfileNav />
      <div className="space-y-8 w-full md:ml-[254px] ml-[64px]">
        <UserInfo />
        <FavoriteProducts />
      </div>
    </div>
  );
}

export default Profile;
