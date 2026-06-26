// src/lib/roadmapGraph.ts
import { getRoadmapGraphData, roadmapEdges } from "@/lib/roadmap";

export const generateGraphData = (completedIds: string[]) => {
  const allTopics = getRoadmapGraphData(completedIds);

  // Map your custom data to React Flow format
  const nodes = allTopics.map((topic) => ({
    id: topic.id,
    data: { 
      label: topic.label,
      completed: topic.completed,
      total: topic.total 
    },
    position: topic.position, // This now uses the coordinates you defined!
    type: 'default',
    style: { 
        background: topic.completed === topic.total ? '#22c55e' : '#3b82f6', 
        color: '#fff',
        borderRadius: '8px'
    }
  }));

  return { nodes, edges: roadmapEdges };
};