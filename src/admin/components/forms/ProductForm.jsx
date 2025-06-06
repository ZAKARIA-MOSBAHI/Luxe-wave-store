import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "../../../components/ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DialogClose } from "../ui/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../app/thunks/productThunks";
import { productSchema } from "../../../lib/schemas/product.schema";
import { resetRequestResults } from "../../../app/slices/productSlice";
import { MultiSelect } from "../ui/MultiSelect";

// Sample data - in a real application, this would come from an API
const categories = [
  { id: "cat-1", name: "Electronics" },
  { id: "67e98f8444ca874bee1c81ee", name: "Clothing" },
  { id: "cat-3", name: "Home & Kitchen" },
  { id: "cat-4", name: "Books" },
  { id: "cat-5", name: "Toys & Games" },
];
const sizes = [
  {
    value: "XS",
    label: "XS",
  },
  {
    value: "S",
    label: "S",
  },
  {
    value: "L",
    label: "L",
  },
  {
    value: "M",
    label: "M",
  },
  {
    value: "XL",
    label: "XL",
  },
  {
    value: "XXL",
    label: "XXL",
  },
];

export function ProductForm({ initialData, setDialogOpen }) {
  const { status, error } = useSelector((state) => state.products);

  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState([]);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      stock: 0,
      sizes: [],
      mainImage: undefined,
      additionalImages: [],
    },
  });

  const handleAdditionalImagesChange = (e, field) => {
    const files = Array.from(e.target.files || []); // Convert FileList to array
    field.onChange(files); // Update form state

    // Create previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setAdditionalImagesPreviews(previews);

    // Update the additionalImages state with array of files
    setAdditionalImages(files); // Directly set as an array of File objects
  };

  const handleSubmit = async (values) => {
    await dispatch(resetRequestResults());
    const formData = new FormData();

    // destructuring the sizes value to an array because it comes like this "XS,S,L"
    if (Array.isArray(values.sizes)) {
      values.sizes.forEach((size) => {
        formData.append("sizes", size);
      });
    } else {
      formData.append("sizes", values.sizes);
    }

    // Append text-based values
    for (const key in values) {
      if (key === "sizes") continue;
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        formData.append(key, values[key]);
      }
    }

    // Append the main image file
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    // Append additional images under one property "additionalImages"
    if (additionalImages.length > 0) {
      additionalImages.forEach((image) => {
        formData.append("additionalImages", image);
      });
    }

    // Log the FormData content
    for (let pair of formData.entries()) {
      console.log(pair);
      console.log(pair[0] + ": " + pair[1]);
    }

    // Dispatch the request
    try {
      await dispatch(addProduct(formData)).then((response) => {
        const { success } = response.payload;
        if (success) {
          toast.success("Product saved successfully!");
          setDialogOpen(false);
        } else {
          toast.error("Failed to save product. Please try again.");
        }
      });
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      additionalImagesPreviews.forEach((preview) =>
        URL.revokeObjectURL(preview)
      );
    };
  }, [imagePreview, additionalImagesPreviews]);

  return (
    <Form {...form} enctype="multipart/form-data">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
        <div className="grid gap-6 md:grid-cols-2">
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
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={sizes}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select size"
                    variant="inverted"
                    maxCount={3}
                  />
                </FormControl>

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
            name="stock"
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
          name="mainImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Main Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    {...field}
                    type="file"
                    accept="image/jpg,image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setImagePreview(URL.createObjectURL(file));
                      setMainImage(file);
                      form.clearErrors("mainImage");
                    }}
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
                <span className="sr-only">
                  Upload a product image (PNG, JPG or WEBP)
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Additional Images</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    onChange={(e) => handleAdditionalImagesChange(e, field)}
                    type="file"
                    multiple
                    accept="image/*"
                    className="cursor-pointer"
                  />

                  <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-4">
                    {additionalImagesPreviews.length > 0 &&
                      additionalImagesPreviews.map((image, index) => (
                        <div
                          key={index}
                          className="mt-2 rounded-md overflow-hidden border max-w-[200px]"
                        >
                          <img
                            src={image}
                            alt="additionnal  preview"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                <span className="sr-only">
                  Upload additional product images (PNG, JPG or WEBP)
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
