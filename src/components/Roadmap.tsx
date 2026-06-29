// src/components/Roadmap.tsx
import { useMemo, useCallback } from 'react';
// 1. Swap 'Controls' for 'Panel' and 'useReactFlow'
import ReactFlow, { Background, Handle, Position, Panel, useReactFlow } from 'reactflow';
import { useLocation } from "wouter";
import 'reactflow/dist/style.css';
import { generateGraphData } from "@/lib/roadmapGraph";
import { useProgress } from "@/hooks/useProgress"; 

const THEME = {
  bg: '#1e1e1e', 
  nodeBg: '#2d2d2d', 
  nodeBorderDefault: '#4f46e5', 
  nodeBorderComplete: '#9333ea', 
  progressFill: '#22c55e', 
  progressBg: '#404040', 
  text: '#ffffff', 
};

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
      
      <div className="text-center font-bold text-[13px] mb-2" style={{ color: THEME.text }}>
        {data.label}
      </div>
      
      <div className="w-full rounded-sm h-1.5 mb-1 overflow-hidden" style={{ backgroundColor: THEME.progressBg }}>
        <div 
          className="h-1.5 transition-all duration-500" 
          style={{ width: `${progress}%`, backgroundColor: THEME.progressFill }} 
        />
      </div>
      
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

// 2. Create the Custom Controls Component
const CustomControls = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  // Shared styling to match the default React Flow buttons
  const btnStyle = "w-[30px] h-[30px] bg-white text-black flex items-center justify-center border-b border-gray-200 hover:bg-gray-100 transition-colors shadow-sm";

  return (
    <Panel position="bottom-left" className="m-4 flex flex-col gap-0">
      {/* Zoom In */}
      <div className="flex items-center group">
        <button onClick={() => zoomIn()} className={`rounded-t-[4px] ${btnStyle}`} aria-label="Zoom In">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
        </button>
        <span className="ml-3 text-sm font-medium tracking-wide" style={{ color: THEME.text }}>Zoom In</span>
      </div>

      {/* Zoom Out */}
      <div className="flex items-center group">
        <button onClick={() => zoomOut()} className={btnStyle} aria-label="Zoom Out">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 11V13H19V11H5Z"></path></svg>
        </button>
        <span className="ml-3 text-sm font-medium tracking-wide" style={{ color: THEME.text }}>Zoom Out</span>
      </div>

      {/* Fit Graph */}
      <div className="flex items-center group">
        <button onClick={() => fitView()} className={`rounded-b-[4px] border-b-0 ${btnStyle}`} aria-label="Fit View">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
        </button>
        <span className="ml-3 text-sm font-medium tracking-wide" style={{ color: THEME.text }}>Fit Graph</span>
      </div>
    </Panel>
  );
};

export const Roadmap = () => {
  const { completedIds } = useProgress();
  const [, setLocation] = useLocation();
  
  const { nodes, edges } = useMemo(() => generateGraphData(completedIds), [completedIds]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setLocation('/dsa'); 
  }, [setLocation]);

  return (
    <div className="h-full w-full relative">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView 
        minZoom={0.2}
        maxZoom={1.5}
        style={{ backgroundColor: THEME.bg }}
      >
        <Background gap={24} size={1} color="#333" />
        {/* 3. Render CustomControls inside ReactFlow instead of the default Controls */}
        <CustomControls />
      </ReactFlow>
    </div>
  );
};