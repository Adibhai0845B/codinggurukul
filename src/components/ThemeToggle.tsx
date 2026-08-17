import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle({ showLabel = false }: { showLabel?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return <button type="button" onClick={toggleTheme} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} className={`flex h-10 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white ${showLabel ? "w-full" : "w-10"}`}>
    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    {showLabel && <span>{isDark ? "Light mode" : "Dark mode"}</span>}
  </button>;
}
