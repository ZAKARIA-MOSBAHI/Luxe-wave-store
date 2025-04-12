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
import { Textarea } from "../ui/Textarea";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().optional(),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
});

export function CategoryForm({ initialData, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      description: "",
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter category description"
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save Category</Button>
        </div>
      </form>
    </Form>
  );
}
