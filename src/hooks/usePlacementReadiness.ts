import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ConfidenceLevel = 0 | 1 | 2 | 3;

interface PlacementReadinessState {
  checklistIds: string[];
  confidence: Record<string, ConfidenceLevel>;
  interviewAnswers: Record<string, string>;
  toggleChecklist: (id: string) => void;
  setConfidence: (topic: string, level: ConfidenceLevel) => void;
  saveInterviewAnswer: (question: string, answer: string) => void;
}

export const usePlacementReadiness = create<PlacementReadinessState>()(
  persist(
    (set) => ({
      checklistIds: [],
      confidence: {},
      interviewAnswers: {},
      toggleChecklist: (id) => set((state) => ({
        checklistIds: state.checklistIds.includes(id)
          ? state.checklistIds.filter((item) => item !== id)
          : [...state.checklistIds, id],
      })),
      setConfidence: (topic, level) => set((state) => ({
        confidence: { ...state.confidence, [topic]: level },
      })),
      saveInterviewAnswer: (question, answer) => set((state) => ({
        interviewAnswers: { ...state.interviewAnswers, [question]: answer },
      })),
    }),
    { name: "coding-gurukul-placement-readiness" },
  ),
);
