import { LucideIcon } from "lucide-react";

interface QuickActionProps {
  label: string;
  Icon: LucideIcon;
  variant: "health" | "info" | "schedule" | "pink";
  onClick?: () => void;
}

const map = {
  health: "gradient-health",
  info: "gradient-info",
  schedule: "gradient-schedule",
  pink: "gradient-pink",
};

export function QuickAction({ label, Icon, variant, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className={`${map[variant]} rounded-2xl p-5 flex flex-col items-center justify-center gap-2 shadow-card hover:scale-[1.02] transition-transform`}
    >
      <div className="h-10 w-10 rounded-xl bg-background/25 flex items-center justify-center">
        <Icon size={22} className="text-primary-foreground" />
      </div>
      <span className="text-sm font-extrabold text-primary-foreground">{label}</span>
    </button>
  );
}
