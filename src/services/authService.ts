import { apiClient, USE_MOCK } from "./apiClient";
import type { AuthRequestDTO, AuthResponseDTO, SignUpRequestDTO, UserDTO } from "./types";

const TOKEN_KEY = "pm_token";
const USER_KEY = "pm_user";
const REMEMBER_KEY = "pm_remember";

export const authService = {
  async login(payload: AuthRequestDTO): Promise<AuthResponseDTO> {
    if (USE_MOCK) {
      await delay(600);
      const res: AuthResponseDTO = {
        token: "mock-jwt-token",
        user: { id: "u1", email: payload.email, fullName: "Pet Parent" },
      };
      persist(res, !!payload.rememberMe);
      return res;
    }
    const { data } = await apiClient.post<AuthResponseDTO>("/auth/login", payload);
    persist(data, !!payload.rememberMe);
    return data;
  },

  async signUp(payload: SignUpRequestDTO): Promise<AuthResponseDTO> {
    if (USE_MOCK) {
      await delay(700);
      const res: AuthResponseDTO = {
        token: "mock-jwt-token",
        user: { id: "u1", email: payload.email, fullName: payload.fullName },
      };
      persist(res, true);
      return res;
    }
    const { data } = await apiClient.post<AuthResponseDTO>("/auth/register", payload);
    persist(data, true);
    return data;
  },

  async oauth(provider: "google" | "apple"): Promise<AuthResponseDTO> {
    if (USE_MOCK) {
      await delay(500);
      const res: AuthResponseDTO = {
        token: `mock-${provider}-token`,
        user: { id: "u1", email: `user@${provider}.com`, fullName: "Pet Parent" },
      };
      persist(res, true);
      return res;
    }
    const { data } = await apiClient.get<AuthResponseDTO>(`/auth/oauth/${provider}`);
    persist(data, true);
    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  },

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getCurrentUser(): UserDTO | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserDTO;
    } catch {
      return null;
    }
  },
};

function persist(res: AuthResponseDTO, remember: boolean) {
  localStorage.setItem("pm_token", res.token);
  localStorage.setItem("pm_user", JSON.stringify(res.user));
  if (remember) localStorage.setItem("pm_remember", "1");
}
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
