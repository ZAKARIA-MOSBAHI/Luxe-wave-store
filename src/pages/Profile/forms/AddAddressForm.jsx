import { setUserAddress } from "@/app/slices/addressSlice";
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
import { addAddressSchema } from "@/lib/schemas/addAddress.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useAddress } from "@/hooks/useAddress";

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
    name: "zipCode",
    label: "Postal Code",
    placeholder: "10000",
    disabled: false,
    inputMode: "numeric",
  },
];

export default function AddAddressForm({ setDialogOpen }) {
  const { setUser } = useAuth();
  const { createAddress } = useAddress();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      street: "",
      city: "",
      country: "Morocco",
      zipCode: "",
    },
  });

  const handleSubmit = async (data) => {
    const response = await createAddress(data);
    if (response.success) {
      setUser(response.user);
      dispatch(setUserAddress(response.newAddress));
      setDialogOpen(false);
      toast.success("Address saved successfully!");
    } else {
      toast.error(response.message);
    }
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
