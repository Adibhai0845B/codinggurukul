// src/pages/RoadmapPage.tsx
import { Roadmap } from "@/components/Roadmap";

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="cg-page-kicker">Learning path</p>
        <h1 className="cg-page-title">My roadmap</h1>
        <p className="cg-page-copy">Follow the recommended DSA sequence. Select any topic to open its practice questions.</p>
      </header>
      <div className="h-[620px] w-full overflow-hidden rounded-xl border border-slate-800 bg-[#111827] shadow-sm sm:h-[680px]">
        <Roadmap />
      </div>
    </div>
  );
}
