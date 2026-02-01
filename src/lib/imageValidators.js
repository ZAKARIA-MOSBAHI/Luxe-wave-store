import { ALLOWED_IMAGE_MIME_TYPES } from "@/constants/forms.constants";

export const isValidImageFile = (file) => {
  if (!(file instanceof File)) return false;

  return ALLOWED_IMAGE_MIME_TYPES.includes(file.type);
};
export const validateMainImage = (file) => {
  if (!(file instanceof File)) {
    return { valid: false, message: "Main image is required." };
  }

  if (!isValidImageFile(file)) {
    console.log("here2");
    return {
      valid: false,
      message: "Main image must be JPEG, PNG, WEBP or AVIF.",
    };
  }

  return { valid: true };
};
export const validateAdditionalImages = (files) => {
  if (!Array.isArray(files)) {
    return { valid: false, message: "Additional images are required." };
  }

  if (files.length !== 3) {
    return {
      valid: false,
      message: "You must upload exactly 3 additional images.",
    };
  }

  const invalidFile = files.find(
    (file) => !(file instanceof File) || !isValidImageFile(file),
  );

  if (invalidFile) {
    return {
      valid: false,
      message: "All images must be JPEG, PNG, WEBP or AVIF.",
    };
  }

  return { valid: true };
};
