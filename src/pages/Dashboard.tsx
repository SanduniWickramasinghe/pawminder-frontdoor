import { useEffect, useState } from "react";
import { Utensils, Scale, FileText, Camera } from "lucide-react";
import { PetSwitcher } from "@/components/PetSwitcher";
import { ScheduleCard } from "@/components/ScheduleCard";
import { QuickAction } from "@/components/QuickAction";
import { BottomNav } from "@/components/BottomNav";
import { petService } from "@/services/petService";
import type { PetDTO, ScheduleItemDTO } from "@/services/types";

export default function Dashboard() {
  const [pets, setPets] = useState<PetDTO[]>([]);
  const [activePet, setActivePet] = useState<string>("1");
  const [schedule, setSchedule] = useState<ScheduleItemDTO[]>([]);

  useEffect(() => {
    petService.listPets().then(setPets);
    petService.getSchedule().then(setSchedule);
  }, []);

  const toggleItem = async (id: string, done: boolean) => {
    setSchedule((prev) => prev.map((it) => (it.id === id ? { ...it, done } : it)));
    await petService.toggleScheduleItem(id, done);
  };

  return (
    <main className="app-shell animate-fade-in">
      <header className="gradient-primary rounded-b-3xl px-6 pt-10 pb-16 text-primary-foreground">
        <h1 className="text-3xl font-extrabold">PawMinder</h1>
        <p className="mt-1 text-sm opacity-95">Welcome back! 🐾</p>
      </header>

      <PetSwitcher pets={pets} activeId={activePet} onSelect={setActivePet} />

      <section className="px-6 mt-7">
        <h2 className="text-xl font-extrabold text-foreground mb-3">Today's Schedule</h2>
        <div className="space-y-3">
          {schedule.map((item) => (
            <ScheduleCard key={item.id} item={item} onToggle={toggleItem} />
          ))}
        </div>
      </section>

      <section className="px-6 mt-7">
        <h2 className="text-xl font-extrabold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <QuickAction label="Log Meal"   Icon={Utensils} variant="health" />
          <QuickAction label="Log Weight" Icon={Scale}    variant="info" />
          <QuickAction label="Add Note"   Icon={FileText} variant="schedule" />
          <QuickAction label="Add Photo"  Icon={Camera}   variant="pink" />
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
