// form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ui
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

// react
import { useEffect, useRef, useState } from "react";

// store
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "@/app/slices/categorySlice";

// api
import { createProduct } from "@/services/product.service";
import { getCategories } from "@/services/category.service";

// local
import { productSchema } from "@/lib/schemas/product.schema";
import SizeSelector from "./SizeSelector";
import ProductImagePreview from "../shared/ProductImagePreview";

// utils / constants
import { FILTER_OPTIONS } from "@/constants/constants";
import { toast } from "sonner";

// form constants
const DEFAULT_FORM_VALUES = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  gender: "",
  badge: "",
  sizes: "",
  mainImage: undefined,
  additionalImages: [],
};

const DEFAULT_SIZES = {
  S: 0,
  M: 0,
  L: 0,
  XL: 0,
  XXL: 0,
};

export function AddProductForm({ initialData }) {
  const { status } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categoriesState.categories);
  const dispatch = useDispatch();

  // Images
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState([]);
  const mainImageRef = useRef();
  const additionalImagesInputRef = useRef();

  // Sizes
  const [sizeValues, setSizeValues] = useState(DEFAULT_SIZES);
  const [sizeErrorMsg, setSizeErrorMsg] = useState("");

  // React Hook Form
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || DEFAULT_FORM_VALUES,
  });

  // -----------------------------
  // Handle Additional Images Change
  // -----------------------------
  const handleAdditionalImagesChange = (e, field) => {
    const newFiles = Array.from(e.target.files);

    // Filter duplicates (by name + size)
    const uniqueNewFiles = newFiles.filter(
      (file) =>
        !additionalImages.some(
          (f) => f.name === file.name && f.size === file.size,
        ),
    );

    const newFilesWithPreviews = uniqueNewFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedFiles = [...additionalImages, ...uniqueNewFiles];
    const updatedPreviews = [
      ...additionalImagesPreviews,
      ...newFilesWithPreviews,
    ];

    // Update local state
    setAdditionalImages(updatedFiles);
    setAdditionalImagesPreviews(updatedPreviews);

    // Update RHF field with actual File objects
    field.onChange(updatedFiles);

    // Update the input element itself so removed files aren't stuck
    if (additionalImagesInputRef.current) {
      const dt = new DataTransfer();
      updatedFiles.forEach((f) => dt.items.add(f));
      additionalImagesInputRef.current.files = dt.files;
    }
  };

  // -----------------------------
  // Remove Image (Main or Additional)
  // -----------------------------
  const handleRemoveImage = (fileToRemove, inputRef = null) => {
    // ---- Main Image ----
    if (mainImage === fileToRemove) {
      form.setValue("mainImage", null);
      URL.revokeObjectURL(mainImagePreview);
      setMainImage(null);
      setMainImagePreview(null);
      if (inputRef) inputRef.value = "";
      return;
    }

    // ---- Additional Images ----
    const updatedFiles = additionalImages.filter(
      (f) => f !== fileToRemove.file,
    );
    const updatedPreviews = additionalImagesPreviews.filter(
      (p) => p.preview !== fileToRemove.preview,
    );

    // Clean up object URL
    URL.revokeObjectURL(fileToRemove.preview);

    // Update states
    setAdditionalImages(updatedFiles);
    setAdditionalImagesPreviews(updatedPreviews);
    form.setValue("additionalImages", updatedFiles);

    // Update the HTML input element
    if (inputRef) {
      const dt = new DataTransfer();
      updatedFiles.forEach((f) => dt.items.add(f));
      inputRef.files = dt.files;
    }
  };

  // -----------------------------
  // Build FormData for API
  // -----------------------------
  const buildProductFormData = ({
    values,
    sizeValues,
    mainImage,
    additionalImages,
  }) => {
    const formData = new FormData();
    formData.append("sizes", JSON.stringify(sizeValues));

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "sizes") formData.append(key, value);
    });

    if (mainImage) formData.append("mainImage", mainImage);

    additionalImages.forEach((f) => formData.append("additionalImages", f));

    return formData;
  };

  // -----------------------------
  // Form Submit
  // -----------------------------
  const handleSubmit = async (values) => {
    setSizeErrorMsg("");

    if (!Object.values(sizeValues).some((qty) => qty > 0)) {
      setSizeErrorMsg("At least one size must have quantity greater than 0");
      return;
    }

    const formData = buildProductFormData({
      values,
      sizeValues,
      mainImage,
      additionalImages,
    });
    alert("NEXT: Make api call and dispatch the new product to redux ");
    // try {
    //   const result = await createProduct(formData);
    //   toast.success("Product created successfully!");
    // } catch (err) {
    //   toast.error("Failed to create product.");
    //   console.error(err);
    // }
  };

  // -----------------------------
  // Sizes Change
  // -----------------------------
  const handleSizeChange = (size, value) => {
    setSizeValues((prev) => ({ ...prev, [size]: Number(value) }));
  };

  // -----------------------------
  // Fetch Categories
  // -----------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        dispatch(setCategories(categories));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, [dispatch]);

  // -----------------------------
  // Cleanup Object URLs
  // -----------------------------
  useEffect(() => {
    return () => {
      if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
      additionalImagesPreviews.forEach(({ preview }) =>
        URL.revokeObjectURL(preview),
      );
    };
  }, [mainImagePreview, additionalImagesPreviews]);

  return (
    <Form {...form} encType="multipart/form-data">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Product Name */}
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

        {/* Description */}
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

        {/* Category / Gender / Badge */}
        <div className="grid gap-6 md:grid-cols-3">
          {["categoryId", "gender", "badge"].map((fieldName) => {
            const options =
              fieldName === "categoryId"
                ? categories.map((c) => ({ label: c.name, value: c._id }))
                : fieldName === "gender"
                  ? FILTER_OPTIONS.gender.map((g) => ({ label: g, value: g }))
                  : [
                      {
                        label: "Latest Collections",
                        value: "Latest Collections",
                      },
                      { label: "New Arrivals", value: "New Arrivals" },
                    ];

            return (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {fieldName === "categoryId"
                        ? "Category"
                        : fieldName.charAt(0).toUpperCase() +
                          fieldName.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select a ${fieldName}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>

        {/* Sizes */}
        <SizeSelector
          sizeValues={sizeValues}
          handleSizeChange={handleSizeChange}
          sizeErrorMsg={sizeErrorMsg}
        />

        {/* Price */}
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

        {/* Main Image */}
        <FormField
          control={form.control}
          name="mainImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Main Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    ref={mainImageRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      field.onChange(file);
                      setMainImage(file);
                      setMainImagePreview(URL.createObjectURL(file));
                      form.clearErrors("mainImage");
                    }}
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
                  {mainImagePreview && (
                    <ProductImagePreview
                      className="w-[200px]"
                      imageUrl={mainImagePreview}
                      onRemove={() =>
                        handleRemoveImage(mainImage, mainImageRef?.current)
                      }
                    />
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload a product image (PNG, JPG, WEBP)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Images */}
        <FormField
          control={form.control}
          name="additionalImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Additional Images</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    ref={additionalImagesInputRef}
                    onChange={(e) => handleAdditionalImagesChange(e, field)}
                    type="file"
                    multiple
                    accept="image/*"
                    className="cursor-pointer"
                  />
                  <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-4">
                    {additionalImagesPreviews.map((image) => (
                      <ProductImagePreview
                        key={image.preview}
                        imageUrl={image.preview}
                        onRemove={() =>
                          handleRemoveImage(
                            image,
                            additionalImagesInputRef.current,
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Upload additional product images (PNG, JPG, WEBP)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
