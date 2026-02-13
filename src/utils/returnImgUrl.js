/**
 * Concatenates the api url with the image path give
 * @param {string} path Relative path of the hosted api image
 * @returns {string} Full Path to the hosted api image
 *
 * @example
 * returnImgUrl("/uploads/img_1.avif")
 * => http://localhost:3000/uploads/img_1.avif
 */
export const returnImgUrl = (path) => {
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  return `${api_url}${path}`;
};
