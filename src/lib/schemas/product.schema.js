import { FILTER_OPTIONS } from "@/constants/constants";
import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." }),

  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters." }),

  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),

  categoryId: z.string().min(1, { message: "Please select a category." }),

  gender: z.enum(FILTER_OPTIONS.gender, {
    errorMap: () => ({ message: "Please select a gender." }),
  }),

  badge: z
    .string()
    .trim()
    .min(3, { message: "Badge must be at least 3 characters." })
    .optional()
    .default(null),
});
