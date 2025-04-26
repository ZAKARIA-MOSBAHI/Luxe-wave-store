import { useEffect, useRef, useState } from "react";

import ShowPasswordIcon from "../../assets/client/icons/ShowPasswordIcon";
import HidePasswordIcon from "../../assets/client/icons/HidePasswordIcon";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { loginUser } from "../../app/thunks/userThunks";
import { resetRequestResults } from "../../app/slices/userSlice";

export default function Login({ setPageType }) {
  const { status, data, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const LoginEmailRef = useRef();
  const LoginPwordRef = useRef();
  const tooglePage = () => {
    setPageType("signup");
    dispatch(resetRequestResults());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(resetRequestResults());
    const formData = {
      email: LoginEmailRef.current.value,
      password: LoginPwordRef.current.value,
    };

    dispatch(loginUser(formData));
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 ">
      <div className="flex items-center gap-4 w-full pt-8 pb-4 justify-center text-center text-2xl md:text-3xl mb-3">
        <p className="w-8 lg:w-11 h-[2px] bg-black"></p>
        <h1 className="prata-regular font-medium">LOG IN</h1>
        <p className="w-8 lg:w-11 h-[2px] bg-black"></p>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <div className=" w-full sm:w-[75%] md:w-1/2">
          <p className="text-base font-medium mb-2">EMAIL</p>
          <input
            type="text"
            className="p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
            placeholder="Your Email"
            required
            ref={LoginEmailRef}
          />
        </div>
        <div className=" w-full sm:w-[75%] md:w-1/2">
          <p className="text-base font-medium mb-2">PASSWORD</p>
          <div className="relative">
            <input
              ref={LoginPwordRef}
              type={showPassword ? "text" : "password"}
              className="p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
              placeholder="Your Password"
              required
            />
            <div
              className="absolute right-4 top-1/2  translate-y-[-50%] cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
            </div>
          </div>
          <p className="text-sm sm:text-base my-1 text-right">
            don't have an account ?{" "}
            <span
              onClick={tooglePage}
              className=" underline cursor-pointer transition-all duration-300 hover:text-gray-400"
            >
              Sign up
            </span>
          </p>

          {error?.field === "LoginFailedError" && (
            <p className="text-sm sm:text-base w-full text-red-500">
              {error?.message}
            </p>
          )}
          {status === "success" ? (
            <p className="text-sm sm:text-base w-full text-green-500">
              User Logged in successfully
            </p>
          ) : null}
        </div>
        <button
          disabled={status === "loading"}
          onClick={handleLogin}
          className=" cursor-pointer px-8 py-2.5 bg-black w-full sm:w-1/2 md:w-1/4 flex justify-center text-white my-4"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin" />
              <span className="ml-2">LOGGING...</span>
            </>
          ) : (
            "LOG IN"
          )}
        </button>
      </form>
    </div>
  );
}
