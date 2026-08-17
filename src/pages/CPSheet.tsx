import { useState, useMemo, useEffect } from "react";
import { cpQuestions } from "@/data/cpQuestions";
import { useProgress } from "@/hooks/useProgress";
import FilterBar from "@/components/FilterBar";
import CPRatingAccordion from "@/components/CPRatingAccordion";
import { Accordion } from "@/components/ui/accordion";
import ProgressBar from "@/components/ProgressBar";
import useAuth from "@/hooks/useAuth";
import { useLocation } from "wouter";

export default function CPSheet() {
  const { completedIds, bookmarkedIds } = useProgress();
  const isLoggedIn = useAuth((s) => s.isLoggedIn);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoggedIn && location !== "/login") {
      setLocation("/login");
    }
  }, [isLoggedIn, location, setLocation]);
  
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All"); // Maps to rating logic but we might ignore it or adapt it
  const [company, setCompany] = useState("All"); // Unused in CP but part of filter bar
  const [status, setStatus] = useState("All");

  const cpCompleted = useMemo(() => cpQuestions.filter(q => completedIds.includes(q.id)).length, [completedIds]);

  const ratings = [800, 900, 1000, 1100, 1200];

  const filteredQuestions = useMemo(() => {
    return cpQuestions.filter(q => {
      if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
      
      if (status === "Completed" && !completedIds.includes(q.id)) return false;
      if (status === "Pending" && completedIds.includes(q.id)) return false;
      if (status === "Bookmarked" && !bookmarkedIds.includes(q.id)) return false;
      
      return true;
    });
  }, [search, status, completedIds, bookmarkedIds]);

  const questionsByRating = useMemo(() => {
    const grouped: Record<number, typeof cpQuestions> = {};
    ratings.forEach(r => { grouped[r] = []; });
    
    filteredQuestions.forEach(q => {
      if (grouped[q.rating]) {
        grouped[q.rating].push(q);
      }
    });
    return grouped;
  }, [filteredQuestions, ratings]);

  const activeRatings = ratings.filter(r => questionsByRating[r].length > 0);

  return (
    <div className="space-y-9 animate-in fade-in duration-500">
      <div className="flex flex-col gap-7 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="cg-page-kicker">Competitive programming</p>
          <h1 className="cg-page-title">Rating-wise practice</h1>
          <p className="cg-page-copy">Build speed and contest confidence through a deliberate Codeforces progression.</p>
        </div>
        <div className="w-full border-l-2 border-orange-500 pl-5 md:w-64">
          <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500"><span>Progress</span><span>{cpCompleted}/{cpQuestions.length}</span></div>
          <ProgressBar completed={cpCompleted} total={cpQuestions.length} />
        </div>
      </div>

      {/* Reusing filter bar but hiding unused fields */}
      <FilterBar 
        search={search} setSearch={setSearch}
        difficulty={difficulty} setDifficulty={setDifficulty} // We could hide this or adapt to rating, let's leave default or hide via CSS if needed, but it works as is
        company={company} setCompany={setCompany}
        status={status} setStatus={setStatus}
        companies={[]}
        hideTopic={true}
      />

      {activeRatings.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground bg-card rounded-xl border border-border border-dashed">
          <p className="text-lg">No questions match your filters.</p>
        </div>
      ) : (
        <Accordion type="multiple" defaultValue={activeRatings.map(r => String(r))} className="w-full space-y-4">
          {activeRatings.map(rating => (
            <CPRatingAccordion 
              key={rating} 
              rating={rating} 
              questions={questionsByRating[rating]} 
              value={String(rating)} 
            />
          ))}
        </Accordion>
      )}
    </div>
  );
}
