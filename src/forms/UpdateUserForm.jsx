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
import { useAuth } from "@/context/AuthProvider";
import { updateUserSchema } from "@/lib/schemas/updateUser.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

export default function UpdateUserForm() {
  const { user } = useAuth();
  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name ? user?.name : "",
      email: user?.email ? user?.email : "",
      phone: user?.phone ? user?.phone : "",
      street: user?.addressId?.street ? user?.addressId?.street : "",
      city: user?.addressId?.city ? user?.addressId?.city : "",
      zipCode: user?.addressId?.zipCode ? user?.addressId?.zipCode : "",
      state: user?.addressId?.state ? user?.addressId?.state : "",
      country: user?.addressId?.country ? user?.addressId?.country : "",
      currencyPreference: user?.currencyPreference
        ? user?.currencyPreference
        : "",
    },
  });
  const handle = (data) => {
    console.log(data);
  };
  const handleBlur = (event, field) => {
    field.onBlur();
    event.target.classList.add("bg-gray-50", "text-black/40");
  };
  const handleFocus = (event) => {
    event.target.classList.remove("bg-gray-50", "text-black/40");
  };
  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handle)}
        className="flex justify-end items-end my-8 w-fit mx-auto g flex-col gap-y-12"
      >
        <div className="grid grid-cols-1 gap-y-8   gap-x-12  md:grid-cols-2 w-fit">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem className={"w-[350px]"}>
                <FormLabel className="text-base uppercase">Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" bg-gray-50 text-black/40"
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, field)}
                    type="text"
                    size="lg"
                    placeholder="Your Full Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className={"w-[350px]"}>
                <FormLabel className="text-base uppercase">
                  Email Adress
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" bg-gray-50 text-black/40"
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, field)}
                    type="email"
                    size="lg"
                    placeholder="Your Email Address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"phone"}
            render={({ field }) => (
              <FormItem className={"w-[350px]"}>
                <FormLabel className="text-base uppercase">
                  phone number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" bg-gray-50 text-black/40"
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, field)}
                    type="tel"
                    size="lg"
                    placeholder="Your Phone Number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"country"}
            render={({ field }) => (
              <FormItem className={"w-[350px]"}>
                <FormLabel className="text-base uppercase">Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" bg-gray-50 text-black/40"
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, field)}
                    type="text"
                    size="lg"
                    placeholder="Your Country Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"state"}
            render={({ field }) => (
              <FormItem className={"w-[350px]"}>
                <FormLabel className="text-base uppercase">State</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" bg-gray-50 text-black/40"
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, field)}
                    type="text"
                    size="lg"
                    placeholder="Your State Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"city"}
            render={({ field }) => (
              <FormItem className={"w-[350px]"}>
                <FormLabel className="text-base uppercase">City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" bg-gray-50 text-black/40"
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, field)}
                    type="text"
                    size="lg"
                    placeholder="Your City Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"zipCode"}
            render={({ field }) => (
              <FormItem className={"w-[350px]"}>
                <FormLabel className="text-base uppercase">Zip Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" bg-gray-50 text-black/40"
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, field)}
                    type="number"
                    size="lg"
                    placeholder="Your Zip Code"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"currencyPreference"}
            render={({ field }) => (
              <FormItem className={"w-[350px]"}>
                <FormLabel className="text-base uppercase">
                  Currency Preference
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" bg-gray-50 text-black/40"
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, field)}
                    type="text"
                    size="lg"
                    placeholder="Currency..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"street"}
            render={({ field }) => (
              <FormItem className={"col-span-2 w-full"}>
                <FormLabel className="text-base uppercase">
                  Shipping Street
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" bg-gray-50 text-black/40"
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, field)}
                    type="text"
                    size="lg"
                    placeholder="Your Street Address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-fit" variant="sharp" size="lg">
          Update Account Information
        </Button>
      </form>
    </Form>
  );
}
