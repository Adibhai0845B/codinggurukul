import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight, Bookmark, BriefcaseBusiness, CalendarCheck2, Check, CheckCircle2,
  Circle, ExternalLink, Flame, RefreshCw, Sparkles, Target, Trophy,
} from "lucide-react";
import { dsaQuestions, type DSAQuestion } from "@/data/dsaQuestions";
import { cpQuestions } from "@/data/cpQuestions";
import { start100Questions } from "@/data/start100Questions";
import { useProgress } from "@/hooks/useProgress";
import { calculateStreak, localDateKey, useLearningHub } from "@/hooks/useLearningHub";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const featuredCompanies = ["Amazon", "Google", "Microsoft", "Adobe", "Goldman Sachs", "Flipkart"];

function dayNumber(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86_400_000);
}

function questionLink(question: DSAQuestion) {
  return question.leetcodeLink || question.gfgLink;
}

export default function LearningHub() {
  const { completedIds, bookmarkedIds, toggleComplete, toggleBookmark } = useProgress();
  const { dailyGoal, activeDays, revisedIds, setDailyGoal, recordActivity, toggleRevised } = useLearningHub();
  const [company, setCompany] = useState("Amazon");
  const [revisionSeed, setRevisionSeed] = useState(0);
  const today = localDateKey();
  const streak = calculateStreak(activeDays);

  const allIds = useMemo(() => new Set([
    ...dsaQuestions.map((q) => q.id), ...cpQuestions.map((q) => q.id), ...start100Questions.map((q) => q.id),
  ]), []);
  const totalCompleted = completedIds.filter((id) => allIds.has(id)).length;
  const dailyQuestion = dsaQuestions[dayNumber() % dsaQuestions.length];
  const dailyDone = completedIds.includes(dailyQuestion.id);

  const topicStats = useMemo(() => {
    const stats = new Map<string, { total: number; completed: number }>();
    dsaQuestions.forEach((question) => {
      const current = stats.get(question.topic) || { total: 0, completed: 0 };
      current.total += 1;
      if (completedIds.includes(question.id)) current.completed += 1;
      stats.set(question.topic, current);
    });
    return [...stats.entries()]
      .map(([topic, value]) => ({ topic, ...value, percentage: Math.round((value.completed / value.total) * 100) }))
      .filter((item) => item.completed < item.total)
      .sort((a, b) => a.percentage - b.percentage || b.total - a.total);
  }, [completedIds]);

  const todayQueue = useMemo(() => {
    const weakTopics = new Set(topicStats.slice(0, 3).map((item) => item.topic));
    const preferred = dsaQuestions.filter((q) => weakTopics.has(q.topic) && !completedIds.includes(q.id));
    const remaining = dsaQuestions.filter((q) => !completedIds.includes(q.id) && !preferred.includes(q));
    return [...preferred, ...remaining].slice(0, dailyGoal);
  }, [completedIds, dailyGoal, topicStats]);

  const revisionQueue = useMemo(() => {
    const saved = dsaQuestions.filter((q) => bookmarkedIds.includes(q.id));
    const solved = dsaQuestions.filter((q) => completedIds.includes(q.id) && !bookmarkedIds.includes(q.id));
    const queue = [...saved, ...solved];
    if (!queue.length) return [];
    const offset = revisionSeed % queue.length;
    return [...queue.slice(offset), ...queue.slice(0, offset)].slice(0, 5);
  }, [bookmarkedIds, completedIds, revisionSeed]);

  const companyQuestions = useMemo(
    () => dsaQuestions.filter((q) => q.companies.includes(company)),
    [company],
  );
  const companyDone = companyQuestions.filter((q) => completedIds.includes(q.id)).length;

  async function markDailyDone() {
    if (!dailyDone) await toggleComplete(dailyQuestion.id);
    recordActivity(today);
  }

  async function completeQuestion(id: string) {
    await toggleComplete(id);
    if (!completedIds.includes(id)) recordActivity(today);
  }

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-7 text-white md:p-10">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div><Badge className="bg-orange-500 text-white hover:bg-orange-500"><Sparkles className="mr-1.5 h-3.5 w-3.5" />Your learning hub</Badge><h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">What will you master today?</h1><p className="mt-3 max-w-2xl text-slate-300">A focused plan built from your existing progress. Everything here works in your browser.</p></div>
          <div className="grid grid-cols-3 gap-3">
            <HeroStat icon={<Flame />} value={streak} label="day streak" />
            <HeroStat icon={<CheckCircle2 />} value={totalCompleted} label="solved" />
            <HeroStat icon={<Bookmark />} value={bookmarkedIds.length} label="saved" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <Card className="border-orange-500/25 bg-gradient-to-br from-orange-500/10 to-transparent">
          <CardHeader className="flex-row items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.18em] text-orange-500">Daily challenge</p><CardTitle className="mt-2 text-2xl">{dailyQuestion.title}</CardTitle><p className="mt-2 text-sm text-muted-foreground">{dailyQuestion.topic} · {dailyQuestion.difficulty}</p></div><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orange-500 text-white"><Trophy className="h-6 w-6" /></div></CardHeader>
          <CardContent><p className="rounded-xl border bg-background/60 p-4 text-sm text-muted-foreground"><span className="font-bold text-foreground">Hint:</span> {dailyQuestion.note || "Break the problem into smaller cases before coding."}</p><div className="mt-5 flex flex-wrap gap-3"><Button asChild><a href={questionLink(dailyQuestion)} target="_blank" rel="noreferrer">Solve challenge <ExternalLink className="ml-2 h-4 w-4" /></a></Button><Button variant={dailyDone ? "secondary" : "outline"} onClick={markDailyDone} disabled={dailyDone}>{dailyDone ? <><Check className="mr-2 h-4 w-4" />Completed today</> : "Mark completed"}</Button></div></CardContent>
        </Card>

        <Card>
          <CardHeader><div className="flex items-center justify-between"><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-blue-500" />Today’s target</CardTitle><Select value={String(dailyGoal)} onValueChange={(value) => setDailyGoal(Number(value))}><SelectTrigger className="w-24"><SelectValue /></SelectTrigger><SelectContent>{[1, 3, 5, 7].map((goal) => <SelectItem key={goal} value={String(goal)}>{goal}/day</SelectItem>)}</SelectContent></Select></div></CardHeader>
          <CardContent className="space-y-3">{todayQueue.length ? todayQueue.map((question) => <QuestionRow key={question.id} question={question} completed={completedIds.includes(question.id)} bookmarked={bookmarkedIds.includes(question.id)} onComplete={() => completeQuestion(question.id)} onBookmark={() => toggleBookmark(question.id)} />) : <EmptyState text="You completed every DSA question. Excellent work!" />}</CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between"><div><CardTitle className="flex items-center gap-2"><RefreshCw className="h-5 w-5 text-violet-500" />Revision queue</CardTitle><p className="mt-2 text-sm text-muted-foreground">Bookmarks first, followed by solved questions.</p></div><Button size="sm" variant="outline" onClick={() => setRevisionSeed((value) => value + 5)} disabled={!revisionQueue.length}><RefreshCw className="mr-2 h-3.5 w-3.5" />Refresh</Button></CardHeader>
          <CardContent className="space-y-3">{revisionQueue.length ? revisionQueue.map((question) => <div key={question.id} className="flex items-center gap-3 rounded-xl border p-3"><button onClick={() => toggleRevised(question.id)} className="text-violet-500" aria-label="Toggle revised">{revisedIds.includes(question.id) ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}</button><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{question.title}</p><p className="text-xs text-muted-foreground">{question.topic}</p></div><Button asChild size="sm" variant="ghost"><a href={questionLink(question)} target="_blank" rel="noreferrer">Review</a></Button></div>) : <EmptyState text="Bookmark or complete questions to build your revision queue." />}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><CalendarCheck2 className="h-5 w-5 text-emerald-500" />Focus areas</CardTitle><p className="text-sm text-muted-foreground">Topics with the most room for improvement.</p></CardHeader>
          <CardContent className="space-y-5">{topicStats.slice(0, 5).map((item) => <div key={item.topic}><div className="mb-2 flex justify-between gap-3 text-sm"><span className="font-semibold">{item.topic}</span><span className="text-muted-foreground">{item.completed}/{item.total}</span></div><Progress value={item.percentage} className="h-2" /></div>)}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="gap-5 md:flex-row md:items-end md:justify-between"><div><CardTitle className="flex items-center gap-2 text-2xl"><BriefcaseBusiness className="h-6 w-6 text-blue-500" />Company preparation</CardTitle><p className="mt-2 text-sm text-muted-foreground">Practise from the company tags already available in your DSA sheet.</p></div><Select value={company} onValueChange={setCompany}><SelectTrigger className="w-full md:w-56"><SelectValue /></SelectTrigger><SelectContent>{featuredCompanies.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></CardHeader>
        <CardContent><div className="mb-5 flex items-center gap-4"><Progress value={companyQuestions.length ? (companyDone / companyQuestions.length) * 100 : 0} className="h-2 flex-1" /><span className="whitespace-nowrap text-sm font-bold">{companyDone}/{companyQuestions.length} solved</span></div><div className="grid gap-3 md:grid-cols-2">{companyQuestions.slice(0, 8).map((question) => <QuestionRow key={question.id} question={question} completed={completedIds.includes(question.id)} bookmarked={bookmarkedIds.includes(question.id)} onComplete={() => completeQuestion(question.id)} onBookmark={() => toggleBookmark(question.id)} />)}</div>{companyQuestions.length > 8 && <Button asChild variant="link" className="mt-4 px-0"><Link href="/dsa">View all in DSA sheet <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>}</CardContent>
      </Card>
    </div>
  );
}

function HeroStat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return <div className="min-w-24 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">{<span className="mx-auto block w-fit text-orange-400">{icon}</span>}<p className="mt-2 text-2xl font-black">{value}</p><p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p></div>;
}

function QuestionRow({ question, completed, bookmarked, onComplete, onBookmark }: { question: DSAQuestion; completed: boolean; bookmarked: boolean; onComplete: () => void; onBookmark: () => void }) {
  return <div className="flex items-center gap-3 rounded-xl border bg-card p-3"><button onClick={onComplete} className={completed ? "text-emerald-500" : "text-muted-foreground hover:text-emerald-500"} aria-label="Toggle complete">{completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}</button><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{question.title}</p><p className="truncate text-xs text-muted-foreground">{question.topic} · {question.difficulty}</p></div><button onClick={onBookmark} className={bookmarked ? "text-amber-500" : "text-muted-foreground hover:text-amber-500"} aria-label="Toggle bookmark"><Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} /></button><a href={questionLink(question)} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Open problem"><ExternalLink className="h-4 w-4" /></a></div>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-xl border border-dashed p-7 text-center text-sm text-muted-foreground">{text}</div>;
}
