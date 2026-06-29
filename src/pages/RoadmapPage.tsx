// src/pages/RoadmapPage.tsx
import { Roadmap } from "@/components/Roadmap";

export default function RoadmapPage() {
  return (
    // assuming it is roughl (h-14) tall
    <div className="h-[calc(100vh-56px)] w-full bg-[#1e1e1e] overflow-hidden m-0 p-0">
      <Roadmap />
    </div>
  );
}