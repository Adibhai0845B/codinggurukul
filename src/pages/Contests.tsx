import ContestCard from "@/components/ContestCard";
import { contests } from "@/data/contests";
import { Link } from "wouter";
import { Calendar, Clock, Code2, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useContests } from "@/hooks/useContests";
import { useContestSubmissions } from "@/hooks/useContestSubmissions";
import useAuth from "@/hooks/useAuth";

export default function Contests() {
  const customContests = useContests((state) => state.contests);
  const username = useAuth((state) => state.username) || "anonymous";
  const savedResults = useContestSubmissions((state) => state.results).filter((result) => result.username === username);

  const getStatus = (startTime: string, durationMinutes: number) => {
    const now = Date.now();
    const start = new Date(startTime).getTime();
    const end = start + durationMinutes * 60_000;
    if (now < start) return "Upcoming";
    if (now <= end) return "Live";
    return "Ended";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Programming Contests</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Join Coding Gurukul challenges, solve programming problems, and test your skills.
        </p>
          </div>
          <Button asChild variant="outline"><Link href="/make-contest"><Trophy className="mr-2 h-4 w-4 text-amber-400" />Make Contest</Link></Button>
        </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-amber-400" /><h2 className="text-xl font-bold">Coding Gurukul Contests</h2></div>
        {customContests.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">No contests have been published yet. Check back soon.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {customContests.map((contest) => {
              const status = getStatus(contest.startTime, contest.durationMinutes);
              return (
                <Card key={contest.id} className="flex h-full flex-col border-blue-500/20 hover:border-blue-500/50">
                  <CardHeader><div className="flex items-start justify-between gap-3"><CardTitle>{contest.title}</CardTitle><Badge className={status === "Live" ? "bg-emerald-600" : ""}>{status}</Badge></div></CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <p className="line-clamp-3 text-sm text-muted-foreground">{contest.description}</p>
                    <div className="space-y-2 text-sm"><p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-blue-400" />{new Date(contest.startTime).toLocaleString()}</p><p className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-400" />{contest.durationMinutes} minutes</p><p className="flex items-center gap-2"><Code2 className="h-4 w-4 text-blue-400" />{contest.problems.length} problems · {contest.difficulty}</p></div>
                  </CardContent>
                  <CardFooter><Button asChild className="w-full"><Link href={`/contests/${contest.id}`}>{status === "Upcoming" ? "View Contest" : "Open Contest"}</Link></Button></CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {savedResults.length > 0 && <section className="space-y-4"><div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-emerald-400" /><h2 className="text-xl font-bold">My Saved Results</h2></div><div className="grid gap-4 md:grid-cols-2">{savedResults.map((result) => {
        const contest = customContests.find((item) => item.id === result.contestId);
        return <Card key={result.id}><CardContent className="flex items-center justify-between p-5"><div><p className="font-bold">{contest?.title || "Contest"}</p><p className="mt-1 text-xs text-muted-foreground">{new Date(result.endedAt).toLocaleString()} · {result.solvedProblems}/{result.totalProblems} solved</p></div><Badge className="bg-emerald-600 text-base">{result.score}/{result.maximumScore}</Badge></CardContent></Card>;
      })}</div></section>}

      <section className="space-y-4">
      <h2 className="text-xl font-bold">External Contest Platforms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>
      </section>
    </div>
  );
}
