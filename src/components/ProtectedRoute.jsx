import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  // to prevent the component from showing up little bit before the redirect
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isAdmin || user === null) {
      return navigate("/register", { replace: true });
    } else {
      setIsCheckingAuth(false);
    }
  }, [navigate, user, isAdmin]);
  if (isCheckingAuth) return null;
  return children;
}
