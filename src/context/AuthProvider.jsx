import { createContext, useContext, useMemo } from "react";
import { useSelector } from "react-redux";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { data, loading, error } = useSelector((state) => state.user);

  // Valeur dérivée pour vérifier l'authentification
  const isAdmin = Boolean(data?.role === "admin");

  // Protection contre les re-renders inutiles
  const contextValue = useMemo(
    () => ({
      data,
      isAdmin,
      loading,
      error,
    }),
    [data, isAdmin, loading, error]
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
