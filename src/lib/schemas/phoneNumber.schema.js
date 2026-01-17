import { z } from "zod";

export const addPhoneNumberSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+212|0)([67]\d{8})$/, {
      message:
        "Phone number must start with 06, 07, or +212 and contain 10 digits.",
    }),
});
