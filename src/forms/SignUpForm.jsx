import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { signupSchema } from "@/lib/schemas/signup.schema";
import { signup } from "@/app/api/users";
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
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

export default function SignUpForm() {
  const { setUser, user } = useAuth();
  const [errorMsg, setErrorMsg] = useState({
    general: null,
    email: null,
    name: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setErrorMsg({
        email: null,
        name: null,
        success: false,
      });
      setLoading(true);
      const response = await signup(data, setUser);

      console.log("Signup response:", response);
      // if request was succesfull
      if (response.success) {
        navigate("/", {
          replace: true,
          state: { signedUp: true },
        });
      } else {
        setErrorMsg({
          email:
            response.response?.data.field === "email"
              ? response.response.data.message
              : null,
          name:
            response.response?.data.field === "name"
              ? response.response.data.message
              : null,
          general:
            response?.response.data.message && !response.response?.data.field
              ? response.response.data.message
              : null,
          success: false,
        });
      }
      setLoading(false);
    } catch (error) {
      setErrorMsg((prev) => ({
        ...prev,
        general:
          error.errorMsg ||
          "An error occurred during signup. Please try again later.",
      }));
      setLoading(false);
    }
  };

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col  w-full justify-center items-center max-w-[450px]"
      >
        <div className="w-full space-y-3">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base uppercase">Full Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    size="lg"
                    placeholder="Your Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {errorMsg.name ? errorMsg.name : null}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base uppercase">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    size="lg"
                    placeholder="Your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {errorMsg.email ? errorMsg.email : null}
                </FormMessage>
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
                      size="lg"
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
        </div>

        <p className="text-end text-sm sm:text-base w-full ">
          Already have an account{" "}
          <Link to="/login" className="underline hover:text-gray-400">
            Log in
          </Link>
        </p>
        {errorMsg.general && (
          <p className="text-red-500 w-full text-center">{errorMsg.general}</p>
        )}

        <div className="w-full max-w-[450px] mt-4">
          <Button
            type="submit"
            size="lg"
            variant="sharp"
            disabled={loading}
            className="cursor-pointer w-full "
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                <span className="ml-2">signing in...</span>
              </>
            ) : (
              "SIGN IN"
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
