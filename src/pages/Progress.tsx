import { useMemo } from "react";
import { useProgress } from "@/hooks/useProgress";
import { dsaQuestions } from "@/data/dsaQuestions";
import { cpQuestions } from "@/data/cpQuestions";
import ProgressCard from "@/components/ProgressCard";
import ProgressBar from "@/components/ProgressBar";
import { CheckCircle2, Bookmark, Target, TrendingUp, Trophy, Code2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Progress() {
  const { completedIds, bookmarkedIds } = useProgress();

  const totalDsa = dsaQuestions.length;
  const dsaCompletedCount = dsaQuestions.filter(q => completedIds.includes(q.id)).length;
  
  const totalCp = cpQuestions.length;
  const cpCompletedCount = cpQuestions.filter(q => completedIds.includes(q.id)).length;

  const totalCompleted = dsaCompletedCount + cpCompletedCount;
  const totalQuestions = totalDsa + totalCp;
  const overallPercentage = totalQuestions === 0 ? 0 : Math.round((totalCompleted / totalQuestions) * 100);

  const dsaTopics = useMemo(() => {
    const topicsMap: Record<string, { total: number, completed: number }> = {};
    dsaQuestions.forEach(q => {
      if (!topicsMap[q.topic]) {
        topicsMap[q.topic] = { total: 0, completed: 0 };
      }
      topicsMap[q.topic].total++;
      if (completedIds.includes(q.id)) {
        topicsMap[q.topic].completed++;
      }
    });
    return Object.entries(topicsMap)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.completed / b.total - a.completed / a.total);
  }, [completedIds]);

  const cpRatings = useMemo(() => {
    const ratingsMap: Record<number, { total: number, completed: number }> = {};
    cpQuestions.forEach(q => {
      if (!ratingsMap[q.rating]) {
        ratingsMap[q.rating] = { total: 0, completed: 0 };
      }
      ratingsMap[q.rating].total++;
      if (completedIds.includes(q.id)) {
        ratingsMap[q.rating].completed++;
      }
    });
    return Object.entries(ratingsMap)
      .map(([rating, stats]) => ({ rating: parseInt(rating), ...stats }))
      .sort((a, b) => a.rating - b.rating);
  }, [completedIds]);

  const weakTopics = dsaTopics
    .filter(t => t.total > 0 && (t.completed / t.total) < 0.3)
    .slice(0, 3);

  const allQuestionsMap = useMemo(() => {
    const map: Record<string, { title: string, type: 'DSA' | 'CP' }> = {};
    dsaQuestions.forEach(q => map[q.id] = { title: q.title, type: 'DSA' });
    cpQuestions.forEach(q => map[q.id] = { title: q.title, type: 'CP' });
    return map;
  }, []);

  const recentCompletions = completedIds.slice(-10).reverse().map(id => ({ id, ...allQuestionsMap[id] }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Progress Dashboard</h1>
        <p className="text-muted-foreground mt-1">Analytics and insights on your preparation journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProgressCard 
          icon={<Target className="h-6 w-6" />}
          label="Overall Completion"
          value={`${overallPercentage}%`}
          subText={`${totalCompleted}/${totalQuestions} problems`}
        />
        <ProgressCard 
          icon={<Code2 className="h-6 w-6" />}
          label="DSA Progress"
          value={dsaCompletedCount}
          subText={`/ ${totalDsa}`}
        />
        <ProgressCard 
          icon={<Trophy className="h-6 w-6" />}
          label="CP Progress"
          value={cpCompletedCount}
          subText={`/ ${totalCp}`}
        />
        <ProgressCard 
          icon={<Bookmark className="h-6 w-6" />}
          label="Bookmarked"
          value={bookmarkedIds.length}
        />
        <ProgressCard 
          icon={<CheckCircle2 className="h-6 w-6" />}
          label="Pending DSA"
          value={totalDsa - dsaCompletedCount}
        />
        <ProgressCard 
          icon={<TrendingUp className="h-6 w-6" />}
          label="Pending CP"
          value={totalCp - cpCompletedCount}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>DSA Topic Mastery</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead className="w-[100px] text-right">Progress</TableHead>
                  <TableHead className="w-[150px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dsaTopics.map(t => (
                  <TableRow key={t.name}>
                    <TableCell className="font-medium text-sm">{t.name}</TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm font-mono">
                      {t.completed}/{t.total}
                    </TableCell>
                    <TableCell>
                      <ProgressBar completed={t.completed} total={t.total} className="h-2" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-8 flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>CP Rating Mastery</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rating</TableHead>
                    <TableHead className="w-[100px] text-right">Progress</TableHead>
                    <TableHead className="w-[150px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cpRatings.map(r => (
                    <TableRow key={r.rating}>
                      <TableCell className="font-medium text-sm text-primary">★ {r.rating}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm font-mono">
                        {r.completed}/{r.total}
                      </TableCell>
                      <TableCell>
                        <ProgressBar completed={r.completed} total={r.total} className="h-2" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {weakTopics.length > 0 && (
            <Card className="border-orange-500/30 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-500 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 rotate-180" /> Focus Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {weakTopics.map(t => (
                    <li key={t.name} className="flex justify-between items-center text-sm">
                      <span>{t.name}</span>
                      <span className="text-orange-500 font-mono">{Math.round((t.completed/t.total)*100)}%</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Recent Completions</CardTitle>
            </CardHeader>
            <CardContent>
              {recentCompletions.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No problems solved yet. Start coding!
                </div>
              ) : (
                <ul className="space-y-3">
                  {recentCompletions.map((item, i) => item.title ? (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-foreground">{item.title}</span>
                        <span className="text-xs text-muted-foreground ml-2 px-1.5 py-0.5 bg-secondary rounded border border-border">
                          {item.type}
                        </span>
                      </div>
                    </li>
                  ) : null)}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
