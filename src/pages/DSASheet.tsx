import { useState, useMemo, useEffect } from "react";
import { dsaQuestions } from "@/data/dsaQuestions";
import { useProgress } from "@/hooks/useProgress";
import FilterBar from "@/components/FilterBar";
import TopicAccordion from "@/components/TopicAccordion";
import { Accordion } from "@/components/ui/accordion";
import ProgressBar from "@/components/ProgressBar";
import useAuth from "@/hooks/useAuth";
import { useLocation } from "wouter";

export default function DSASheet() {
  const { completedIds, bookmarkedIds,fetchProgress } = useProgress();
  const isLoggedIn = useAuth((s) => s.isLoggedIn);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // If not logged in, redirect to login page (unless already there)
    if (isLoggedIn) {
      fetchProgress(); 
    } else if (location !== "/login") {
      setLocation("/login");
    }
  }, [isLoggedIn, location, setLocation, fetchProgress]);
  
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [company, setCompany] = useState("All");
  const [status, setStatus] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");

  const companies = useMemo(() => {
    const all = new Set<string>();
    dsaQuestions.forEach(q => q.companies.forEach(c => all.add(c)));
    return Array.from(all).sort();
  }, []);

  const topics = useMemo(() => {
    const all = new Set<string>();
    dsaQuestions.forEach(q => all.add(q.topic));
    return Array.from(all);
  }, []);

  const dsaCompleted = useMemo(() => dsaQuestions.filter(q => completedIds.includes(q.id)).length, [completedIds]);

  const filteredQuestions = useMemo(() => {
    return dsaQuestions.filter(q => {
      if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (difficulty !== "All" && q.difficulty !== difficulty) return false;
      if (company !== "All" && !q.companies.includes(company)) return false;
      if (topicFilter !== "All" && q.topic !== topicFilter) return false;
      
      if (status === "Completed" && !completedIds.includes(q.id)) return false;
      if (status === "Pending" && completedIds.includes(q.id)) return false;
      if (status === "Bookmarked" && !bookmarkedIds.includes(q.id)) return false;
      
      return true;
    });
  }, [search, difficulty, company, status, topicFilter, completedIds, bookmarkedIds]);

  const questionsByTopic = useMemo(() => {
    const grouped: Record<string, typeof dsaQuestions> = {};
    topics.forEach(t => { grouped[t] = []; });
    
    filteredQuestions.forEach(q => {
      grouped[q.topic].push(q);
    });
    return grouped;
  }, [filteredQuestions, topics]);

  const activeTopics = topics.filter(t => questionsByTopic[t].length > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">DSA Practice Sheet</h1>
          <p className="text-muted-foreground mt-1">Master 170 standard algorithms and data structures.</p>
        </div>
        <div className="w-full md:w-64 bg-card p-4 rounded-xl border border-border">
          <div className="text-sm font-medium mb-2">Overall Progress</div>
          <ProgressBar completed={dsaCompleted} total={dsaQuestions.length} />
        </div>
      </div>

      <FilterBar 
        search={search} setSearch={setSearch}
        difficulty={difficulty} setDifficulty={setDifficulty}
        company={company} setCompany={setCompany}
        status={status} setStatus={setStatus}
        topic={topicFilter} setTopic={setTopicFilter}
        companies={companies} topics={topics}
      />

      {activeTopics.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground bg-card rounded-xl border border-border border-dashed">
          <p className="text-lg">No questions match your filters.</p>
          <p className="text-sm mt-2">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <Accordion type="multiple" defaultValue={activeTopics.map(t => t)} className="w-full space-y-4">
          {activeTopics.map(topic => (
            <TopicAccordion 
              key={topic} 
              topic={topic} 
              questions={questionsByTopic[topic]} 
              value={topic} 
            />
          ))}
        </Accordion>
      )}
    </div>
  );
}
