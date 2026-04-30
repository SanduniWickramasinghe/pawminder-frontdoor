import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import petAvatar from "@/assets/pet-avatar.png";
import { ScreenHeader } from "@/components/ScreenHeader";
import { BottomNav } from "@/components/BottomNav";
import { petService } from "@/services/petService";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import type { PetDTO } from "@/services/types";

export default function Profile() {
  const navigate = useNavigate();
  const [pet, setPet] = useState<PetDTO | undefined>();

  useEffect(() => { petService.getPet("1").then(setPet); }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  if (!pet) return null;

  const rows: [string, string | React.ReactNode][] = [
    ["Age", `${pet.ageYears} years`],
    ["Weight", `${pet.weightLbs} lbs`],
    ["Microchip", pet.microchip],
    ["Insurance", <span className="text-primary font-bold" key="ins">{pet.insurance}</span>],
    ["Policy #", <span className="text-primary font-bold" key="pol">{pet.policyNumber}</span>],
  ];

  return (
    <main className="app-shell animate-fade-in">
      <ScreenHeader title="Pet Profile" subtitle="Essential information" variant="primary" />

      <section className="px-4 -mt-6">
        <div className="bg-card rounded-2xl shadow-card p-6 flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-accent overflow-hidden flex items-center justify-center -mt-14 ring-4 ring-card">
            <img src={petAvatar} alt={pet.name} className="h-full w-full object-cover" />
          </div>
          <h2 className="mt-3 text-2xl font-extrabold text-foreground">{pet.name}</h2>
          <p className="text-sm text-muted-foreground">{pet.breed}</p>
        </div>
      </section>

      <section className="px-4 mt-4">
        <div className="bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-lg font-extrabold text-foreground mb-3">Essential Info</h3>
          <dl>
            {rows.map(([label, value], i) => (
              <div
                key={String(label)}
                className={`flex items-center justify-between py-3 ${i < rows.length - 1 ? "border-b border-border" : ""}`}
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm font-bold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-4 mt-4">
        <button
          onClick={handleLogout}
          className="w-full bg-card rounded-2xl shadow-card p-4 flex items-center justify-center gap-2 font-bold text-destructive"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </section>

      <BottomNav />
    </main>
  );
}
