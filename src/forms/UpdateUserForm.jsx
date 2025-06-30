import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/admin/components/ui/Form";
import { Input } from "@/admin/components/ui/Input";

import { useForm } from "react-hook-form";

export default function UpdateUserForm() {
  const form = useForm({
    defaultValues: {
      name: "John Doe",
    },
  });
  const handle = (data) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handle)}>
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
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
