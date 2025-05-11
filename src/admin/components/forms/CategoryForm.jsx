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
import { toast } from "sonner";
import { DialogClose } from "../ui/Dialog";
import { categorySchema } from "../../../lib/schemas/category.schema";
export function CategoryForm({ initialData, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
    },
  });

  const handleNameChange = (e) => {
    const name = e.target.value;
    form.setValue("name", name);

    // Only auto-generate slug if it's empty or matches previous auto-generated slug
    if (
      !form.getValues("slug") ||
      form.getValues("slug") ===
        form.getValues("name").toLowerCase().replace(/\s+/g, "-")
    ) {
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      form.setValue("slug", slug);
    }
  };

  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      // For demo purposes, show a success toast
      toast.success("Category saved successfully!");
      console.log("Category form values:", values);
    }
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
                    handleNameChange(e);
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
                <Input placeholder="Enter category slug" {...field} />
              </FormControl>
              <FormDescription>
                The slug is used in the URL for this category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          {/* since the form will be inside a dialog context  */}
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save Category</Button>
        </div>
      </form>
    </Form>
  );
}
