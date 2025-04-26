import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getLoggingUser } from "../app/api/users";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ADD THIS

  const contextValue = useMemo(
    () => ({
      isAdmin,
      isLoading, // ADD THIS
    }),
    [isAdmin, isLoading]
  );

  useEffect(() => {
    getLoggingUser()
      .then((data) => {
        const { role } = data.user;
        if (role === "admin") {
          setIsAdmin(true);
        }
      })
      .finally(() => {
        setIsLoading(false); // SET loading to false when finished
      });
  }, []);

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
