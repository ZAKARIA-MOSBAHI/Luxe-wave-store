import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getLoggingUser } from "../app/api/users";
import { useQuery } from "react-query";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Store user in state to react to localStorage changes
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isAdmin, setIsAdmin] = useState(false);

  const { isLoading, data } = useQuery(["loggingUserData"], getLoggingUser);

  useEffect(() => {
    if (data?.user) {
      const user = data.user;
      setUser(user); // Update user state if needed
      setIsAdmin(user.role === "admin");
    }
  }, [data]);

  useEffect(() => {
    // This will now properly log when `isAdmin` changes
    console.log("isAdmin", isAdmin);
  }, [isAdmin]);

  // Optional: Listen for localStorage changes (e.g., if another tab logs in/out)
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem("user"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
