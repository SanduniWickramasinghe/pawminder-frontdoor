// DTOs shaped to match Spring Boot / MongoDB documents.

export interface AuthRequestDTO {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpRequestDTO {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponseDTO {
  token: string;
  refreshToken?: string;
  user: UserDTO;
}

export interface UserDTO {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

export interface PetDTO {
  id: string;
  name: string;
  species?: string;
  breed?: string;
  ageYears?: number;
  weightLbs?: number;
  microchip?: string;
  insurance?: string;
  policyNumber?: string;
  avatarUrl?: string;
}

export interface PetCreateDTO {
  name: string;
  species?: string;
  breed?: string;
  ageYears?: number;
  weightLbs?: number;
  microchip?: string;
}

export interface ScheduleItemDTO {
  id: string;
  time: string;          // "08:00"
  title: string;
  type: "meal" | "medication" | "walk" | "other";
  petId: string | "all";
  done: boolean;
}

export interface WeightPointDTO {
  month: string;
  weight: number;
}

export interface VaccinationDTO {
  id: string;
  name: string;
  status: "completed" | "upcoming" | "overdue";
  completedDate?: string;
  nextDate?: string;
}

export interface ReminderDTO {
  id: string;
  title: string;
  date: string;   // ISO
  time: string;   // "09:00"
}
