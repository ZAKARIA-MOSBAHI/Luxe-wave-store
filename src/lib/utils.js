import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const returnImgUrl = (path) => {
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  return `${api_url}${path}`;
};

const DisableScroll = () => {
  document.body.style.overflow = "hidden";
};
const EnableScroll = () => {
  document.body.style.overflow = "";
};

const buildApiResponse = (status, message, data = {}) => ({
  status,
  message,
  ...data,
});
/**
 * Build FormData for product create/update
 * @param {Object} formValues - { name, description, gender, badge, price, categoryId }
 * @param {Object} sizeValues - { S: 0, M: 0, ... }
 * @param {File|undefined} mainImage - new main image file or undefined to keep existing
 * @param {File|File[]|undefined} additionalImages - new additional images or undefined to keep existing
 * @param {string[]|undefined} removedImages - images to remove from API, array even if 1 item
 */
export const buildProductFormData = (
  formValues,
  sizeValues,
  mainImage = undefined,
  additionalImages = undefined,
  removedImages = undefined,
) => {
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  const formData = new FormData();

  // required fields
  formData.append("name", formValues.name);
  formData.append("description", formValues.description);
  formData.append("gender", formValues.gender);
  formData.append("badge", formValues.badge);
  formData.append("price", formValues.price);
  formData.append("categoryId", formValues.categoryId);
  formData.append("sizes", JSON.stringify(sizeValues));

  // optional removed images
  if (removedImages?.length > 0) {
    const sanitizedRemoved = removedImages.map((i) => i.replace(api_url, ""));
    formData.append("removedImages", JSON.stringify(sanitizedRemoved));
  }

  // optional main image
  if (mainImage) {
    formData.append("mainImage", mainImage);
  }

  // optional additional images
  if (additionalImages) {
    // normalize to array
    const filesArray = Array.isArray(additionalImages)
      ? additionalImages
      : [additionalImages];

    filesArray.forEach((file) => {
      if (file) formData.append("additionalImages", file);
    });
  }

  return formData;
};

export {
  Logout,
  cn,
  returnImgUrl,
  DisableScroll,
  EnableScroll,
  buildApiResponse,
};
