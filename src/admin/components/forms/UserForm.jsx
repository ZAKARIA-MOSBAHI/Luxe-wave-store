import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import { DialogClose } from "../ui/Dialog";
import { PhoneInput } from "../ui/PhoneInput";
import { isValidPhoneNumber } from "react-phone-number-input";

const userSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    role: z.enum(["user", "admin"], {
      errorMap: () => ({ message: "Please select a role." }),
    }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
    street: z
      .string()
      .min(10, { message: "Address must be at least 10 characters." }),
    city: z
      .string()
      .min(10, { message: "City must be at least 10 characters." }),
    state: z
      .string()
      .min(10, { message: "State must be at least 10 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export function UserForm({ initialData, onSubmit }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPword, setShowPword] = useState(false);
  const [showConfirmPword, setShowConfirmPword] = useState(false);
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: 0,
      street: "",
      city: "",
      role: "",
      state: "",
    },
  });

  const handleSubmit = (values) => {
    const formattedPhone = isValidPhoneNumber(phoneNumber);
    if (!formattedPhone) {
      toast.error("Invalid phone number format.");
      return;
    }
    const newValues = { ...values, phone: phoneNumber };
    console.log("Submitted values:", newValues);
    toast.success("User saved successfully!");
  };
  useEffect(() => {
    console.log(phoneNumber);
    console.log(typeof phoneNumber);
  }, [phoneNumber]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem key={"user"} value={"user"}>
                      User
                    </SelectItem>
                    <SelectItem key={"admin"} value={"admin"}>
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="pl-7"
                  placeholder="Enter email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    {showPword ? (
                      <Eye
                        size={20}
                        onClick={() => setShowPword(!showPword)}
                        className="absolute right-5  top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                      />
                    ) : (
                      <EyeClosed
                        size={20}
                        onClick={() => setShowPword(!showPword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                      />
                    )}
                    <Input
                      placeholder="Enter password"
                      type={showPword ? "text" : "password"}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    {showConfirmPword ? (
                      <Eye
                        size={20}
                        onClick={() => setShowConfirmPword(false)}
                        className="absolute right-5  top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                      />
                    ) : (
                      <EyeClosed
                        size={20}
                        onClick={() => setShowConfirmPword(true)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                      />
                    )}
                    <Input
                      placeholder="Confirm password"
                      type={showConfirmPword ? "text" : "password"}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  defaultCountry="US"
                  placeholder="Enter phone number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    className="pl-7"
                    {...field}
                    type="text"
                    placeholder="Enter state"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Enter city" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter street..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save User</Button>
        </div>
      </form>
    </Form>
  );
}
