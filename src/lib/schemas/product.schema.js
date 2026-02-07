import { FILTER_OPTIONS } from "@/constants/constants";
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

  gender: z.enum(FILTER_OPTIONS.gender, {
    errorMap: () => ({ message: "Please select a gender." }),
  }),

  badge: z
    .string()
    .min(3, { message: "Badge must be at least 3 characters." })
    .optional()
    .default(null),
  // the images will be validated in the component
  // mainImage: z
  //   .union([z.instanceof(File), z.string()])
  //   .optional()
  //   .superRefine((value, ctx) => {
  //     // Edit mode → existing image path
  //     if (typeof value === "string") return;

  //     // Create / replaced image
  //     if (!(value instanceof File)) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: "Main image is required.",
  //       });
  //       return;
  //     }

  //     const result = validateMainImage(value);
  //     if (!result.valid) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: result.message,
  //       });
  //     }
  //   }),

  // additionalImages: z
  //   .array(z.union([z.instanceof(File), z.string()]))
  //   .optional()
  //   .superRefine((files, ctx) => {
  //     if (!files || files.length === 0) return;

  //     const newFiles = files.filter((f) => f instanceof File);

  //     // Only validate files user changed
  //     if (newFiles.length > 0) {
  //       const result = validateAdditionalImages(newFiles);
  //       if (!result.valid) {
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           message: result.message,
  //         });
  //       }
  //     }
  //   }),
});
