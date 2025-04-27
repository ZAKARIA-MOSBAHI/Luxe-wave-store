import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const ErrorPage = ({
  statusCode = 500,
  message = "Something went wrong!",
  redirectLink = "/",
}) => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      `${statusCode} Error: User attempted to access ${location.pathname}`
    );
  }, [location.pathname, statusCode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">{statusCode}</h1>
        <p className="text-2xl text-gray-700 mb-6">{message}</p>
        <Link
          to={redirectLink}
          className="text-blue-500 hover:text-blue-700 underline text-lg"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
