import { RECOMMENDED_PASSWORD_REGEX } from "@/constants/constants";
import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name should be at least 4 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(RECOMMENDED_PASSWORD_REGEX, {
      message:
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    }),
});
