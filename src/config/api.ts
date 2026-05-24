/** Default Spring Boot server (see pawminder-backend application.yml). */
export const DEFAULT_API_BASE_URL = "http://localhost:8081/api/v1";

/**
 * Central API base URL for all frontend services.
 * Override with VITE_API_BASE_URL in .env.local (no trailing slash).
 */
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL
).replace(/\/$/, "");
