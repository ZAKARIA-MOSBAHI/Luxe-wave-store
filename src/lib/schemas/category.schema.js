import { z } from "zod";
export const categorySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),

  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
});
