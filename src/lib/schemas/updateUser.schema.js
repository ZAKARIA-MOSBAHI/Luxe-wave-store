import { z } from "zod";
export const updateUserSchema = z.object({
  name: z.string().trim().min(3, "The name must be at least 3 characters long"),
  email: z.string().trim().email("Invalid email"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10,}$/, "Phone number must contain at least 10 digits"),
  currencyPreference: z.enum(["USD", "EUR", "MAD"]),

  street: z
    .string()
    .trim()
    .min(15, "Street name must be at least 15 characters long"),
  city: z.string().trim().min(3, "City name must be at least 3 characters"),
  state: z.string().trim().min(3, "State name must be at least 3 characters"),
  country: z
    .string()
    .trim()
    .min(3, "Country name must be at least 3 characters"),
  zipCode: z.string().trim().min(5, "Zip code must be at least 5"),
});
