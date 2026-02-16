import {
  MOROCCAN_PHONE_REGEX,
  RECOMMENDED_PASSWORD_REGEX,
  ZIPCODE_REGEX,
} from "@/constants/constants";
import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    role: z.enum(["user", "admin"], {
      errorMap: () => ({ message: "Please select a role." }),
    }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(RECOMMENDED_PASSWORD_REGEX, {
        message:
          "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      }),
    confirmPassword: z.string(),
    zipCode: z.string().regex(ZIPCODE_REGEX, {
      message: "Zip code must be 5 digits",
    }),
    phone: z.string().trim().regex(MOROCCAN_PHONE_REGEX, {
      message:
        "Phone number must start with 06, 07, or +212 and contain 10 digits.",
    }),
    street: z
      .string()
      .min(10, { message: "Address must be at least 10 characters." }),
    city: z.string().min(5, { message: "City must be at least 5 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
