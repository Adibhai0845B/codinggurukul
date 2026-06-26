// components/Roadmap.tsx
import { getRoadmapData } from "@/lib/roadmap";
import { dsaQuestions } from "@/data/dsaQuestions";

export const Roadmap = () => {
  const roadmap = getRoadmapData(dsaQuestions);

  return (
    <div className="relative pl-8">
      {/* The vertical connector line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

      {Object.entries(roadmap).map(([topic, subTopics], topicIndex) => (
        <div key={topic} className="mb-12 relative">
          {/* Topic Node */}
          <div className="absolute -left-10 mt-2 h-4 w-4 rounded-full bg-blue-600 border-4 border-white dark:border-background" />
          <h2 className="text-2xl font-bold mb-4">{topic}</h2>
          
          <div className="grid gap-4">
            {Object.entries(subTopics).map(([subTopic, questions]) => (
              <div key={subTopic} className="bg-card p-4 rounded-lg border">
                <h3 className="font-semibold text-primary">{subTopic}</h3>
                <div className="flex gap-2 mt-2">
                  {questions.map(q => (
                    <span key={q.id} className="text-sm bg-muted px-2 py-1 rounded">
                      {q.title}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};