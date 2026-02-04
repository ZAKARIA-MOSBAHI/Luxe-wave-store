import { createClientAddress } from "@/services/address.service";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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
    try {
      const result = await createClientAddress(data);

      if (!result || result.success === false) {
        throw new Error(result?.message || "Failed to create address");
      }

      setUser(result.user);
      dispatch(setUserAddress(result.newAddress));
      setDialogOpen(false);
      toast.success("Address saved successfully!");
    } catch (error) {
      console.error("Error creating address:", error);
      toast.success("Address saved successfully!");
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
