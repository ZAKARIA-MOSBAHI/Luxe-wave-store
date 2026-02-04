import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// UI
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

// Store / API
import { setCategories } from "@/app/slices/categorySlice";
import { getCategories } from "@/services/category.service";

// Local
import { productSchema } from "@/lib/schemas/product.schema";
import SizeSelector from "./SizeSelector";
import ProductImagePreview from "../shared/ProductImagePreview";
import { FILTER_OPTIONS } from "@/constants/constants";
import { preview } from "vite";

// --------------------
// Constants
// --------------------
const DEFAULT_FORM_VALUES = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  gender: "",
  badge: "",
};

const DEFAULT_SIZES = {
  S: 0,
  M: 0,
  L: 0,
  XL: 0,
  XXL: 0,
};

// --------------------
// Component
// --------------------
export default function EditProductForm({ initialData, onSubmit }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categoriesState.categories);

  // --------------------
  // Images (NOT RHF)
  // --------------------
  const [mainImage, setMainImage] = useState({
    file: null,
    preview: null,
    fromApi: null, // "/uploads/..."
  });

  const [additionalImages, setAdditionalImages] = useState([]);
  // each item: { file?, preview?, fromApi? }

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState([]);

  const mainImageRef = useRef(null);
  const additionalImagesRef = useRef(null);

  // --------------------
  // Sizes (NOT RHF)
  // --------------------
  const [sizeValues, setSizeValues] = useState(DEFAULT_SIZES);
  const [sizeErrorMsg, setSizeErrorMsg] = useState("");

  // --------------------
  // RHF
  // --------------------
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // --------------------
  // Load categories
  // --------------------
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      dispatch(setCategories(result));
    };
    fetchCategories();
  }, [dispatch]);

  // --------------------
  // Sync initialData (EDIT MODE)
  // --------------------
  useEffect(() => {
    if (!initialData || categories.length === 0) return;

    form.reset({
      ...DEFAULT_FORM_VALUES,
      ...initialData,
    });

    if (initialData.sizes) {
      setSizeValues(initialData.sizes);
    }
    if (initialData.mainImage) {
      setMainImage({
        file: null,
        preview: initialData.mainImage,
        fromApi: initialData.mainImage,
      });
    }

    if (initialData.additionalImages?.length) {
      setAdditionalImages(
        initialData.additionalImages.map((img) => ({
          file: null,
          preview: img,
          fromApi: img,
        })),
      );
    }
  }, [initialData, categories.length, form]);

  // --------------------
  // Sizes change
  // --------------------
  const handleSizeChange = (size, value) => {
    setSizeValues((prev) => ({
      ...prev,
      [size]: Number(value),
    }));
  };

  // --------------------
  // Additional images
  // --------------------
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = files.filter(
      (file) =>
        !additionalImages.some(
          (f) => f.name === file.name && f.size === file.size,
        ),
    );

    const previews = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedFiles = [...additionalImages, ...newFiles];
    const updatedPreviews = [...additionalImagesPreviews, ...previews];

    setAdditionalImages(updatedFiles);
    setAdditionalImagesPreviews(updatedPreviews);

    // sync input element
    const dt = new DataTransfer();
    updatedFiles.forEach((f) => dt.items.add(f));
    additionalImagesRef.current.files = dt.files;
  };

  // --------------------
  // Remove image
  // --------------------
  const handleRemoveImage = (img) => {
    // Main
    if (img === mainImage) {
      URL.revokeObjectURL(mainImagePreview);
      setMainImage(null);
      setMainImagePreview(null);
      mainImageRef.current.value = "";
      return;
    }

    // Additional
    URL.revokeObjectURL(img.preview);
    const files = additionalImages.filter((f) => f !== img.file);
    const previews = additionalImagesPreviews.filter(
      (p) => p.preview !== img.preview,
    );

    setAdditionalImages(files);
    setAdditionalImagesPreviews(previews);

    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    additionalImagesRef.current.files = dt.files;
  };

  // --------------------
  // Submit
  // --------------------
  const handleFormSubmit = (values) => {
    setSizeErrorMsg("");

    if (!Object.values(sizeValues).some((q) => q > 0)) {
      setSizeErrorMsg("At least one size must have quantity > 0");
      return;
    }

    const formData = new FormData();
    formData.append("sizes", JSON.stringify(sizeValues));

    Object.entries(values).forEach(([k, v]) => formData.append(k, v));

    if (mainImage) formData.append("mainImage", mainImage);
    additionalImages.forEach((f) => formData.append("additionalImages", f));

    onSubmit(formData);
  };

  // --------------------
  // JSX
  // --------------------
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category / Gender / Badge */}
        <div className="grid md:grid-cols-3 gap-6">
          {["categoryId", "gender", "badge"].map((name) => {
            const options =
              name === "categoryId"
                ? categories.map((c) => ({
                    label: c.name,
                    value: c._id,
                  }))
                : name === "gender"
                  ? FILTER_OPTIONS.gender.map((g) => ({
                      label: g,
                      value: g,
                    }))
                  : [
                      {
                        label: "Latest Collections",
                        value: "Latest Collections",
                      },
                      { label: "New Arrivals", value: "New Arrivals" },
                      { label: "Best Seller", value: "Best Seller" },
                    ];

            return (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{name}</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${name}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
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
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Main image */}
        <div>
          <Input
            ref={mainImageRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setMainImage(file);
              setMainImagePreview(URL.createObjectURL(file));
            }}
          />
          {mainImagePreview && (
            <ProductImagePreview
              imageUrl={mainImagePreview}
              onRemove={() => handleRemoveImage(mainImage)}
            />
          )}
        </div>

        {/* Additional images */}
        <div>
          <Input
            ref={additionalImagesRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleAdditionalImagesChange}
          />
          <div className="grid grid-cols-4 gap-4">
            {additionalImagesPreviews.map((img) => (
              <ProductImagePreview
                key={img.preview}
                imageUrl={img.preview}
                onRemove={() => handleRemoveImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
