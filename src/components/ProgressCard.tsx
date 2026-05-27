import { Card, CardContent } from "./ui/card";
import { ReactNode } from "react";

interface ProgressCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subText?: string;
}

export default function ProgressCard({ icon, label, value, subText }: ProgressCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              {subText && <span className="text-xs text-muted-foreground">{subText}</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
