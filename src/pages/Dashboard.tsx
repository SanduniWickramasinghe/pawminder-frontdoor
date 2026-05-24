import { useEffect, useState } from "react";
import { Utensils, Scale, FileText, Camera, Plus } from "lucide-react";
import { PetSwitcher } from "@/components/PetSwitcher";
import { ScheduleCard } from "@/components/ScheduleCard";
import { QuickAction } from "@/components/QuickAction";
import { BottomNav } from "@/components/BottomNav";
import { petService } from "@/services/petService";
import { toast } from "sonner";
import type { PetDTO, ScheduleItemDTO } from "@/services/types";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [pets, setPets] = useState<PetDTO[]>([]);
  const [activePet, setActivePet] = useState<string>("");
  const [schedule, setSchedule] = useState<ScheduleItemDTO[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    petService.listPets().then((list) => {
      setPets(list);
      if (list.length > 0) setActivePet((prev) => prev || list[0].id);
    });
    petService.getSchedule().then(setSchedule);
  }, []);

  const handleAddPet = () => {
    navigate("/pets/new"); // This redirects the user to the new page
  };

  const toggleItem = async (id: string, done: boolean) => {
    setSchedule((prev) => prev.map((it) => (it.id === id ? { ...it, done } : it)));
    // 🔌 API: PATCH /schedule/{id}
    await petService.toggleScheduleItem(id, done);
  };

  // ---- Quick action handlers ----
  const handleLogMeal = async () => {
    try {
      await petService.logMeal(activePet);
      toast.success("Meal logged");
    } catch { toast.error("Could not log meal"); }
  };

  const handleLogWeight = async () => {
    const input = window.prompt("Enter weight in lbs");
    const value = Number(input);
    if (!input || Number.isNaN(value)) return;
    try {
      await petService.logWeight(activePet, value);
      toast.success(`Weight ${value} lbs saved`);
    } catch { toast.error("Could not save weight"); }
  };

  const handleAddNote = async () => {
    const text = window.prompt("Add a note");
    if (!text) return;
    try {
      await petService.addNote(activePet, text);
      toast.success("Note saved");
    } catch { toast.error("Could not save note"); }
  };

  const handlePhotoSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await petService.uploadFile(file);
      toast.success("Photo uploaded");
      console.log("Uploaded photo URL:", url);
    } catch { toast.error("Upload failed"); }
    finally { e.target.value = ""; }
  };

  return (
    <main className="app-shell animate-fade-in">
      <header className="gradient-primary rounded-b-3xl px-6 pt-10 pb-16 text-primary-foreground">
        <h1 className="text-3xl font-extrabold">PawMinder</h1>
        <p className="mt-1 text-sm opacity-95">Welcome back! 🐾</p>
      </header>

      {/* <PetSwitcher pets={pets} activeId={activePet} onSelect={setActivePet} /> */}
      <PetSwitcher pets={pets} activeId={activePet} onSelect={setActivePet} onAddPet={handleAddPet} />
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
          <QuickAction label="Log Meal" Icon={Utensils} variant="health" />
          <QuickAction label="Log Weight" Icon={Scale} variant="info" />
          <QuickAction label="Add Note" Icon={FileText} variant="schedule" />
          <QuickAction label="Add Photo" Icon={Camera} variant="pink" />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoSelected}
        />
      </section>

      <BottomNav />
    </main>
  );
}
