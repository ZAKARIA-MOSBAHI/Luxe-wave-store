import { useContext, useRef, useState } from "react";
import api from "../../api/axios";
import { assets } from "../../assets/client/assets";
import { ShopContext } from "../../context/ProductContext";
import ShowPasswordIcon from "../../assets/client/icons/ShowPasswordIcon";
import HidePasswordIcon from "../../assets/client/icons/HidePasswordIcon";

export default function Login({ setPageType }) {
  const { eye, noEye } = assets;
  const { setLoggedIn } = useContext(ShopContext);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const LoginEmailRef = useRef();
  const LoginPwordRef = useRef();
  const tooglePage = () => {
    setPageType("signup");
    setMessage("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    api
      .post(
        "/login",
        {
          email: LoginEmailRef.current.value,
          password: LoginPwordRef.current.value,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setLoggedIn(true);
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
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
          <p className="text-sm sm:text-base w-full text-red-500">{message}</p>
        </div>
        <button className="px-8 py-2.5 bg-black w-full sm:w-1/2 md:w-1/4 text-white my-4">
          LOG IN
        </button>
      </form>
    </div>
  );
}
