import { Button } from "@/admin/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/admin/components/ui/Form";
import { Input } from "@/admin/components/ui/Input";
import { resetRequestResults } from "@/app/slices/userSlice";
import { loginUser } from "@/app/thunks/userThunks";

import { useAuth } from "@/context/AuthProvider";
import { loginSchema } from "@/lib/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { status, error } = useSelector((state) => state.user);
  const { setUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const LoginEmailRef = useRef();
  const LoginPwordRef = useRef();
  const handleSubmit = (formData) => {
    console.log(formData);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(resetRequestResults());
    const formData = {
      email: LoginEmailRef.current.value,
      password: LoginPwordRef.current.value,
    };

    dispatch(loginUser(formData)).then((response) => {
      if (response?.error) {
        console.log("this is the error ", response);
      } else {
        // redirect to the homepage if the user is logged in successfully
        console.log("this is the response ", response);
        setUser(response.payload);
        navigate("/", {
          replace: true,
          state: { firstLogin: true },
        });
      }
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-[450px]  flex flex-col gap-6 w-full justify-center items-center"
      >
        <div className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full mb-4">
                <FormLabel className="text-base uppercase">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    size="xl"
                    placeholder="Your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base uppercase">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      size="xl"
                      placeholder="Your password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-3"
                    >
                      {showPassword ? (
                        <EyeClosed className=" stroke-1 size-7 " />
                      ) : (
                        <Eye className="stroke-1 size-7 " />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-end text-sm sm:text-base">
            Don't have an account{" "}
            <Link to="/signin" className="underline   hover:text-gray-400">
              Sign in
            </Link>
          </p>
        </div>
        <div className="w-full max-w-[450px]">
          <Button
            type="submit"
            size="lg"
            variant="sharp"
            disabled={status === "loading"}
            className="cursor-pointer w-full "
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin" />
                <span className="ml-2">LOGGING...</span>
              </>
            ) : (
              "LOG IN"
            )}
          </Button>
          <div className=" flex justify-center gap-2 my-2 items-center">
            <p className="w-4 h-[1px] bg-zinc-600 "></p>
            <p className="text-zinc-600 leading-normal">or</p>
            <p className="w-4 h-[1px] bg-zinc-600 "></p>
          </div>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="cursor-pointer w-full rounded-none text-red-300 border-red-300"
          >
            Continue With Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
