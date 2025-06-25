import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ShowPasswordIcon from "@/assets/client/icons/ShowPasswordIcon";
import HidePasswordIcon from "@/assets/client/icons/HidePasswordIcon";
import { signupSchema } from "@/lib/schemas/signup.schema";
import { signup } from "@/app/api/users";

export default function SignUpForm({ togglePage }) {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const name = data.email.split("@")[0];
      const formattedData = {
        name,
        ...data,
      };
      setLoading(true);
      const response = await signup(formattedData);

      console.log("Signup response:", response);
      if (response.response.data.success) {
        setMessage("Signup successful");
      } else {
        setMessage(
          response.response?.data.message ||
            "An error occurred during signup. Please try again later."
        );
      }
      setLoading(false);
    } catch (error) {
      setMessage(
        error.message ||
          "An error occurred during signup. Please try again later."
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(message);
  }, [message]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full justify-center items-center"
    >
      <div className="w-full sm:w-[75%] md:w-1/2">
        <p className="text-base font-medium mb-2">EMAIL</p>
        <input
          {...register("email")}
          type="text"
          className="p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
          placeholder="Your Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full sm:w-[75%] md:w-1/2">
        <p className="text-base font-medium mb-2">PASSWORD</p>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className="p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
            placeholder="Your Password"
          />
          <div
            className="absolute right-4 top-1/2 translate-y-[-50%] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <div className="relative mt-2">
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            className="p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
            placeholder="Repeat Your Password"
          />
          <div
            className="absolute right-4 top-1/2 translate-y-[-50%] cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <p className="text-sm sm:text-base my-1 text-right">
          Already have an account?{" "}
          <span
            onClick={togglePage}
            className="underline cursor-pointer transition-all duration-300 hover:text-gray-400"
          >
            Log in
          </span>
        </p>
        <p className="text-sm sm:text-base w-full text-red-500">{message}</p>
      </div>

      <button
        type="submit"
        className="px-8 py-2.5 bg-black w-full sm:w-1/2 md:w-1/4 text-white my-4"
      >
        {loading ? "SINGING UP..." : "SIGN UP"}
      </button>
    </form>
  );
}
