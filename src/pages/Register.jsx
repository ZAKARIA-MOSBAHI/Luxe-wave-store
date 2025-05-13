import { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

function Register() {
  const [PageType, setPageType] = useState("login");
  const { user, isLoading } = useAuth();
  if (isLoading) {
    console.log("loading .... ");
    return null;
  }
  if (user) {
    console.log("user available ");
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div className="w-full">
      {PageType === "login" && <Login setPageType={setPageType} />}
      {PageType === "signup" && <SignUp setPageType={setPageType} />}
    </div>
  );
}

export default Register;
