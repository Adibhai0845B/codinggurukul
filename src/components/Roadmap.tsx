// src/components/Roadmap.tsx
import { useMemo, useCallback } from 'react';
import ReactFlow, { Background, Controls, Handle, Position } from 'reactflow';
import { useLocation } from "wouter";
import 'reactflow/dist/style.css';
import { generateGraphData } from "@/lib/roadmapGraph";
import { useProgress } from "@/hooks/useProgress"; 

// The specific colors
const THEME = {
  bg: '#1e1e1e', // Dark background
  nodeBg: '#2d2d2d', // Slightly lighter node background
  nodeBorderDefault: '#4f46e5', // Blue border for incomplete
  nodeBorderComplete: '#9333ea', // Purple border for complete 
  progressFill: '#22c55e', // Green progress bar
  progressBg: '#404040', // Dark gray behind progress
  text: '#ffffff', // White text
};

// 1. Define the Custom Node UI with Colors
const CustomNode = ({ data }: any) => {
  const progress = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
  const isCompleted = data.completed === data.total && data.total > 0;
  
  return (
    <div 
      className="px-4 py-3 rounded-[4px] min-w-[160px] cursor-pointer transition-transform hover:scale-105 shadow-xl"
      style={{
        backgroundColor: THEME.nodeBg,
        border: `2px solid ${isCompleted ? THEME.nodeBorderComplete : THEME.nodeBorderDefault}`,
      }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      
      {/* Node Title */}
      <div className="text-center font-bold text-[13px] mb-2" style={{ color: THEME.text }}>
        {data.label}
      </div>
      
      {/* Progress Bar Container */}
      <div className="w-full rounded-sm h-1.5 mb-1 overflow-hidden" style={{ backgroundColor: THEME.progressBg }}>
        {/* Active Progress Fill */}
        <div 
          className="h-1.5 transition-all duration-500" 
          style={{ width: `${progress}%`, backgroundColor: THEME.progressFill }} 
        />
      </div>
      
      {/* Progress Text (Optional: NeetCode doesn't always show the numbers, but it's helpful) */}
      <div className="text-[10px] text-center font-medium opacity-70" style={{ color: THEME.text }}>
        {data.completed} / {data.total}
      </div>

      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const Roadmap = () => {
  const { completedIds } = useProgress();
  const [, setLocation] = useLocation();
  
  const { nodes, edges } = useMemo(() => generateGraphData(completedIds), [completedIds]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    // You can also pass the node.id here to filter the DSA sheet if you set up URL params
    setLocation('/dsa'); 
  }, [setLocation]);

  return (
    // Full height, full width container
    <div className="h-full w-full relative">
      
      {/* CSS Hack to hide the React Flow watermark */}
      <style>{`
        .react-flow__attribution {
          display: none !important;
        }
      `}</style>

      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView 
        minZoom={0.2}
        maxZoom={1.5}
        // Force the background color of the canvas
        style={{ backgroundColor: THEME.bg }}
      >
        <Background gap={24} size={1} color="#333" />
        <Controls 
          className="bg-black/50 border-gray-700 fill-white" 
          showInteractive={false} 
        />
      </ReactFlow>
    </div>
  );
};