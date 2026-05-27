import { CPQuestion } from "@/data/cpQuestions";
import { AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import CPQuestionRow from "./CPQuestionRow";
import ProgressBar from "./ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { useMemo } from "react";

interface CPRatingAccordionProps {
  rating: number;
  questions: CPQuestion[];
  value: string;
}

export default function CPRatingAccordion({ rating, questions, value }: CPRatingAccordionProps) {
  const { completedIds } = useProgress();
  
  const completedCount = useMemo(() => {
    return questions.filter(q => completedIds.includes(q.id)).length;
  }, [questions, completedIds]);

  if (questions.length === 0) return null;

  return (
    <AccordionItem value={value} className="border border-border/50 bg-card rounded-lg mb-4 overflow-hidden shadow-sm data-[state=open]:border-primary/50 transition-colors">
      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 data-[state=open]:bg-muted/10 group">
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-4 pr-4">
          <div className="flex-1 text-left">
            <h3 className="text-lg font-bold group-data-[state=open]:text-primary transition-colors">Rating {rating}</h3>
            <p className="text-sm text-muted-foreground mt-1 font-normal">
              {questions.length} problems to master
            </p>
          </div>
          <div className="w-full sm:w-48 shrink-0" onClick={(e) => e.stopPropagation()}>
            <ProgressBar completed={completedCount} total={questions.length} />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-0 pb-0 bg-background/50">
        <div className="flex flex-col divide-y divide-border/30">
          {questions.map((q) => (
            <CPQuestionRow key={q.id} question={q} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
