import { useMemo, useState } from "react";
import { ExternalLink, FileText, Bookmark } from "lucide-react";
import { start100Questions, Start100Question, StarterPlatform } from "@/data/start100Questions";
import { useProgress } from "@/hooks/useProgress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProgressBar from "@/components/ProgressBar";
import NoteModal from "@/components/NoteModal";
import { cn } from "@/lib/utils";

const platforms: StarterPlatform[] = ["Codeforces", "CodeChef", "LeetCode", "GeeksforGeeks"];

const platformStyles: Record<StarterPlatform, string> = {
  Codeforces: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  CodeChef: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  LeetCode: "bg-green-500/10 text-green-500 border-green-500/20",
  GeeksforGeeks: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

function StarterQuestionRow({ question }: { question: Start100Question }) {
  const { completedIds, bookmarkedIds, toggleComplete, toggleBookmark, notes } = useProgress();
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const isCompleted = completedIds.includes(question.id);
  const isBookmarked = bookmarkedIds.includes(question.id);
  const hasNote = !!notes[question.id];

  return (
    <>
      <div
        className={cn(
          "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-border/50 bg-card hover:bg-muted/30 transition-colors gap-4",
          isCompleted && "opacity-60 bg-muted/10"
        )}
        data-testid={`start-row-${question.id}`}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => toggleComplete(question.id)}
            className="mt-1"
            data-testid={`start-check-${question.id}`}
          />
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("font-medium", isCompleted && "line-through text-muted-foreground")}>
                {question.title}
              </span>
              <Badge variant="outline" className={cn("text-[10px] uppercase font-bold", platformStyles[question.platform])}>
                {question.platform}
              </Badge>
              <Badge variant="outline" className="text-[10px] uppercase font-bold bg-primary/10 text-primary border-primary/20">
                {question.level}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border/50">
                {question.topic}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
                {question.note}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end overflow-x-auto pb-1 sm:pb-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground hover:text-primary shrink-0"
            asChild
          >
            <a href={question.link} target="_blank" rel="noreferrer" title={`Solve on ${question.platform}`}>
              Solve <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8 shrink-0", hasNote ? "text-primary bg-primary/10" : "text-muted-foreground")}
            onClick={() => setIsNoteOpen(true)}
            title="Notes"
            data-testid={`start-btn-note-${question.id}`}
          >
            <FileText className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8 shrink-0", isBookmarked ? "text-yellow-500 bg-yellow-500/10" : "text-muted-foreground")}
            onClick={() => toggleBookmark(question.id)}
            title="Bookmark"
            data-testid={`start-btn-bookmark-${question.id}`}
          >
            <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>

      <NoteModal
        isOpen={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
        questionId={question.id}
        questionTitle={question.title}
      />
    </>
  );
}

function PlatformAccordion({ platform, questions }: { platform: StarterPlatform; questions: Start100Question[] }) {
  const { completedIds } = useProgress();
  const completedCount = useMemo(
    () => questions.filter((q) => completedIds.includes(q.id)).length,
    [questions, completedIds]
  );

  if (questions.length === 0) return null;

  return (
    <AccordionItem value={platform} className="border border-border/50 bg-card rounded-lg mb-4 overflow-hidden shadow-sm data-[state=open]:border-primary/50 transition-colors">
      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 data-[state=open]:bg-muted/10 group">
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-4 pr-4">
          <div className="flex-1 text-left">
            <h3 className="text-lg font-bold group-data-[state=open]:text-primary transition-colors">{platform}</h3>
            <p className="text-sm text-muted-foreground mt-1 font-normal">
              {questions.length} starter problems
            </p>
          </div>
          <div className="w-full sm:w-48 shrink-0" onClick={(e) => e.stopPropagation()}>
            <ProgressBar completed={completedCount} total={questions.length} />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-0 pb-0 bg-background/50">
        <div className="flex flex-col divide-y divide-border/30">
          {questions.map((question) => (
            <StarterQuestionRow key={question.id} question={question} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function Start100Sheet() {
  const { completedIds, bookmarkedIds } = useProgress();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [topic, setTopic] = useState("All");

  const topics = useMemo(() => {
    return Array.from(new Set(start100Questions.map((question) => question.topic))).sort();
  }, []);

  const completedCount = useMemo(
    () => start100Questions.filter((question) => completedIds.includes(question.id)).length,
    [completedIds]
  );

  const filteredQuestions = useMemo(() => {
    const term = search.trim().toLowerCase();

    return start100Questions.filter((question) => {
      if (term && !question.title.toLowerCase().includes(term) && !question.topic.toLowerCase().includes(term)) return false;
      if (platform !== "All" && question.platform !== platform) return false;
      if (topic !== "All" && question.topic !== topic) return false;
      if (status === "Completed" && !completedIds.includes(question.id)) return false;
      if (status === "Pending" && completedIds.includes(question.id)) return false;
      if (status === "Bookmarked" && !bookmarkedIds.includes(question.id)) return false;

      return true;
    });
  }, [search, platform, topic, status, completedIds, bookmarkedIds]);

  const questionsByPlatform = useMemo(() => {
    const grouped: Record<StarterPlatform, Start100Question[]> = {
      Codeforces: [],
      CodeChef: [],
      LeetCode: [],
      GeeksforGeeks: [],
    };

    filteredQuestions.forEach((question) => {
      grouped[question.platform].push(question);
    });

    return grouped;
  }, [filteredQuestions]);

  const activePlatforms = platforms.filter((item) => questionsByPlatform[item].length > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Start 150 Sheet</h1>
          <p className="text-muted-foreground mt-1">
            150 beginner problems from Codeforces 800, CodeChef starter level, LeetCode Easy, and GeeksforGeeks basics.
          </p>
        </div>
        <div className="w-full md:w-64 bg-card p-4 rounded-xl border border-border">
          <div className="text-sm font-medium mb-2">Overall Progress</div>
          <ProgressBar completed={completedCount} total={start100Questions.length} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6" data-testid="start-filter-bar">
        <div className="flex-1">
          <Input
            placeholder="Search starter questions..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full"
            data-testid="start-input-search"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[140px]" data-testid="start-select-status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Bookmarked">Bookmarked</SelectItem>
            </SelectContent>
          </Select>

          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-[150px]" data-testid="start-select-platform">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Platforms</SelectItem>
              {platforms.map((item) => (
                <SelectItem key={item} value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger className="w-[180px]" data-testid="start-select-topic">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Topics</SelectItem>
              {topics.map((item) => (
                <SelectItem key={item} value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {activePlatforms.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground bg-card rounded-xl border border-border border-dashed">
          <p className="text-lg">No questions match your filters.</p>
          <p className="text-sm mt-2">Try changing the platform, topic, or search text.</p>
        </div>
      ) : (
        <Accordion type="multiple" defaultValue={activePlatforms} className="w-full space-y-4">
          {activePlatforms.map((item) => (
            <PlatformAccordion key={item} platform={item} questions={questionsByPlatform[item]} />
          ))}
        </Accordion>
      )}
    </div>
  );
}
