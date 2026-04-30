import axios from "axios";

/**
 * Axios client configured to talk to the Spring Boot backend.
 * Base URL falls back to a local dev server; override via VITE_API_BASE_URL.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

// Attach JWT from localStorage (Spring Security style)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("pm_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const USE_MOCK = true; // flip to false when the Spring Boot API is live
