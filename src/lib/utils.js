import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;

  if (!accessToken) {
    localStorage.removeItem("user");
    return buildApiResponse(false, "Unauthorized!");
  } else {
    return buildApiResponse(true, "", { accessToken });
  }
};

export {
  Logout,
  cn,
  DisableScroll,
  EnableScroll,
  buildApiResponse,
  isAuthenticated,
};
