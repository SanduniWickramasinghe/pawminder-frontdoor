import { PawPrint } from "lucide-react";

interface PawLogoProps {
  size?: "sm" | "md" | "lg";
}

export function PawLogo({ size = "md" }: PawLogoProps) {
  const dims = size === "lg" ? "h-20 w-20" : size === "sm" ? "h-10 w-10" : "h-14 w-14";
  const icon = size === "lg" ? 44 : size === "sm" ? 22 : 30;
  return (
    <div className={`${dims} rounded-2xl gradient-primary shadow-elevated flex items-center justify-center`}>
      <PawPrint size={icon} className="text-primary-foreground" strokeWidth={2.5} />
    </div>
  );
}
