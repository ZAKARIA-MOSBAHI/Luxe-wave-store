import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "invalid email adress" }),
  password: z
    .string()
    .min(8, { message: "password should be more than 8 characters" }),
});
