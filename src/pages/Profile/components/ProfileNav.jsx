import { Link, useLocation } from "react-router-dom";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const navItems = [
  { label: "Details", path: "/account" },
  { label: "Favorites", path: "/account/favorites" },
  { label: "Orders", path: "/account/order-history" },
];

const ProfileNav = () => {
  const location = useLocation();

  return (
    <aside className="col-span-12 md:col-span-3 bg-gray-200">
      <Tabs defaultValue="message" className="h-full">
        <TabsList className=" md:flex-col justify-start h-full w-full bg-transparent ">
          {navItems.map((item) => (
            <TabsTrigger
              data-state={
                location.pathname === item.path ? "active" : "inactive"
              }
              className="p-0 md:w-full md:text-base 
              data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none"
              value={item.label}
              key={item.label}
            >
              <Link
                className="w-full h-full py-2 mx-4 text-start"
                to={item.path}
              >
                {item.label}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </aside>
  );
};

export default ProfileNav;
