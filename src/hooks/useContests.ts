import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ContestProblem = {
  id: string;
  title: string;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  points: number;
  testCases: ContestTestCase[];
};

export type ContestTestCase = {
  id: string;
  input: string;
  expectedOutput: string;
};

export type ProgrammingContest = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  durationMinutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  problems: ContestProblem[];
  createdAt: string;
};

type ContestState = {
  contests: ProgrammingContest[];
  addContest: (contest: Omit<ProgrammingContest, "id" | "createdAt">) => void;
  updateContest: (id: string, contest: Omit<ProgrammingContest, "id" | "createdAt">) => void;
  deleteContest: (id: string) => void;
};

export const useContests = create<ContestState>()(
  persist(
    (set) => ({
      contests: [],
      addContest: (contest) =>
        set((state) => ({
          contests: [
            ...state.contests,
            {
              ...contest,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              problems: contest.problems.map((problem) => ({
                ...problem,
                id: crypto.randomUUID(),
                testCases: (problem.testCases || []).map((testCase) => ({
                  ...testCase,
                  id: crypto.randomUUID(),
                })),
              })),
            },
          ],
        })),
      updateContest: (id, contest) =>
        set((state) => ({
          contests: state.contests.map((currentContest) =>
            currentContest.id === id
              ? {
                  ...currentContest,
                  ...contest,
                  problems: contest.problems.map((problem) => ({
                    ...problem,
                    id: problem.id || crypto.randomUUID(),
                    testCases: (problem.testCases || []).map((testCase) => ({
                      ...testCase,
                      id: testCase.id || crypto.randomUUID(),
                    })),
                  })),
                }
              : currentContest,
          ),
        })),
      deleteContest: (id) =>
        set((state) => ({ contests: state.contests.filter((contest) => contest.id !== id) })),
    }),
    { name: "coding-gurukul-contests" },
  ),
);
