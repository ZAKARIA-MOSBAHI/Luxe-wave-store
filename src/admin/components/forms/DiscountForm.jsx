import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { DialogClose, DialogFooter } from "../ui/Dialog";
import { Button } from "../ui/Button";

const discountSchema = z
  .object({
    code: z.string().min(2, { message: "Code must be at least 2 characters." }),
    type: z.enum(["percentage", "fixed"], {
      errorMap: () => ({ message: "Please select a type." }),
    }),
    value: z
      .number()
      .min(2, { message: "Value must be at least 2 characters." })
      .positive({ message: "Value must be a positive number." }),
    validFrom: z.date(),
    validTo: z.date(),
    minCartValue: z
      .number()
      .min(2, { message: "Minimum cart value must be at least 2 characters." })
      .positive({ message: "Minimum cart value must be a positive number." }),
    maxCartValue: z
      .number()
      .min(2, { message: "Maximum cart value must be at least 2 characters." })
      .positive({ message: "Maximum cart value must be a positive number." }),
  })
  .refine((data) => data.validFrom < data.validTo, {
    message: "Valid from date must be before valid to date",
    path: ["validFrom"],
  });
export default function DiscountForm({ initialData, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(discountSchema),
    defaultValues: initialData || {
      code: "",
      type: "percentage",
      value: 0,
      validFrom: new Date(),
      validTo: new Date(),
      minCartValue: 0,
      maxCartValue: 0,
    },
  });
  const handleSubmit = (data) => {
    console.log("Submitted values:", data);
    if (onSubmit) onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Code</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter discount code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save Discount</Button>
        </div>
      </form>
    </Form>
  );
}
