import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const returnImgUrl = (path)=> {
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  return `${api_url}${path}`;
}
export { Logout, cn, returnImgUrl };
