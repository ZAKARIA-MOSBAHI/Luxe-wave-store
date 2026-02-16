import { MOROCCAN_PHONE_REGEX } from "@/constants/constants";
import { z } from "zod";

export const addPhoneNumberSchema = z.object({
  phone: z.string().trim().regex(MOROCCAN_PHONE_REGEX, {
    message:
      "Phone number must start with 06, 07, or +212 and contain 10 digits.",
  }),
});
