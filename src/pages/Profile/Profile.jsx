import { useAuth } from "@/context/AuthProvider";
import UpdateUserForm from "@/forms/UpdateUserForm";
import FavoriteProducts from "@/pages/Profile/components/FavoriteProducts";

import UserInfo from "@/pages/Profile/components/UserInfo";

function Profile() {
  const { user } = useAuth();
  if (user === null) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="w-full">
      <UserInfo />
      <UpdateUserForm />
    </div>
  );
}

export default Profile;
