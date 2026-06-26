// src/pages/RoadmapPage.tsx
import { Roadmap } from "@/components/Roadmap";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2">DSA Learning Roadmap</h1>
        <p className="text-muted-foreground mb-12">
          Track your progress and follow the recommended path.
        </p>
        <Roadmap />
      </div>
    </div>
  );
}