import { Check, Utensils, Pill, Footprints } from "lucide-react";
import type { ScheduleItemDTO } from "@/services/types";

interface Props {
  item: ScheduleItemDTO;
  onToggle?: (id: string, done: boolean) => void;
}

const iconFor = (type: ScheduleItemDTO["type"]) => {
  if (type === "medication") return { Icon: Pill,       cls: "gradient-pink" };
  if (type === "walk")       return { Icon: Footprints, cls: "gradient-info" };
  return                            { Icon: Utensils,   cls: "gradient-health" };
};

export function ScheduleCard({ item, onToggle }: Props) {
  const { Icon, cls } = iconFor(item.type);
  return (
    <div className="flex items-center gap-3 bg-card rounded-2xl shadow-card p-3">
      <div className={`h-12 w-12 rounded-xl ${cls} flex items-center justify-center shrink-0`}>
        <Icon size={22} className="text-primary-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-semibold">{item.time}</p>
        <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
      </div>
      <button
        aria-label={item.done ? "Mark as not done" : "Mark as done"}
        onClick={() => onToggle?.(item.id, !item.done)}
        className={`h-7 w-7 rounded-md border-2 flex items-center justify-center transition-colors ${
          item.done
            ? "bg-primary border-primary text-primary-foreground"
            : "bg-foreground/90 border-foreground/90 text-background"
        }`}
      >
        {item.done && <Check size={16} strokeWidth={3} />}
      </button>
    </div>
  );
}
