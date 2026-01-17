import { z } from "zod";

export const addAddressSchema = z.object({
  street: z.string().trim().min(5, "Street must be at least 5 characters"),

  city: z.string().trim().min(2, "City name is required"),

  country: z
    .string()
    .default("Morocco")
    .refine((val) => val === "Morocco", {
      message: "Country must be Morocco",
    }),

  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Postal code must be 5 digits"),
});
