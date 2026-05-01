import { apiClient, USE_MOCK } from "./apiClient";
import { mockPets, mockSchedule, mockWeights, mockVaccinations, mockReminders } from "./mockData";
import type { PetDTO, ScheduleItemDTO, WeightPointDTO, VaccinationDTO, ReminderDTO } from "./types";

/**
 * ============================================================
 *  PAWMINDER API INTEGRATION MAP
 * ============================================================
 *  All Spring Boot endpoints are called from here. Flip
 *  USE_MOCK=false in apiClient.ts and set VITE_API_BASE_URL
 *  in .env to switch from mocks to the live backend.
 *
 *  Endpoint reference (matches pawminder-backend.zip):
 *    GET    /pets                          -> listPets()
 *    GET    /pets/{id}                     -> getPet()
 *    POST   /pets                          -> createPet()
 *    PUT    /pets/{id}                     -> updatePet()
 *    DELETE /pets/{id}                     -> deletePet()
 *    GET    /schedule/today                -> getSchedule()
 *    PATCH  /schedule/{id}                 -> toggleScheduleItem()
 *    POST   /pets/{petId}/meals            -> logMeal()
 *    POST   /pets/{petId}/weights          -> logWeight()
 *    GET    /pets/{petId}/weights          -> getWeights()
 *    POST   /pets/{petId}/notes            -> addNote()
 *    GET    /pets/{petId}/vaccinations     -> getVaccinations()
 *    GET    /reminders                     -> getReminders()
 *    POST   /reminders                     -> createReminder()
 *    POST   /uploads (multipart "file")    -> uploadFile()  (Cloudinary)
 * ============================================================
 */

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const petService = {
  // ---------- Pets ----------
  async listPets(): Promise<PetDTO[]> {
    if (USE_MOCK) { await delay(200); return mockPets; }
    return (await apiClient.get<PetDTO[]>("/pets")).data;
  },
  async getPet(id: string): Promise<PetDTO | undefined> {
    if (USE_MOCK) { await delay(150); return mockPets.find((p) => p.id === id); }
    return (await apiClient.get<PetDTO>(`/pets/${id}`)).data;
  },
  async createPet(payload: Partial<PetDTO>): Promise<PetDTO> {
    if (USE_MOCK) { await delay(200); return { ...(payload as PetDTO), id: String(Date.now()) }; }
    return (await apiClient.post<PetDTO>("/pets", payload)).data;
  },
  async updatePet(id: string, payload: Partial<PetDTO>): Promise<PetDTO> {
    if (USE_MOCK) { await delay(200); return { ...(mockPets[0]), ...payload, id }; }
    return (await apiClient.put<PetDTO>(`/pets/${id}`, payload)).data;
  },
  async deletePet(id: string): Promise<void> {
    if (USE_MOCK) { await delay(200); return; }
    await apiClient.delete(`/pets/${id}`);
  },

  // ---------- Schedule ----------
  async getSchedule(): Promise<ScheduleItemDTO[]> {
    if (USE_MOCK) { await delay(200); return mockSchedule; }
    return (await apiClient.get<ScheduleItemDTO[]>("/schedule/today")).data;
  },
  async toggleScheduleItem(id: string, done: boolean): Promise<void> {
    if (USE_MOCK) { await delay(100); return; }
    await apiClient.patch(`/schedule/${id}`, { done });
  },

  // ---------- Quick-action logs ----------
  async logMeal(petId: string, note?: string): Promise<void> {
    if (USE_MOCK) { await delay(150); return; }
    await apiClient.post(`/pets/${petId}/meals`, { note, at: new Date().toISOString() });
  },
  async logWeight(petId: string, weightLbs: number): Promise<WeightPointDTO> {
    if (USE_MOCK) { await delay(150); return { month: "May", weight: weightLbs }; }
    return (await apiClient.post<WeightPointDTO>(`/pets/${petId}/weights`, { weightLbs })).data;
  },
  async addNote(petId: string, text: string): Promise<void> {
    if (USE_MOCK) { await delay(150); return; }
    await apiClient.post(`/pets/${petId}/notes`, { text });
  },

  // ---------- Health ----------
  async getWeights(petId: string): Promise<WeightPointDTO[]> {
    if (USE_MOCK) { await delay(150); return mockWeights; }
    return (await apiClient.get<WeightPointDTO[]>(`/pets/${petId}/weights`)).data;
  },
  async getVaccinations(petId: string): Promise<VaccinationDTO[]> {
    if (USE_MOCK) { await delay(150); return mockVaccinations; }
    return (await apiClient.get<VaccinationDTO[]>(`/pets/${petId}/vaccinations`)).data;
  },

  // ---------- Reminders ----------
  async getReminders(): Promise<ReminderDTO[]> {
    if (USE_MOCK) { await delay(150); return mockReminders; }
    return (await apiClient.get<ReminderDTO[]>("/reminders")).data;
  },
  async createReminder(payload: Omit<ReminderDTO, "id">): Promise<ReminderDTO> {
    if (USE_MOCK) { await delay(150); return { ...payload, id: String(Date.now()) }; }
    return (await apiClient.post<ReminderDTO>("/reminders", payload)).data;
  },

  // ---------- File upload (Cloudinary via Spring Boot) ----------
  async uploadFile(file: File): Promise<{ url: string }> {
    if (USE_MOCK) { await delay(300); return { url: URL.createObjectURL(file) }; }
    const form = new FormData();
    form.append("file", file);
    return (await apiClient.post<{ url: string }>("/uploads", form, {
      headers: { "Content-Type": "multipart/form-data" },
    })).data;
  },

  async requestPasswordReset(email: string): Promise<void> {
    if (USE_MOCK) { await delay(200); return; }
    await apiClient.post("/auth/forgot-password", { email });
  },
};
