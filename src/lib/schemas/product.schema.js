import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  categoryId: z.string().min(1, { message: "Please select a category." }),
  stock: z.coerce
    .number({
      required_error: "Stock is required.", // If the field is missing
      invalid_type_error: "Stock must be a number.", // If the input can't be coerced to a number
    })
    .int({ message: "Stock quantity must be an integer." })
    .positive({ message: "Stock quantity  must be a positive number." })
    .min(0, { message: "Stock cannot be negative." }),

  mainImage: z.any({
    required_error: "Main image is required.",
  }),
  additionalImages: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one additional image is required." })
    .max(4, { message: "Maximum 4 additional images allowed" }),
});
