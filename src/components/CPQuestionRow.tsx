import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FileText, Bookmark, ExternalLink } from "lucide-react";
import { CPQuestion } from "@/data/cpQuestions";
import { useProgress } from "@/hooks/useProgress";
import { useState } from "react";
import NoteModal from "./NoteModal";
import { cn } from "@/lib/utils";

interface CPQuestionRowProps {
  question: CPQuestion;
}

export default function CPQuestionRow({ question }: CPQuestionRowProps) {
  const { completedIds, bookmarkedIds, toggleComplete, toggleBookmark, notes } = useProgress();
  const isCompleted = completedIds.includes(question.id);
  const isBookmarked = bookmarkedIds.includes(question.id);
  const hasNote = !!notes[question.id];
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  return (
    <>
      <div className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-border/50 bg-card hover:bg-muted/30 transition-colors gap-4",
        isCompleted && "opacity-60 bg-muted/10"
      )} data-testid={`cp-row-${question.id}`}>
        
        <div className="flex items-start gap-4 flex-1">
          <Checkbox 
            checked={isCompleted} 
            onCheckedChange={() => toggleComplete(question.id)} 
            className="mt-1"
            data-testid={`cp-check-${question.id}`}
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("font-medium", isCompleted && "line-through text-muted-foreground")}>
                {question.title}
              </span>
              <Badge variant="outline" className="text-[10px] uppercase font-bold bg-primary/10 text-primary border-primary/20">
                {question.rating}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border/50">
                {question.topic}
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
            disabled={!question.codeforcesLink}
          >
            {question.codeforcesLink ? (
              <a href={question.codeforcesLink} target="_blank" rel="noreferrer" title="Codeforces">
                Solve <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            ) : (
              <span>Solve</span>
            )}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8 shrink-0", hasNote ? "text-primary bg-primary/10" : "text-muted-foreground")}
            onClick={() => setIsNoteOpen(true)}
            title="Notes"
            data-testid={`cp-btn-note-${question.id}`}
          >
            <FileText className="h-4 w-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8 shrink-0", isBookmarked ? "text-yellow-500 bg-yellow-500/10" : "text-muted-foreground")}
            onClick={() => toggleBookmark(question.id)}
            title="Bookmark"
            data-testid={`cp-btn-bookmark-${question.id}`}
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
