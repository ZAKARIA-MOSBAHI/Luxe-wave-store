import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchLoggingUser } from "../app/api/users";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : null;
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchLoggingUser(setUser);
      if (data) {
        // data is coming with this structure {accessToken : val , user {...}}
        const formattedUserData = {
          name: data.user.name,
          email: data.user.email,
          accessToken: data.accessToken,
          status: data.user.status,
          currencyPreference: data.user.currencyPreference || "USD",
          phone: data.user.phone,
        };
        setUser({ ...data.user, accessToken: data.accessToken });
        localStorage.setItem("user", JSON.stringify(formattedUserData));
        setIsAdmin(data.user.role === "admin");
      }
    };
    getUser();
  }, []);

  const contextValue = useMemo(
    () => ({
      isAdmin,
      user,
      setUser,
    }),
    [isAdmin, user, setUser]
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
