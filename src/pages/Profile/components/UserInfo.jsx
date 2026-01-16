import ProfileAvatar from "@/components/ProfileAvatar";
import { useAuth } from "@/context/AuthProvider";

const UserInfo = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-start space-x-4 py-8">
       
    </div>
  );
};

export default UserInfo;
