import { apiClient, USE_MOCK } from "./apiClient";
import { mockPets, mockSchedule, mockWeights, mockVaccinations, mockReminders } from "./mockData";
import type { PetDTO, ScheduleItemDTO, WeightPointDTO, VaccinationDTO, ReminderDTO } from "./types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const petService = {
  async listPets(): Promise<PetDTO[]> {
    if (USE_MOCK) { await delay(200); return mockPets; }
    return (await apiClient.get<PetDTO[]>("/pets")).data;
  },
  async getPet(id: string): Promise<PetDTO | undefined> {
    if (USE_MOCK) { await delay(150); return mockPets.find((p) => p.id === id); }
    return (await apiClient.get<PetDTO>(`/pets/${id}`)).data;
  },
  async getSchedule(): Promise<ScheduleItemDTO[]> {
    if (USE_MOCK) { await delay(200); return mockSchedule; }
    return (await apiClient.get<ScheduleItemDTO[]>("/schedule/today")).data;
  },
  async toggleScheduleItem(id: string, done: boolean): Promise<void> {
    if (USE_MOCK) { await delay(100); return; }
    await apiClient.patch(`/schedule/${id}`, { done });
  },
  async getWeights(petId: string): Promise<WeightPointDTO[]> {
    if (USE_MOCK) { await delay(150); return mockWeights; }
    return (await apiClient.get<WeightPointDTO[]>(`/pets/${petId}/weights`)).data;
  },
  async getVaccinations(petId: string): Promise<VaccinationDTO[]> {
    if (USE_MOCK) { await delay(150); return mockVaccinations; }
    return (await apiClient.get<VaccinationDTO[]>(`/pets/${petId}/vaccinations`)).data;
  },
  async getReminders(): Promise<ReminderDTO[]> {
    if (USE_MOCK) { await delay(150); return mockReminders; }
    return (await apiClient.get<ReminderDTO[]>("/reminders")).data;
  },
};
