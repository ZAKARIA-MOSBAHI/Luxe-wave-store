import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000",
  withCredentials: true,
});

// Add token to headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.data?.name === "accessTokenExpired") {
      console.log("Token expired, handle refresh or logout");

      // Example actions:
      // Try to refresh token (call refresh API)
      // Or clear user and redirect to login
      localStorage.removeItem("user");
      window.location.href = "/login"; // redirect user to login

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default api;
