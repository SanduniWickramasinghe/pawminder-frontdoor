import { useEffect, useState } from "react";
import { Syringe } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { ScreenHeader } from "@/components/ScreenHeader";
import { BottomNav } from "@/components/BottomNav";
import { petService } from "@/services/petService";
import type { PetDTO, VaccinationDTO, WeightPointDTO } from "@/services/types";

export default function Health() {
  const [pet, setPet] = useState<PetDTO | null>(null);
  const [weights, setWeights] = useState<WeightPointDTO[]>([]);
  const [vaccs, setVaccs] = useState<VaccinationDTO[]>([]);

  useEffect(() => {
    petService.listPets().then((pets) => {
      const active = pets[0] ?? null;
      setPet(active);
      if (!active) return;
      petService.getWeights(active.id).then(setWeights);
      petService.getVaccinations(active.id).then(setVaccs);
    });
  }, []);

  const current = weights.at(-1)?.weight ?? 0;

  return (
    <main className="app-shell animate-fade-in">
      <ScreenHeader
        title="Health Records"
        subtitle={pet ? `${pet.name}'s medical history` : "Add a pet to track health"}
        variant="health"
      />

      <section className="px-4 -mt-6">
        <div className="bg-card rounded-2xl shadow-card p-5">
          <h2 className="text-lg font-extrabold text-foreground mb-3">Weight Tracker</h2>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weights} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis domain={[40, 50]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--health))"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "hsl(var(--card))", stroke: "hsl(var(--health))", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">Current: {current} lbs</p>
        </div>
      </section>

      <section className="px-4 mt-5">
        <div className="bg-card rounded-2xl shadow-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Syringe size={20} className="text-foreground" />
            <h2 className="text-lg font-extrabold text-foreground">Vaccination Timeline</h2>
          </div>
          <ol className="relative ml-3 border-l-2 border-border space-y-5">
            {vaccs.map((v) => (
              <li key={v.id} className="pl-5 relative">
                <span
                  className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full ${
                    v.status === "completed"
                      ? "bg-health"
                      : v.status === "upcoming"
                      ? "bg-primary"
                      : "bg-destructive"
                  }`}
                />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-extrabold text-foreground">{v.name}</p>
                    {v.completedDate && (
                      <p className="text-sm text-muted-foreground">Completed: {v.completedDate}</p>
                    )}
                    {v.nextDate && (
                      <p className="text-xs text-muted-foreground">Next: {v.nextDate}</p>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      v.status === "completed"
                        ? "bg-health/15 text-health"
                        : v.status === "upcoming"
                        ? "bg-primary/15 text-primary"
                        : "bg-destructive/15 text-destructive"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
