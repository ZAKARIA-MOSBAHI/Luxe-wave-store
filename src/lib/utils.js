import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export { Logout, cn };
