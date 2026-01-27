import { login } from "@/app/api/users";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

import { useAuth } from "@/context/AuthProvider";
import { loginSchema } from "@/lib/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (formData) => {
    try {
      const results = await login(formData, setUser);
      if (results.success) {
        navigate("/", {
          state: {
            firstLogin: true,
          },
          replace: true,
        });
      } else {
        console.log("user failed to login");
        setErrorMsg(results.message);
      }
    } catch (e) {
      console.log("catch block");
      console.log(e);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
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
          <p className="text-end text-sm ">
            Don't have an account{" "}
            <Link to="/signup" className="underline   hover:text-gray-400">
              Sign up
            </Link>
          </p>
          <p className="text-red-500 font-medium text-sm">{errorMsg}</p>
        </div>
        <div className="w-full max-w-[450px]">
          <Button
            type="submit"
            size="lg"
            variant="sharp"
            disabled={status === "loading"}
            className="cursor-pointer w-full "
          >
            LOG IN
          </Button>
          <div className="flex justify-center gap-2 my-2 items-center">
            <p className="w-4 h-[1px] bg-zinc-600 "></p>
            <p className="text-zinc-600 leading-normal font-medium">or</p>
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
