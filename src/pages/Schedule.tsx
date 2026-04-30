import { useEffect, useMemo, useState } from "react";
import { Calendar as CalendarIcon, Bell } from "lucide-react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { BottomNav } from "@/components/BottomNav";
import { petService } from "@/services/petService";
import type { ReminderDTO } from "@/services/types";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Schedule() {
  const [tab, setTab] = useState<"calendar" | "reminders">("calendar");
  const [reminders, setReminders] = useState<ReminderDTO[]>([]);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    petService.getReminders().then(setReminders);
  }, []);

  // May 2026 starts on Friday
  const grid = useMemo(() => {
    const offset = 5; // Fri
    const days = 31;
    const cells: (number | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= days; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, []);

  const eventDays = new Set([1, 8, 15]);

  return (
    <main className="app-shell animate-fade-in">
      <ScreenHeader title="Schedule" subtitle="Manage reminders & events" variant="schedule" />

      <section className="px-4 -mt-6">
        <div className="bg-card rounded-2xl shadow-card p-2 grid grid-cols-2 gap-2">
          <TabButton active={tab === "calendar"}  onClick={() => setTab("calendar")}  Icon={CalendarIcon} label="Calendar" />
          <TabButton active={tab === "reminders"} onClick={() => setTab("reminders")} Icon={Bell}         label="Reminders" />
        </div>
      </section>

      {tab === "calendar" && (
        <>
          <section className="px-4 mt-4">
            <div className="bg-card rounded-2xl shadow-card p-4">
              <div className="grid grid-cols-7 text-center text-xs font-bold text-muted-foreground mb-2">
                {DAYS.map((d) => <div key={d} className="py-2">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {grid.map((d, i) => {
                  if (d === null) return <div key={i} />;
                  const isEvent = eventDays.has(d);
                  const isSelected = d === selected;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelected(d)}
                      className={`h-9 w-9 mx-auto rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-schedule text-schedule-foreground"
                          : isEvent
                          ? "bg-schedule/15 text-schedule"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 mt-5">
            <h2 className="text-lg font-extrabold text-foreground mb-3">Upcoming Events</h2>
            <div className="space-y-3">
              {reminders.map((r) => {
                const day = new Date(r.date).getDate();
                return (
                  <div key={r.id} className="bg-card rounded-2xl shadow-card p-3 flex items-center gap-3">
                    <div className="bg-schedule/15 text-schedule rounded-xl w-12 h-12 flex flex-col items-center justify-center font-extrabold leading-tight">
                      <span className="text-[10px] uppercase">May</span>
                      <span className="text-base">{day}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {tab === "reminders" && (
        <section className="px-4 mt-4 space-y-3">
          {reminders.map((r) => (
            <div key={r.id} className="bg-card rounded-2xl shadow-card p-4 flex items-center gap-3">
              <Bell className="text-schedule" />
              <div className="flex-1">
                <p className="font-bold text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.date} • {r.time}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      <BottomNav />
    </main>
  );
}

function TabButton({
  active, onClick, Icon, label,
}: { active: boolean; onClick: () => void; Icon: any; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`py-3 rounded-xl flex flex-col items-center gap-1 font-bold transition-colors ${
        active ? "gradient-schedule text-schedule-foreground shadow-card" : "text-muted-foreground"
      }`}
    >
      <Icon size={20} />
      <span className="text-sm">{label}</span>
    </button>
  );
}
