import { useState, useMemo, useEffect } from "react";
import { dsaQuestions } from "@/data/dsaQuestions";
import { useProgress } from "@/hooks/useProgress";
import FilterBar from "@/components/FilterBar";
import TopicAccordion from "@/components/TopicAccordion";
import { Accordion } from "@/components/ui/accordion";
import ProgressBar from "@/components/ProgressBar";
import useAuth from "@/hooks/useAuth";

// Dictionary to map roadmap node short IDs to dataset topic names
const TOPIC_MAPPING: Record<string, string> = {
  "Arrays": "Arrays & Two Pointer",
  "Strings": "Strings",
  "Hashing": "Hashing",
  "Searching": "Searching & Sorting",
  "BinarySearch": "Binary Search",
  "Recursion": "Recursion & Backtracking",
  "LinkedList": "Linked List",
  "Stack": "Stack & Queue",
  "SlidingWindow": "Sliding Window & Two Pointer",
  "Tree": "Tree & BST",
  "Heap": "Heap & Priority Queue",
  "Graph": "Graph",
  "DP": "Dynamic Programming",
  "Greedy": "Greedy",
  "Trie": "Trie & Bit Manipulation",
  "Advanced": "Segment Tree / Advanced"
};

export default function DSASheet({ companySpecific = false }: { companySpecific?: boolean }) {
  const { completedIds, bookmarkedIds, fetchProgress } = useProgress();
  const isLoggedIn = useAuth((s) => s.isLoggedIn);

  // Unified filter states
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [company, setCompany] = useState("All");
  const [status, setStatus] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");

  // Signed-in students sync server progress; guests use browser-saved progress.
  useEffect(() => {
    if (isLoggedIn) {
      fetchProgress();
    }
  }, [isLoggedIn, fetchProgress]);

  // URL Parameter Syncing Effect
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const targetTopicId = searchParams.get("topic");

    if (targetTopicId && TOPIC_MAPPING[targetTopicId]) {
      // Automatically update the main filter state to match the clicked node
      setTopicFilter(TOPIC_MAPPING[targetTopicId]);
    }
  }, []);

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
      if (companySpecific && company !== "All" && !q.companies.includes(company)) return false;
      if (topicFilter !== "All" && q.topic !== topicFilter) return false;
      
      if (status === "Completed" && !completedIds.includes(q.id)) return false;
      if (status === "Pending" && completedIds.includes(q.id)) return false;
      if (status === "Bookmarked" && !bookmarkedIds.includes(q.id)) return false;
      
      return true;
    });
  }, [search, difficulty, company, status, topicFilter, completedIds, bookmarkedIds, companySpecific]);

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
    <div className="space-y-9 animate-in fade-in duration-500">
      <div className="flex flex-col gap-7 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="cg-page-kicker">{companySpecific ? "Interview preparation" : "Problem library"}</p>
          <h1 className="cg-page-title">{companySpecific ? "Company Specific Sheet" : "DSA Sheet"}</h1>
          <p className="cg-page-copy">{companySpecific ? "Filter DSA questions by the companies that commonly ask them." : "Practise data structures and algorithms topic by topic, without company tags."}</p>
        </div>
        <div className="w-full border-l-2 border-orange-500 pl-5 md:w-64">
          <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500"><span>Progress</span><span>{dsaCompleted}/{dsaQuestions.length}</span></div>
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
        hideCompany={!companySpecific}
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
              showCompanies={companySpecific}
            />
          ))}
        </Accordion>
      )}
    </div>
  );
}
