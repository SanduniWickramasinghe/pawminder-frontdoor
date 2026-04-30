import { Home, Activity, Calendar, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  { to: "/dashboard", label: "Home",     icon: Home },
  { to: "/health",    label: "Health",   icon: Activity },
  { to: "/schedule",  label: "Schedule", icon: Calendar },
  { to: "/profile",   label: "Profile",  icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-50">
      <ul className="flex justify-around items-center px-2 py-2 pb-3">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <li key={to}>
              <NavLink
                to={to}
                className="flex flex-col items-center gap-1 px-4 py-1.5 transition-colors"
              >
                <Icon
                  size={22}
                  className={active ? "text-primary" : "text-muted-foreground"}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span
                  className={`text-xs font-bold ${active ? "text-primary" : "text-muted-foreground"}`}
                >
                  {label}
                </span>
                {active && <span className="h-1 w-1 rounded-full bg-primary" />}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
