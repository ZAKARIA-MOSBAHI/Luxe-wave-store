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
import { addAddressSchema } from "@/lib/schemas/addAddress.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formFields = [
  {
    name: "street",
    label: "Shipping Street",
    placeholder: "Street, building, apartment...",
    disabled: false,
    inputMode: "",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Casablanca, Rabat...",
    disabled: false,
    inputMode: "",
  },
  {
    name: "country",
    label: "Country",
    placeholder: "",
    disabled: true,
    inputMode: "",
  },
  {
    name: "postalCode",
    label: "Postal Code",
    placeholder: "10000",
    disabled: false,
    inputMode: "numeric",
  },
];

export default function AddAddressForm() {
  const form = useForm({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      street: "",
      city: "",
      country: "Morocco",
      postalCode: "",
    },
  });

  const handleSubmit = async (data) => {
    console.log("%c Address submitted:", "color: green;");
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        {formFields.map((ff) => (
          <FormField
            key={ff.name}
            control={form.control}
            name={ff.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{ff.label}</FormLabel>
                <FormControl>
                  <Input
                    inputMode={ff.inputMode}
                    placeholder={ff.placeholder}
                    disabled={ff.disabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" size="lg" variant="sharp" className="self-end">
          Save Address
        </Button>
      </form>
    </Form>
  );
}
