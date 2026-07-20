import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, CheckCircle2, Clock, Flag, LockKeyhole, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContests } from "@/hooks/useContests";
import ContestProblemSolver from "@/components/ContestProblemSolver";
import { useContestSubmissions } from "@/hooks/useContestSubmissions";
import useAuth from "@/hooks/useAuth";

export default function ContestDetails() {
  const [, params] = useRoute("/contests/:id");
  const contest = useContests((state) => state.contests.find((item) => item.id === params?.id));
  const [, forceTick] = useState(0);
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);
  const username = useAuth((state) => state.username) || "anonymous";
  const submissions = useContestSubmissions((state) => state.submissions);
  const results = useContestSubmissions((state) => state.results);
  const saveResult = useContestSubmissions((state) => state.saveResult);

  useEffect(() => {
    const timer = window.setInterval(() => forceTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!contest) return <div className="py-20 text-center"><h1 className="text-2xl font-bold">Contest not found</h1><Button asChild className="mt-5"><Link href="/contests">Back to contests</Link></Button></div>;

  const start = new Date(contest.startTime).getTime();
  const end = start + contest.durationMinutes * 60_000;
  const now = Date.now();
  const isUpcoming = now < start;
  const isEnded = now > end;
  const remaining = Math.max(0, (isUpcoming ? start : end) - now);
  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  const activeProblem = contest.problems.find((problem) => problem.id === activeProblemId) || contest.problems[0];
  const acceptedProblemIds = new Set(
    submissions
      .filter((submission) => submission.contestId === contest.id && submission.username === username && submission.verdict === "Accepted")
      .map((submission) => submission.problemId),
  );
  const score = contest.problems.filter((problem) => acceptedProblemIds.has(problem.id)).reduce((total, problem) => total + problem.points, 0);
  const maximumScore = contest.problems.reduce((total, problem) => total + problem.points, 0);
  const savedResult = results.find((result) => result.contestId === contest.id && result.username === username);
  const attemptEnded = isEnded || Boolean(savedResult);

  const handleEndContest = () => {
    if (!window.confirm("End your contest now? You will not be able to submit more solutions.")) return;
    saveResult({
      contestId: contest.id,
      username,
      score,
      maximumScore,
      solvedProblems: acceptedProblemIds.size,
      totalProblems: contest.problems.length,
    });
  };

  return (
    <div className="space-y-6">
      <Link href="/contests" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"><ArrowLeft className="h-4 w-4" /> All contests</Link>
      <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-slate-950 p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div><div className="mb-3 flex items-center gap-2"><Badge>{contest.difficulty}</Badge><Badge variant="outline">Your score: {savedResult?.score ?? score}/{maximumScore}</Badge></div><h1 className="text-3xl font-black">{contest.title}</h1><p className="mt-3 max-w-3xl text-muted-foreground">{contest.description}</p>{!isUpcoming && !attemptEnded && <Button onClick={handleEndContest} variant="destructive" className="mt-5"><Flag className="mr-2 h-4 w-4" />End Contest & Save Result</Button>}</div>
          <div className="min-w-52 rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-center"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{isUpcoming ? "Starts in" : isEnded ? "Contest ended" : "Time remaining"}</p>{!isEnded && <p className="mt-2 font-mono text-2xl font-bold text-blue-400">{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>}<p className="mt-2 text-xs text-slate-500"><Clock className="mr-1 inline h-3 w-3" />{contest.durationMinutes} minutes</p></div>
        </div>
      </div>

      {savedResult && <Card className="border-emerald-500/30 bg-emerald-500/5"><CardContent className="flex flex-col items-center py-8 text-center"><Trophy className="mb-3 h-10 w-10 text-amber-400" /><h2 className="text-xl font-bold">Contest Result Saved</h2><p className="mt-2 text-3xl font-black text-emerald-400">{savedResult.score}/{savedResult.maximumScore}</p><p className="mt-2 text-sm text-muted-foreground">Solved {savedResult.solvedProblems} of {savedResult.totalProblems} problems · Ended {new Date(savedResult.endedAt).toLocaleString()}</p></CardContent></Card>}

      {isUpcoming ? (
        <Card><CardContent className="flex flex-col items-center py-14 text-center"><LockKeyhole className="mb-4 h-10 w-10 text-amber-400" /><h2 className="text-xl font-bold">Problems are locked</h2><p className="mt-2 text-muted-foreground">They will become available when the contest begins.</p></CardContent></Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
          <Card className="h-fit"><CardHeader><CardTitle className="text-base">Problems</CardTitle></CardHeader><CardContent className="space-y-2">{contest.problems.map((problem, index) => (
            <button key={problem.id} type="button" onClick={() => setActiveProblemId(problem.id)} className={`flex w-full items-center justify-between rounded-lg border p-3 text-left text-sm transition ${activeProblem?.id === problem.id ? "border-blue-500 bg-blue-500/10" : "border-slate-800 hover:bg-slate-900"}`}><span className="font-semibold">{String.fromCharCode(65 + index)}. {problem.title}</span>{acceptedProblemIds.has(problem.id) && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />}</button>
          ))}</CardContent></Card>
          {activeProblem && <ContestProblemSolver contestId={contest.id} problem={activeProblem} isEnded={attemptEnded} />}
        </div>
      )}
    </div>
  );
}
