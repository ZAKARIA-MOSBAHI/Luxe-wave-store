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
  gender: z.enum(["men", "women", "kids"], {
    errorMap: () => ({ message: "Please select a gender." }),
  }),

  badge: z
    .string()
    .min(3, { message: "Badge must be at least 3 characters." })
    .optional()
    .default(null),
  mainImage: z.any({
    required_error: "Main image is required.",
  }),
  additionalImages: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one additional image is required." })
    .max(4, { message: "Maximum 4 additional images allowed" }),
});
