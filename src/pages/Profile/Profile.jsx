import { useAuth } from "@/context/AuthProvider";
import UpdateUserForm from "@/forms/UpdateUserForm";

import UserInfo from "@/pages/Profile/components/UserInfo";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (user === null) {
    navigate("/login", { replace: true });
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
