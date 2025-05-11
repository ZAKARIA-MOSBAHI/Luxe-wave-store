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
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
    street: z
      .string()
      .min(10, { message: "Address must be at least 10 characters." }),
    city: z
      .string()
      .min(10, { message: "City must be at least 10 characters." }),
    state: z
      .string()
      .min(10, { message: "State must be at least 10 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
