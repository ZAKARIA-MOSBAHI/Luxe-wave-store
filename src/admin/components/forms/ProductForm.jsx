import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { Textarea } from "@/components/ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { setCategories } from "@/app/slices/categorySlice";
import { getCategories } from "@/services/category.service";

import { productSchema } from "@/lib/schemas/product.schema";
import SizeSelector from "./SizeSelector";
import ProductImagePreview from "../shared/ProductImagePreview";
import { FILTER_OPTIONS } from "@/constants/constants";
import { buildProductFormData, returnImgUrl } from "@/lib/utils";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "sonner";

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

export default function ProductForm({ initialData, onSubmit }) {
  const [formErrors, setFormErrors] = useState({
    mainImage: null,
    additionalImages: null,
    size: null,
  });
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.products);
  const { categories } = useCategories();
  // to send api the images that should be deleted from the api
  const [removedImages, setRemovedImages] = useState([]);
  // form data handled not by RHF
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState([]);

  const mainImageRef = useRef(null);
  const additionalImagesRef = useRef(null);

  const [sizeValues, setSizeValues] = useState(DEFAULT_SIZES);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      dispatch(setCategories(result));
    };
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    if (!initialData || categories.length === 0) return;

    form.reset({
      ...DEFAULT_FORM_VALUES,
      ...initialData,
    });
    console.warn("initial data : ");
    console.log(initialData);
    if (initialData.sizes) {
      setSizeValues(initialData.sizes);
    }
    if (initialData.mainImage) {
      setMainImagePreview({
        preview: returnImgUrl(initialData.mainImage),
        file: null,
      });
    }

    if (initialData.additionalImages?.length) {
      const previews = initialData.additionalImages.map((img) => ({
        preview: returnImgUrl(img.url),
        file: null,
      }));

      setAdditionalImagesPreviews(previews);
    }
  }, [initialData, categories.length, form]);

  const handleSizeChange = (size, value) => {
    setSizeValues((prev) => ({
      ...prev,
      [size]: value === "" ? "" : Number(value),
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImagePreview({ preview: URL.createObjectURL(file), file });
    e.target.value = "";
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setAdditionalImagesPreviews((prev) => {
      const existing = prev;

      const newFiles = files.filter(
        (file) =>
          !existing.some(
            (img) =>
              img.file &&
              img.file.name === file.name &&
              img.file.size === file.size,
          ),
      );

      const newPreviews = newFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      e.target.value = "";

      return [...existing, ...newPreviews];
    });
  };

  const handleRemoveImage = (img, type = "mainImage") => {
    const isObjectUrl = img.preview?.startsWith("blob:");

    if (type === "mainImage") {
      if (img.file === null) {
        setRemovedImages((prev) => [...prev, img.preview]);
      }

      if (isObjectUrl) {
        URL.revokeObjectURL(img.preview);
      }

      setMainImagePreview(null);
      return;
    }

    if (type === "additionalImage") {
      if (img.file === null) {
        setRemovedImages((prev) => [...prev, img.preview]);
      }

      setAdditionalImagesPreviews((prev) =>
        prev.filter((ai) => ai.preview !== img.preview),
      );

      if (isObjectUrl) {
        URL.revokeObjectURL(img.preview);
      }
    }
  };
  const hasProductChanges = () => {
    if (!initialData) return true;

    // 1️⃣ Compare form fields manually
    const currentValues = form.getValues();

    const isFormChanged = Object.keys(DEFAULT_FORM_VALUES).some((key) => {
      const currentValue = currentValues[key];
      const initialValue = initialData[key];

      if (key === "price") {
        return Number(currentValue) !== Number(initialValue);
      }

      return currentValue !== initialValue;
    });

    // 2️⃣ Sizes
    const isSizesChanged =
      JSON.stringify(sizeValues) !== JSON.stringify(initialData.sizes || {});

    // 3️⃣ Images
    const isMainImageChanged = !!mainImagePreview?.file;

    const isAdditionalImagesAdded = additionalImagesPreviews.some(
      (img) => img.file instanceof File,
    );

    const isImagesRemoved = removedImages.length > 0;

    return (
      isFormChanged ||
      isSizesChanged ||
      isMainImageChanged ||
      isAdditionalImagesAdded ||
      isImagesRemoved
    );
  };

  const handleFormSubmit = (values) => {
    setFormErrors({
      mainImage: null,
      additionalImages: null,
      size: null,
    });
    if (!initialData && !Object.values(sizeValues).some((q) => q > 0)) {
      setFormErrors((prev) => ({
        ...prev,
        size: "At least one size must have quantity > 0",
      }));
      return;
    }
    if (!mainImagePreview) {
      setFormErrors((prev) => ({
        ...prev,
        mainImage: "The main image is Required!",
      }));
      return;
    }
    if (!additionalImagesPreviews || additionalImagesPreviews.length !== 3) {
      setFormErrors((prev) => ({
        ...prev,
        additionalImages: "It Should be 3 additional images!",
      }));
      return;
    }
    if (!hasProductChanges()) {
      toast.error("no changes detected!");
      return;
    }
    const mainImg = mainImagePreview.file ? mainImagePreview.file : undefined;
    const additionalImgs = additionalImagesPreviews
      .filter((ai) => ai.file !== null)
      .map((ai) => ai.file);
    const data = buildProductFormData(
      values,
      sizeValues,
      mainImg,
      additionalImgs,
      removedImages,
    );
    for (let [key, value] of data.entries()) {
      if (value instanceof File) {
        console.log(key, "FILE:", value.name, value.size, value.type);
      } else {
        console.log(key, value);
      }
    }
    onSubmit(data);
  };
  useEffect(() => {
    return () => {
      // Revoke main image if it's a blob
      if (mainImagePreview?.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(mainImagePreview.preview);
      }

      // Revoke additional images blobs
      additionalImagesPreviews.forEach((img) => {
        if (img.preview?.startsWith("blob:")) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [mainImagePreview, additionalImagesPreviews]);
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
                    <FormLabel>
                      {name === "categoryId" ? "Category" : name}
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`Select ${name === "categoryId" ? "Category" : name}`}
                          />
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
          sizeErrorMsg={formErrors.size ?? ""}
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
          <p>Main Image</p>
          <Input
            ref={mainImageRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleMainImageChange(e)}
          />
          <span className="text-red-500 text-sm font-medium">
            {formErrors.mainImage}
          </span>
          {mainImagePreview && (
            <ProductImagePreview
              imageUrl={mainImagePreview?.preview}
              onRemove={() => handleRemoveImage(mainImagePreview)}
            />
          )}
        </div>

        {/* Additional images */}
        <div>
          <p>Additional Images</p>

          <Input
            ref={additionalImagesRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleAdditionalImagesChange}
          />
          <span className="text-red-500 text-sm font-medium">
            {formErrors.additionalImages}
          </span>
          <div className="grid grid-cols-4 gap-4">
            {additionalImagesPreviews.map((img, ind) => (
              <ProductImagePreview
                key={ind}
                imageUrl={img?.preview}
                onRemove={() => handleRemoveImage(img, "additionalImage")}
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
