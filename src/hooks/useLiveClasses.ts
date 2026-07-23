import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LiveClass = {
  id: string;
  title: string;
  topic: string;
  instructor: string;
  startTime: string;
  durationMinutes: number;
  meetUrl: string;
  createdAt: string;
};

type LiveClassState = {
  liveClasses: LiveClass[];
  addLiveClass: (session: Omit<LiveClass, "id" | "createdAt">) => void;
  deleteLiveClass: (id: string) => void;
};

export const useLiveClasses = create<LiveClassState>()(
  persist(
    (set) => ({
      liveClasses: [],
      addLiveClass: (session) => set((state) => ({
        liveClasses: [...state.liveClasses, { ...session, id: crypto.randomUUID(), createdAt: new Date().toISOString() }],
      })),
      deleteLiveClass: (id) => set((state) => ({
        liveClasses: state.liveClasses.filter((session) => session.id !== id),
      })),
    }),
    { name: "coding-gurukul-live-classes" },
  ),
);
