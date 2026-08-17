import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";
type ThemeState = { theme: Theme; setTheme: (theme: Theme) => void; toggleTheme: () => void };

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export const useTheme = create<ThemeState>()(persist((set, get) => ({
  theme: "dark",
  setTheme: (theme) => { applyTheme(theme); set({ theme }); },
  toggleTheme: () => {
    const theme = get().theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    set({ theme });
  },
}), { name: "coding-gurukul-theme", onRehydrateStorage: () => (state) => applyTheme(state?.theme || "dark") }));
