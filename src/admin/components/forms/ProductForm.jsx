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
import { Textarea } from "../ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useState } from "react";
import { toast } from "sonner";
import { DialogClose } from "../ui/Dialog";

// Sample data - in a real application, this would come from an API
const categories = [
  { id: "cat-1", name: "Electronics" },
  { id: "cat-2", name: "Clothing" },
  { id: "cat-3", name: "Home & Kitchen" },
  { id: "cat-4", name: "Books" },
  { id: "cat-5", name: "Toys & Games" },
];

const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  categoryId: z.string({ required_error: "Please select a category." }),
  stockQuantity: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Stock quantity must be a non-negative integer." }),
  image: z.any().optional(),
});

export function ProductForm({ initialData, onSubmit }) {
  const [imagePreview, setImagePreview] = useState(null);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      stockQuantity: 0,
      image: undefined,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      // For demo purposes, show a success toast
      toast.success("Product saved successfully!");
      console.log("Product form values:", values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter product description"
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      className="pl-7"
                      {...field}
                      type="number"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    {...field}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-2 rounded-md overflow-hidden border max-w-[200px]">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload a product image (PNG, JPG or WEBP)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </Form>
  );
}
