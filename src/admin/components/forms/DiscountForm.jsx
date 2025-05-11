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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import DatePicker from "../ui/DatePicker";
import { format } from "date-fns";
import { discountSchema } from "../../../lib/schemas/discount.schema";

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
    const formattedData = {
      ...data,
      validFrom: format(data.validFrom, "yyyy-MM-dd"),
      validTo: format(data.validTo, "yyyy-MM-dd"),
    };
    console.log("Submitted values:", formattedData);
    if (onSubmit) onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6 ">
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
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={"percentage"} value={"percentage"}>
                        Percentage
                      </SelectItem>
                      <SelectItem key={"fixed"} value={"fixed"}>
                        Fixed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder="Enter discount value"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* DATE INPUTS  */}
        <div className="grid md:grid-cols-2 gap-6 ">
          <FormField
            control={form.control}
            name="validFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid From</FormLabel>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="validTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid To</FormLabel>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* MIN AND MAX CART VALUE INPUTS  */}
        <div className="grid md:grid-cols-2 gap-6 ">
          <FormField
            control={form.control}
            name="minCartValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Cart Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Enter min cart value"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxCartValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Cart Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Enter max cart value"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
