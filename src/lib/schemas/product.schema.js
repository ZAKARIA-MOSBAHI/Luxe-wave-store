import { FILTER_OPTIONS } from "@/constants/constants";
import { z } from "zod";
import {
  validateAdditionalImages,
  validateMainImage,
} from "../imageValidators";

export const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
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
    .min(3, { message: "Badge must be at least 3 characters." })
    .optional()
    .default(null),
  mainImage: z.any().superRefine((file, ctx) => {
    const result = validateMainImage(file);
    if (!result.valid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.message,
      });
      return false;
    }
    return true;
  }),
  additionalImages: z.any().superRefine((files, ctx) => {
    const result = validateAdditionalImages(files);

    if (!result.valid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.message,
      });
      return false;
    }

    return true;
  }),
});
