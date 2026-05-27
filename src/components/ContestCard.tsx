import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Calendar, Trophy } from "lucide-react";
import { Contest } from "@/data/contests";

export default function ContestCard({ contest }: { contest: Contest }) {
  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl font-bold">{contest.platform}</CardTitle>
          <Badge variant="secondary" className="shrink-0">{contest.difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground">{contest.description}</p>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{contest.schedule}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <a href={contest.link} target="_blank" rel="noreferrer" data-testid={`contest-link-${contest.id}`}>
            Visit Contest <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
