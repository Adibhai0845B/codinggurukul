import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dsaQuestions } from "@/data/dsaQuestions";
import { useAuth } from "./useAuth";

// Added the render URL for the backend API(Sir GPT pro dilwa do pls :))
const API_URL = "https://coding-gurukul-backend.onrender.com"; 

interface ProgressState {
  completedIds: string[];
  bookmarkedIds: string[];
  notes: Record<string, string>;
  setInitialData: (data: Partial<ProgressState>) => void;
  resetProgress: () => void; // resetting the cache when user logs out
  toggleComplete: (id: string) => Promise<void>;
  toggleBookmark: (id: string) => Promise<void>;
  saveNote: (id: string, note: string) => Promise<void>;
}

// Background sync function to push data to MongoDB
const syncWithBackend = async (state: ProgressState) => {
  const { token } = useAuth.getState();
  if (!token) return; // Prevent syncing if not logged in

  try {
    await fetch(`${API_URL}/api/progress/sync`, { // adjusted the endpoint (debug mai halat kharab hogaya)
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send the JWT token
      },
      body: JSON.stringify({
        completedIds: state.completedIds,
        bookmarkedIds: state.bookmarkedIds,
        notes: state.notes,
      }),
    });
  } catch (error) {
    console.error("Failed to sync progress to database:", error);
  }
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedIds: [],
      bookmarkedIds: [],
      notes: {},
      // Reset progress when the user logs out (so that the nxt stud doesn't see the prev data if same latop hai)
      resetProgress: () => set({ 
        completedIds: [], 
        bookmarkedIds: [], 
        notes: {} 
      }),
      // Used right after a successful login to load the student's history
      setInitialData: (data) => set((state) => ({ ...state, ...data })),

      toggleComplete: async (id) => {
        const isDsa = dsaQuestions.some((q) => q.id === id);
        const { isLoggedIn } = useAuth.getState();

        if (isDsa && !isLoggedIn) {
          if (typeof window !== "undefined") {
            window.alert("Please login to Coding Gurukul to track your progress.");
          }
          return;
        }

        set((state) => {
          const newCompletedIds = state.completedIds.includes(id)
            ? state.completedIds.filter((i) => i !== id)
            : [...state.completedIds, id];
          return { completedIds: newCompletedIds };
        });
        
        // Fire and forget the sync to the backend
        await syncWithBackend(get());
      },

      toggleBookmark: async (id) => {
        set((state) => {
          const newBookmarkedIds = state.bookmarkedIds.includes(id)
            ? state.bookmarkedIds.filter((i) => i !== id)
            : [...state.bookmarkedIds, id];
          return { bookmarkedIds: newBookmarkedIds };
        });
        
        await syncWithBackend(get());
      },

      saveNote: async (id, note) => {
        set((state) => ({
          notes: {
            ...state.notes,
            [id]: note,
          },
        }));
        
        await syncWithBackend(get());
      },
    }),
    {
      name: "coding-gurukul-progress-storage",
    }
  )
);