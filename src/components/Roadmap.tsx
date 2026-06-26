// src/components/Roadmap.tsx
import { useMemo } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { generateGraphData } from "@/lib/roadmapGraph";
import { useProgress } from "@/hooks/useProgress"; // Import this

export const Roadmap = () => {
  const { completedIds } = useProgress(); // Get real progress
  
  // Pass completedIds here so the graph updates when problems are solved
  const { nodes, edges } = useMemo(() => generateGraphData(completedIds), [completedIds]);

  return (
    <div className="h-[600px] w-full border rounded-xl overflow-hidden bg-card">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};