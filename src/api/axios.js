import axios from "axios";

// API para login (subdominio netbo)
export const authApi = axios.create({
  baseURL: "https://dev.apinetbo.bekindnetwork.com",
});

// API para acciones (subdominio api)
export const actionsApi = axios.create({
  baseURL: "https://dev.api.bekindnetwork.com",
});

// Agregar token automáticamente a ambas APIs
[authApi, actionsApi].forEach((instance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
});