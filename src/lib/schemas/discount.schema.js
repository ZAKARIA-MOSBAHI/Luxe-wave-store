import { z } from "zod";

export const discountSchema = z
  .object({
    code: z.string().min(2, { message: "Code must be at least 2 characters." }),
    type: z.enum(["percentage", "fixed"], {
      errorMap: () => ({ message: "Please select a type." }),
    }),
    value: z.coerce
      .number()
      .positive({ message: "Value must be a positive number." }),
    validFrom: z.date(),
    validTo: z.date(),
    minCartValue: z.coerce
      .number()
      .positive({ message: "Minimum cart value must be a positive number." }),
    maxCartValue: z.coerce
      .number()
      .positive({ message: "Maximum cart value must be a positive number." }),
  })
  .refine(
    (data) => {
      // Convert dates to start of the day for accurate comparison
      const validFrom = new Date(data.validFrom);
      validFrom.setHours(0, 0, 0, 0);
      const validTo = new Date(data.validTo);
      validTo.setHours(0, 0, 0, 0);
      return validFrom < validTo;
    },
    {
      message: "Valid from date must be before valid to date",
      path: ["validFrom"],
    }
  )
  .refine((data) => parseInt(data.maxCartValue) > parseInt(data.minCartValue), {
    message: "Max cart value must be greater than min cart value",
    path: ["maxCartValue"],
  });
