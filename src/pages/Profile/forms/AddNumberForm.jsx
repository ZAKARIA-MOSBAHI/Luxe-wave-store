import { updateUser } from "@/services/user.service";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthProvider";
import { addPhoneNumberSchema } from "@/lib/schemas/phoneNumber.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddPhoneNumberForm({ setDialogOpen }) {
  const { user, setUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(addPhoneNumberSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleSubmit = async (formData) => {
    try {
      const result = await updateUser(formData, setUser);

      if (result.success) {
        console.log(
          "%c User updated successfully!",
          "color: green; font-weight: bold;",
        );
        toast.success("Your profile has been updated.");
        setDialogOpen(false);
      } else {
        console.warn("Failed to update user:", result.message);
        toast.error(result.message || "Failed to update user.");
      }
    } catch (error) {
      console.error("Unexpected error updating user:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col w-full items-end"
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full mb-4">
              <FormControl>
                <Input
                  type="text"
                  inputMode="tel"
                  size="xl"
                  placeholder="+212612345678 or 0612345678"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" variant="sharp">
          Save Number
        </Button>
      </form>
    </Form>
  );
}
