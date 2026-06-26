// utils/roadmap.ts
import { DSAQuestion } from "@/data/dsaQuestions";
export const getRoadmapData = (questions: DSAQuestion[]) => {
  return questions.reduce((acc, q) => {
    if (!acc[q.topic]) {
      acc[q.topic] = {};
    }
    if (!acc[q.topic][q.subTopic]) {
      acc[q.topic][q.subTopic] = [];
    }
    acc[q.topic][q.subTopic].push(q);
    return acc;
  }, {} as Record<string, Record<string, DSAQuestion[]>>);
};