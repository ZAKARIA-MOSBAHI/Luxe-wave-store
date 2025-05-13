import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/Avatar";

const UserInfo = () => {
  const user = {
    name: "Sarah Anderson",
    email: "sarah.anderson@example.com",
    avatar:
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=300&h=300&fit=crop",
  };

  return (
    <div className="flex items-start space-x-4 py-8">
      <Avatar className="h-20 w-20">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-zinc-900">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
