import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getLoggingUser } from "../app/api/users";
import { useQuery, useQueryClient } from "react-query";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { isLoading, data } = useQuery(["loggingUserData"], getLoggingUser);

  useEffect(() => {
    if (data?.user) {
      const user = data.user;
      setUser({
        name: user.name,
        email: user.email,
        id: user._id,
      });
      setIsAdmin(user.role === "admin");
    }
  }, [data]);
  useEffect(() => {
    // this doesn't re-run after loggin in
    // so it doesn't cause re-render
    // and the application doesn't show admin components
    console.log("isAdmin");
    console.log(isAdmin);
  }, [isAdmin]);

  const contextValue = useMemo(
    () => ({
      isAdmin,
      isLoading,
      user,
    }),
    [isAdmin, isLoading, user]
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
