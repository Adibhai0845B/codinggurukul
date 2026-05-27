import { cn } from "@/lib/utils";

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ completed, total, className }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  
  let colorClass = "bg-orange-500";
  if (percentage >= 75) {
    colorClass = "bg-green-500";
  } else if (percentage >= 40) {
    colorClass = "bg-blue-500";
  }

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)} data-testid={`progress-${completed}-${total}`}>
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{percentage}%</span>
        <span>{completed} / {total}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full transition-all duration-500 ease-in-out", colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
