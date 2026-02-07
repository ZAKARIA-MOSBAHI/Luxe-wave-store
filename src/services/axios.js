import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000",
  withCredentials: true,
});

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

export default api;
