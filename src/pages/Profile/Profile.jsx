import { useAuth } from "@/context/AuthProvider";
import UpdateUserForm from "@/forms/UpdateUserForm";
import FavoriteProducts from "@/pages/Profile/components/FavoriteProducts";

import UserInfo from "@/pages/Profile/components/UserInfo";

function Profile() {
  const { user } = useAuth();
  if (user === null) {
    window.location.href = "/register";
    return null;
  }

  return (
    <div>
      <UserInfo />
      <UpdateUserForm />
    </div>
  );
}

export default Profile;
