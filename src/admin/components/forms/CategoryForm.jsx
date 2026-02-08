import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { categorySchema } from "@/lib/schemas/category.schema";

const DEFAULT_VALUES = { name: "", slug: "" };

export function CategoryForm({ initialData, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || DEFAULT_VALUES,
  });

  const [originalValues, setOriginalValues] = useState(
    initialData || DEFAULT_VALUES,
  );

  // Update form and originalValues if initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      setOriginalValues(initialData);
    }
  }, [initialData, form]);

  // Detect if anything has actually changed
  const hasCategoryChanges = () => {
    const currentValues = form.getValues();
    return Object.keys(DEFAULT_VALUES).some(
      (key) => currentValues[key] !== originalValues[key],
    );
  };

  const handleSubmit = (values) => {
    if (initialData && !hasCategoryChanges()) {
      toast.error("No changes detected!");
      return;
    }

    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter category name"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter category slug"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The slug is used in the URL for this category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="submit">Save Category</Button>
        </div>
      </form>
    </Form>
  );
}
