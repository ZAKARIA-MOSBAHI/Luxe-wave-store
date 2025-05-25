import ProfileAvatar from "@/components/ProfileAvatar";
import { useAuth } from "@/context/AuthProvider";

const UserInfo = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-start space-x-4 py-8">
      <ProfileAvatar className={"h-20 w-20 text-2xl"} />
      <div>
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-zinc-900">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
