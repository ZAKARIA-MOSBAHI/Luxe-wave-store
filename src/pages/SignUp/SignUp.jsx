import { useRef, useState } from "react";
import api from "../../api/axios";
import { assets } from "../../assets/client/assets";
function SignUp({ setPageType }) {
  const { eye, noEye } = assets;
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tooglePage = () => {
    setPageType("login");
    setMessage("");
  };

  const SignupEmailRef = useRef();
  const SignupPwordRef = useRef();
  const RepeatPwordRef = useRef();
  const handleSignup = (e) => {
    e.preventDefault();
    api
      .post(
        "/signup",
        {
          email: SignupEmailRef.current.value,
          password: SignupPwordRef.current.value,
          confirmPassword: RepeatPwordRef.current.value,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center p-8 bg-white">
      <div className="flex items-center gap-4 w-full pt-8 pb-4 justify-center text-center text-2xl md:text-3xl mb-3">
        <p className="w-8 lg:w-11 h-[2px] bg-black"></p>
        <h1 className="font-bold tracking-tighter">SIGN UP</h1>
        <p className="w-8 lg:w-11 h-[2px] bg-black"></p>
      </div>
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <div className=" w-full sm:w-[75%] md:w-1/2">
          <p className="text-base font-medium mb-2">EMAIL</p>
          <input
            ref={SignupEmailRef}
            type="text"
            className="p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
            placeholder="Your Email"
            required
          />
        </div>
        <div className=" w-full sm:w-[75%] md:w-1/2">
          <p className="text-base font-medium mb-2">PASSWORD</p>
          <div className="relative">
            <input
              ref={SignupPwordRef}
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
              <img
                className="w-7 h-full"
                src={showPassword ? noEye : eye}
                alt=""
              />
            </div>
          </div>
          <div className="relative">
            <input
              ref={RepeatPwordRef}
              type={showConfirmPassword ? "text" : "password"}
              className=" my-2 p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
              placeholder="Repeat Your Password"
              required
            />
            <div
              className="absolute right-4 top-1/2  translate-y-[-50%] cursor-pointer"
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
                <img
                  className="w-7 h-full"
                  src={showConfirmPassword ? noEye : eye}
                  alt=""
                />;
              }}
            >
              <img
                className="w-7 h-full"
                src={showConfirmPassword ? noEye : eye}
                alt=""
              />
            </div>
          </div>
          <p className="text-sm sm:text-base my-1 text-right">
            Already have an account ?{" "}
            <span
              onClick={tooglePage}
              className=" underline cursor-pointer transition-all duration-300 hover:text-gray-400"
            >
              Log in
            </span>
          </p>
          <p className="text-sm sm:text-base w-full text-red-500">{message}</p>
        </div>
        <button className="px-8 py-2.5 bg-black w-full sm:w-1/2 md:w-1/4 text-white my-4">
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default SignUp;
