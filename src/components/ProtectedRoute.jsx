import { useAuth } from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // to avoid rendering the component before loading is finished
  }
  /*  we used isAdmin and not isloading because even if 
   the user is not an admin when loading ends the page shows up 
  a little before directing to the register page */
  if (!isLoading) {
    if (user.role !== "admin")
      return (
        <ErrorPage
          statusCode={403}
          message="You are not authorized to access this page."
          redirectLink="/"
        />
      );
  }
  return children;
}
