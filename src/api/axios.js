import axios from "axios";

const api = axios.create({
  baseURL: "https://dev.api.bekindnetwork.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
