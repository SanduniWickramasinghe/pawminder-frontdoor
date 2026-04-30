import type { PetDTO, ScheduleItemDTO, WeightPointDTO, VaccinationDTO, ReminderDTO } from "./types";

export const mockPets: PetDTO[] = [
  { id: "1", name: "Max", species: "Dog", breed: "Golden Retriever", ageYears: 4, weightLbs: 48.5, microchip: "US-123456789", insurance: "PetPlan Premium", policyNumber: "PP-2024-789456", avatarUrl: "" },
  { id: "2", name: "Luna", species: "Dog", breed: "Labrador",        ageYears: 3, weightLbs: 42.0, microchip: "US-987654321", insurance: "PetPlan Basic",   policyNumber: "PP-2024-321789", avatarUrl: "" },
  { id: "3", name: "Charlie", species: "Dog", breed: "Beagle",       ageYears: 5, weightLbs: 30.2, microchip: "US-555444333", insurance: "PetPlan Premium", policyNumber: "PP-2024-555444", avatarUrl: "" },
];

export const mockSchedule: ScheduleItemDTO[] = [
  { id: "s1", time: "8:00 AM",  title: "Morning Meal - Max",   type: "meal",       petId: "1",   done: false },
  { id: "s2", time: "10:30 AM", title: "Medication - Luna",    type: "medication", petId: "2",   done: false },
  { id: "s3", time: "2:00 PM",  title: "Walk - Max",           type: "walk",       petId: "1",   done: false },
  { id: "s4", time: "6:00 PM",  title: "Evening Meal - All",   type: "meal",       petId: "all", done: false },
];

export const mockWeights: WeightPointDTO[] = [
  { month: "Jan", weight: 45 },
  { month: "Feb", weight: 46 },
  { month: "Mar", weight: 47.2 },
  { month: "Apr", weight: 48 },
  { month: "May", weight: 48.5 },
];

export const mockVaccinations: VaccinationDTO[] = [
  { id: "v1", name: "Rabies",     status: "completed", completedDate: "Apr 15, 2026", nextDate: "Apr 2027" },
  { id: "v2", name: "Bordetella", status: "completed", completedDate: "Jan 10, 2026", nextDate: "Jan 2027" },
  { id: "v3", name: "DHPP",       status: "upcoming",  nextDate: "Jun 2026" },
];

export const mockReminders: ReminderDTO[] = [
  { id: "r1", title: "Flea & Tick Medication", date: "2026-05-01", time: "9:00 AM" },
  { id: "r2", title: "Vet Checkup - Max",      date: "2026-05-08", time: "11:00 AM" },
  { id: "r3", title: "Grooming - Luna",        date: "2026-05-15", time: "2:00 PM" },
];
