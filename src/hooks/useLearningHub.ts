import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LearningHubState {
  dailyGoal: number;
  activeDays: string[];
  revisedIds: string[];
  setDailyGoal: (goal: number) => void;
  recordActivity: (date?: string) => void;
  toggleRevised: (id: string) => void;
}

export function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateStreak(activeDays: string[], today = new Date()) {
  const days = new Set(activeDays);
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!days.has(localDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (days.has(localDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export const useLearningHub = create<LearningHubState>()(
  persist(
    (set) => ({
      dailyGoal: 3,
      activeDays: [],
      revisedIds: [],
      setDailyGoal: (dailyGoal) => set({ dailyGoal }),
      recordActivity: (date = localDateKey()) =>
        set((state) => ({
          activeDays: state.activeDays.includes(date) ? state.activeDays : [...state.activeDays, date],
        })),
      toggleRevised: (id) =>
        set((state) => ({
          revisedIds: state.revisedIds.includes(id)
            ? state.revisedIds.filter((item) => item !== id)
            : [...state.revisedIds, id],
        })),
    }),
    { name: "coding-gurukul-learning-hub" },
  ),
);
