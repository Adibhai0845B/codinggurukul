import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dsaQuestions } from "@/data/dsaQuestions";
import { useAuth } from "./useAuth";

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
        set((state) => {
          // If the id belongs to the DSA sheet, require a login
          const isDsa = dsaQuestions.some((q) => q.id === id);
          const auth = useAuth.getState();
          if (isDsa && !auth.isLoggedIn) {
            // Inform the user — UI can be improved later
            if (typeof window !== "undefined") {
              window.alert("Please login to mark DSA problems as completed.");
            }
            return state;
          }

          return {
            completedIds: state.completedIds.includes(id)
              ? state.completedIds.filter((i) => i !== id)
              : [...state.completedIds, id],
          } as Partial<ProgressState> as any;
        }),

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
