import { ReactNode } from "react";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  variant?: "primary" | "health" | "schedule";
  children?: ReactNode;
}

export function ScreenHeader({ title, subtitle, variant = "primary", children }: ScreenHeaderProps) {
  const bg =
    variant === "health" ? "gradient-health" :
    variant === "schedule" ? "gradient-schedule" :
    "gradient-primary";
  return (
    <header className={`${bg} rounded-b-3xl px-6 pt-10 pb-12 text-primary-foreground`}>
      <h1 className="text-3xl font-extrabold">{title}</h1>
      {subtitle && <p className="mt-1 text-sm opacity-95">{subtitle}</p>}
      {children}
    </header>
  );
}
