// src/lib/roadmapGraph.ts
import { getRoadmapGraphData, roadmapEdges } from "@/lib/roadmap";

export const generateGraphData = (completedIds: string[]) => {
  const allTopics = getRoadmapGraphData(completedIds);

  const nodes = allTopics.map((topic) => ({
    id: topic.id,
    type: 'custom', // CRITICAL: This tells ReactFlow to use our custom UI
    data: { 
      label: topic.label,
      completed: topic.completed,
      total: topic.total 
    },
    position: topic.position,
  }));

  return { nodes, edges: roadmapEdges };
};