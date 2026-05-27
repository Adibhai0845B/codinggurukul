import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FileText, Bookmark, Youtube, ExternalLink } from "lucide-react";
import { DSAQuestion } from "@/data/dsaQuestions";
import { useProgress } from "@/hooks/useProgress";
import { useState } from "react";
import NoteModal from "./NoteModal";
import { cn } from "@/lib/utils";

interface QuestionRowProps {
  question: DSAQuestion;
}

export default function QuestionRow({ question }: QuestionRowProps) {
  const { completedIds, bookmarkedIds, toggleComplete, toggleBookmark, notes } = useProgress();
  const isCompleted = completedIds.includes(question.id);
  const isBookmarked = bookmarkedIds.includes(question.id);
  const hasNote = !!notes[question.id];
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const difficultyColors = {
    Easy: "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20",
    Medium: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20",
    Hard: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20",
  };

  return (
    <>
      <div className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-border/50 bg-card hover:bg-muted/30 transition-colors gap-4",
        isCompleted && "opacity-60 bg-muted/10"
      )} data-testid={`row-${question.id}`}>
        
        <div className="flex items-start gap-4 flex-1">
          <Checkbox 
            checked={isCompleted} 
            onCheckedChange={() => toggleComplete(question.id)} 
            className="mt-1"
            data-testid={`check-${question.id}`}
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("font-medium", isCompleted && "line-through text-muted-foreground")}>
                {question.title}
              </span>
              <Badge variant="outline" className={cn("text-[10px] uppercase font-bold", difficultyColors[question.difficulty])}>
                {question.difficulty}
              </Badge>
            </div>
            {question.companies.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {question.companies.map((c) => (
                  <span key={c} className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border/50">
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end overflow-x-auto pb-1 sm:pb-0">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-primary shrink-0" 
            asChild 
            disabled={!question.leetcodeLink}
          >
            {question.leetcodeLink ? (
              <a href={question.leetcodeLink} target="_blank" rel="noreferrer" title="LeetCode">
                <span className="font-bold font-mono">LC</span>
              </a>
            ) : (
              <span><span className="font-bold font-mono opacity-50">LC</span></span>
            )}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-green-500 shrink-0" 
            asChild 
            disabled={!question.gfgLink}
          >
            {question.gfgLink ? (
              <a href={question.gfgLink} target="_blank" rel="noreferrer" title="GeeksForGeeks">
                <span className="font-bold font-serif text-[10px]">GFG</span>
              </a>
            ) : (
              <span><span className="font-bold font-serif text-[10px] opacity-50">GFG</span></span>
            )}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-red-500 shrink-0" 
            asChild 
            disabled={!question.youtubeLink}
          >
            {question.youtubeLink ? (
              <a href={question.youtubeLink} target="_blank" rel="noreferrer" title="YouTube Solution">
                <Youtube className="h-4 w-4" />
              </a>
            ) : (
              <span><Youtube className="h-4 w-4 opacity-50" /></span>
            )}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8 shrink-0", hasNote ? "text-primary bg-primary/10" : "text-muted-foreground")}
            onClick={() => setIsNoteOpen(true)}
            title="Notes"
            data-testid={`btn-note-${question.id}`}
          >
            <FileText className="h-4 w-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8 shrink-0", isBookmarked ? "text-yellow-500 bg-yellow-500/10" : "text-muted-foreground")}
            onClick={() => toggleBookmark(question.id)}
            title="Bookmark"
            data-testid={`btn-bookmark-${question.id}`}
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
