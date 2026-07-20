import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ContestLanguage } from "@/lib/codeExecution";

export type ContestSubmission = {
  id: string;
  contestId: string;
  problemId: string;
  username: string;
  language: ContestLanguage;
  passed: number;
  total: number;
  score: number;
  verdict: "Accepted" | "Wrong Answer" | "Error";
  submittedAt: string;
};

export type ContestResult = {
  id: string;
  contestId: string;
  username: string;
  score: number;
  maximumScore: number;
  solvedProblems: number;
  totalProblems: number;
  endedAt: string;
};

type SubmissionState = {
  submissions: ContestSubmission[];
  results: ContestResult[];
  addSubmission: (submission: Omit<ContestSubmission, "id" | "submittedAt">) => void;
  saveResult: (result: Omit<ContestResult, "id" | "endedAt">) => void;
};

export const useContestSubmissions = create<SubmissionState>()(
  persist(
    (set) => ({
      submissions: [],
      results: [],
      addSubmission: (submission) => set((state) => ({
        submissions: [{ ...submission, id: crypto.randomUUID(), submittedAt: new Date().toISOString() }, ...state.submissions],
      })),
      saveResult: (result) => set((state) => ({
        results: [
          { ...result, id: crypto.randomUUID(), endedAt: new Date().toISOString() },
          ...state.results.filter((item) => !(item.contestId === result.contestId && item.username === result.username)),
        ],
      })),
    }),
    { name: "coding-gurukul-contest-submissions" },
  ),
);
