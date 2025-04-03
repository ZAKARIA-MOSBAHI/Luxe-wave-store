import { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

function Register() {
  const [PageType, setPageType] = useState("login");

  return (
    <div className="w-full">
      {PageType === "login" && <Login setPageType={setPageType} />}
      {PageType === "signup" && <SignUp setPageType={setPageType} />}
    </div>
  );
}

export default Register;
