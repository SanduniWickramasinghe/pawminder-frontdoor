import petAvatar from "@/assets/pet-avatar.png";
import type { PetDTO } from "@/services/types";
import { Plus } from "lucide-react";

interface PetSwitcherProps {
  pets: PetDTO[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onAddPet: () => void; // Defined in interface
}

// FIX 1: Added onAddPet to the destructured props here
export function PetSwitcher({ pets, activeId, onSelect, onAddPet }: PetSwitcherProps) {
  return (
    <div className="bg-card rounded-2xl shadow-card p-4 -mt-8 mx-4 relative z-10">
      <p className="text-sm font-bold text-foreground mb-3">Your Pets</p>
      
      {/* FIX 2: Move the button INSIDE this flex container so it stays in line */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 snap-x items-start">
        {pets.map((pet) => {
          const active = pet.id === activeId;
          return (
            <button
              key={pet.id}
              onClick={() => onSelect?.(pet.id)}
              className="flex flex-col items-center gap-2 snap-start shrink-0 group"
            >
              <div
                className={`h-16 w-16 rounded-full overflow-hidden bg-accent flex items-center justify-center ring-2 transition-all ${
                  active ? "ring-primary scale-105" : "ring-transparent group-hover:ring-primary/30"
                }`}
              >
                <img src={petAvatar} alt={pet.name} className="h-full w-full object-cover" />
              </div>
              <span className={`text-sm font-bold ${active ? "text-primary" : "text-foreground"}`}>
                {pet.name}
              </span>
            </button>
          );
        })}

        {/* The Add New Pet Button is now part of the horizontal list */}
        <button
          onClick={onAddPet}
          className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/50 text-muted-foreground hover:bg-accent transition-colors mt-0"
          aria-label="Add new pet"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}