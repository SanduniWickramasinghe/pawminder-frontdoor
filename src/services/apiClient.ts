import axios from "axios";
import { API_BASE_URL } from "@/config/api";

/**
 * Axios client configured to talk to the Spring Boot backend.
 * Base URL is defined in src/config/api.ts (override via VITE_API_BASE_URL).
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

// Attach JWT from localStorage (Spring Security style)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("pm_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("pm_token");
      localStorage.removeItem("pm_user");
      if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  }
);

/** Set to true to use in-memory mock data without the Spring Boot API. */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
