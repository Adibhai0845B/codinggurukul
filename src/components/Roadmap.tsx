import { useMemo, useCallback } from 'react';
import ReactFlow, { Background, Controls, Handle, Position } from 'reactflow';
import { useLocation } from "wouter";
import 'reactflow/dist/style.css';
import { generateGraphData } from "@/lib/roadmapGraph";
import { useProgress } from "@/hooks/useProgress"; 

// 1. Define the Custom Node UI
const CustomNode = ({ data }: any) => {
  // Calculate percentage for the progress bar
  const progress = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
  const isCompleted = data.completed === data.total && data.total > 0;
  
  return (
    <div className={`px-4 py-3 shadow-xl rounded-xl bg-card border-2 min-w-[160px] cursor-pointer transition-all hover:scale-105 ${isCompleted ? 'border-green-500' : 'border-primary/30 hover:border-primary'}`}>
      
      <Handle type="target" position={Position.Top} className="opacity-0" />
      
      <div className="text-center font-bold text-sm mb-2 text-foreground">{data.label}</div>
      
      {/* Custom Progress Bar */}
      <div className="w-full bg-secondary rounded-full h-2 mb-1 overflow-hidden">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      
      <div className="text-[11px] text-center text-muted-foreground font-medium">
        {data.completed} / {data.total} Completed
      </div>

      {/* Invisible Handle for outgoing lines (Bottom) */}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

// 2. Register the Custom Node
const nodeTypes = {
  custom: CustomNode,
};

export const Roadmap = () => {
  const { completedIds } = useProgress();
  const [, setLocation] = useLocation();
  
  const { nodes, edges } = useMemo(() => generateGraphData(completedIds), [completedIds]);

  // 3. Handle clicking a node to jump to the DSA Sheet
  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setLocation('/dsa'); // Navigates the user to your DSA sheet
  }, [setLocation]);

  return (
    // Height set to 80vh to cover more of the screen
    <div className="h-[80vh] w-full border rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/50">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView // Automatically zooms and pans to fit all nodes on screen
        minZoom={0.1}
      >
        <Background gap={20} size={1} className="opacity-50" />
        <Controls />
      </ReactFlow>
    </div>
  );
};