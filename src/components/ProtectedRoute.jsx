import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAdmin) {
        navigate("/register", { replace: true });
      }
    }
  }, [navigate, isAdmin, isLoading]);

  if (!isAdmin) return null;
  /*  we used isAdmin and not isloading because even if 
   the user is not an admin when loading ends the page shows up 
  a little before directing to the register page */
  return children;
}
