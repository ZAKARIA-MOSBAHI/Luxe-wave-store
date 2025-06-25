import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchLoggingUser } from "../app/api/users";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : null;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [userFetched, setUserFetched] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchLoggingUser();
      if (data) {
        const formattedUserData = {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          accessToken: data.accessToken,
          status: data.user.status,
          currencyPreference: data.user.currencyPreference || "USD",
          phone: data.user.phone,
        };
        setUser(formattedUserData);
        console.log("User data formatted :", formattedUserData);
        localStorage.setItem("user", JSON.stringify(formattedUserData));
        setIsAdmin(data.user.role === "admin");
      }
      setUserFetched(true);
    };

    if (!userFetched) getUser();
  }, [userFetched]);

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
