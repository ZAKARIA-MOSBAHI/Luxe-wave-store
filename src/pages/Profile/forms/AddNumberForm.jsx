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
import { useForm } from "react-hook-form";

export default function AddPhoneNumberForm() {
  const { user, setUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(addPhoneNumberSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleSubmit = async (formData) => {
    console.log("%c Phone Added :", "color: green;");
    console.log(formData);

    // NEXT:
    // await  UPDATE USER
    // setUser({ ...user, phone: formData.phone });
  };

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
