import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedIds: string[];
  bookmarkedIds: string[];
  notes: Record<string, string>;
  toggleComplete: (id: string) => void;
  toggleBookmark: (id: string) => void;
  saveNote: (id: string, note: string) => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      completedIds: [],
      bookmarkedIds: [],
      notes: {},

      toggleComplete: (id) =>
        set((state) => ({
          completedIds: state.completedIds.includes(id)
            ? state.completedIds.filter((i) => i !== id)
            : [...state.completedIds, id],
        })),

      toggleBookmark: (id) =>
        set((state) => ({
          bookmarkedIds: state.bookmarkedIds.includes(id)
            ? state.bookmarkedIds.filter((i) => i !== id)
            : [...state.bookmarkedIds, id],
        })),

      saveNote: (id, note) =>
        set((state) => ({
          notes: {
            ...state.notes,
            [id]: note,
          },
        })),
    }),
    {
      name: "codeshala-progress-storage",
    }
  )
);
