import { Avatar, AvatarFallback } from "@/components/ui/Avatar";

const UserInfo = () => {
  const user = {
    name: "Sarah Anderson",
    email: "sarah.anderson@example.com",
  };

  return (
    <div className="flex items-start space-x-4 py-8">
      <Avatar className="h-20 w-20">
        <AvatarFallback className="bg-gray-100 text-lg">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-zinc-900">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
