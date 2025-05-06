import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getLoggingUser } from "../app/api/users";
import { useQuery } from "react-query";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isLoading, data, isError, error } = useQuery(
    "loggingUserData",
    getLoggingUser
  );

  useEffect(() => {
    if (isLoading) {
      console.log("loading.....");
    } else {
      if (data?.user) {
        console.log("useeffect the data is : ", data); // this is null
        const user = data.user;
        setUser({
          name: user.name,
          email: user.email,
          id: user._id,
        });
        setUser(user);
        if (user.role === "admin") {
          console.log("user is admin");
          setIsAdmin(true);
        }
      }
    }
  }, [isLoading]);

  const contextValue = useMemo(
    () => ({
      isAdmin,
      isLoading,
      user: data?.user || null,
    }),
    [isAdmin, isLoading, data]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default AuthProvider;
