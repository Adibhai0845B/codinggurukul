import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, CalendarClock, CheckCircle2, Circle, Play } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { calculateStreak, localDateKey, useLearningHub } from "@/hooks/useLearningHub";
import { usePlacementReadiness } from "@/hooks/usePlacementReadiness";
import { useLiveClasses } from "@/hooks/useLiveClasses";
import { dsaQuestions, type DSAQuestion } from "@/data/dsaQuestions";
import { cpQuestions } from "@/data/cpQuestions";
import { start100Questions } from "@/data/start100Questions";
import { Progress } from "@/components/ui/progress";

const problemUrl = (question: DSAQuestion) => question.leetcodeLink || question.gfgLink || "/dsa";

export default function Dashboard() {
  const username = useAuth((state) => state.username) || "Coder";
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const { completedIds, toggleComplete } = useProgress();
  const { dailyGoal, activeDays, recordActivity } = useLearningHub();
  const { checklistIds, confidence, interviewAnswers } = usePlacementReadiness();
  const liveClasses = useLiveClasses((state) => state.liveClasses);
  const today = localDateKey();

  const stats = useMemo(() => {
    const dsaDone = dsaQuestions.filter((q) => completedIds.includes(q.id)).length;
    const cpDone = cpQuestions.filter((q) => completedIds.includes(q.id)).length;
    const starterDone = start100Questions.filter((q) => completedIds.includes(q.id)).length;
    const total = dsaQuestions.length + cpQuestions.length + start100Questions.length;
    const solved = dsaDone + cpDone + starterDone;
    return { dsaDone, cpDone, starterDone, solved, total, percent: total ? Math.round((solved / total) * 100) : 0 };
  }, [completedIds]);

  const topicStats = useMemo(() => {
    const topics = new Map<string, { total: number; done: number }>();
    dsaQuestions.forEach((question) => {
      const value = topics.get(question.topic) || { total: 0, done: 0 };
      value.total += 1;
      if (completedIds.includes(question.id)) value.done += 1;
      topics.set(question.topic, value);
    });
    return [...topics.entries()].map(([topic, value]) => ({ topic, ...value, percent: Math.round((value.done / value.total) * 100) }))
      .filter((item) => item.done < item.total).sort((a, b) => a.percent - b.percent || b.total - a.total);
  }, [completedIds]);

  const studyPlan = useMemo(() => {
    const weakTopics = new Set(topicStats.slice(0, 3).map((item) => item.topic));
    const priority = dsaQuestions.filter((q) => weakTopics.has(q.topic) && !completedIds.includes(q.id));
    const rest = dsaQuestions.filter((q) => !weakTopics.has(q.topic) && !completedIds.includes(q.id));
    return [...priority, ...rest].slice(0, dailyGoal);
  }, [completedIds, dailyGoal, topicStats]);

  const upcomingClass = [...liveClasses].filter((session) => new Date(session.startTime).getTime() >= Date.now())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0];
  const confidenceScore = Object.values(confidence).reduce<number>((sum, value) => sum + value, 0);
  const answeredMocks = Object.values(interviewAnswers).filter((answer) => answer.trim().length >= 40).length;
  const readinessScore = Math.min(100, Math.round((stats.dsaDone / Math.max(1, dsaQuestions.length)) * 45) + checklistIds.length * 3 + confidenceScore * 2 + answeredMocks * 3);

  async function completeProblem(id: string) {
    await toggleComplete(id);
    if (!completedIds.includes(id)) recordActivity(today);
  }

  return <div className="student-dashboard pb-16 animate-in fade-in duration-500">
    <header className="border-b border-border pb-8 pt-2">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div><p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-blue-400"><span className="h-px w-8 bg-orange-500" />Overview</p><h1 className="mt-4 text-4xl font-black tracking-[-.04em] text-white md:text-5xl">Good to see you, <span className="text-blue-400">{username}.</span></h1><p className="mt-4 max-w-xl text-base leading-7 text-slate-400">One focused task at a time. Today’s queue starts with the topic that needs the most attention.</p>{!isLoggedIn && <p className="mt-3 text-sm text-slate-500">Your progress is saved on this device. Sign in anytime to sync it to your account.</p>}</div>
        <div className="grid grid-cols-3 border-y border-white/10 lg:w-[430px]">{[[stats.solved, "Problems solved"], [calculateStreak(activeDays), "Day streak"], [readinessScore + "%", "Placement score"]].map(([value, label], index) => <div key={String(label)} className={`py-5 ${index ? "border-l border-white/10 pl-5" : ""}`}><p className="text-3xl font-black text-white">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}</div>
      </div>
    </header>

    {studyPlan[0] && <section className="mt-8 grid gap-6 rounded-lg border border-blue-500/25 bg-blue-500/[.06] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-7"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-orange-500">Continue learning</p><h2 className="mt-3 text-2xl font-black text-white">{studyPlan[0].title}</h2><p className="mt-2 text-sm text-slate-400">{studyPlan[0].topic} · {studyPlan[0].difficulty} · Recommended from your current progress</p></div><a href={problemUrl(studyPlan[0])} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-500"><Play className="mr-2 h-4 w-4 fill-current" />Start problem</a></section>}

    <div className="grid lg:grid-cols-[1fr_340px]">
      <main id="today-plan" className="py-9 lg:border-r lg:border-white/10 lg:pr-10">
        <div className="flex items-end justify-between border-b border-white/10 pb-5"><div><p className="text-sm font-semibold text-orange-500">Today · {new Date().toLocaleDateString(undefined, { day: "2-digit", month: "short" })}</p><h2 className="mt-2 text-2xl font-black text-white">Your practice queue</h2></div><span className="text-sm text-slate-500">{studyPlan.length} tasks</span></div>
        <div>{studyPlan.length ? studyPlan.map((question, index) => <div key={question.id} className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/10 py-5"><span className="font-mono text-xs text-slate-600">{String(index + 1).padStart(2, "0")}</span><div className="min-w-0"><p className="truncate font-bold text-slate-100">{question.title}</p><p className="mt-1 text-xs text-slate-500">{question.topic} <span className="mx-1 text-slate-700">/</span> {question.difficulty}{index === 0 && <span className="ml-2 text-orange-500">Start here</span>}</p></div><div className="flex items-center gap-1 sm:gap-2"><button onClick={() => completeProblem(question.id)} className="grid h-10 w-10 place-items-center text-slate-500 transition hover:text-emerald-400" aria-label={`Mark ${question.title} complete`}><Circle className="h-5 w-5" /></button><a href={problemUrl(question)} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-1 px-2 text-sm font-bold text-blue-400 transition hover:text-orange-400"><span className="hidden sm:inline">Solve</span><ArrowRight className="h-4 w-4" /></a></div></div>) : <div className="border-b border-white/10 py-12 text-center text-slate-400"><CheckCircle2 className="mx-auto mb-3 h-7 w-7 text-emerald-400" />The entire DSA sheet is complete.</div>}</div>
        <Link href="/learn" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white">Open learning hub <ArrowRight className="h-4 w-4 text-orange-400" /></Link>

        <section className="mt-14"><div className="flex items-end justify-between border-b border-white/10 pb-5"><div><p className="font-mono text-xs text-slate-500">WEAK TOPICS</p><h2 className="mt-2 text-2xl font-black text-white">Where to focus next</h2></div><Link href="/progress" className="text-sm font-bold text-blue-400">Full report →</Link></div><div className="divide-y divide-white/10">{topicStats.slice(0, 3).map((item, index) => <div key={item.topic} className="grid grid-cols-[2rem_1fr_5rem] items-center gap-4 py-5"><span className="font-mono text-xs text-orange-400">0{index + 1}</span><div><div className="mb-2 flex justify-between"><span className="text-sm font-bold text-slate-200">{item.topic}</span><span className="text-xs text-slate-500">{item.done}/{item.total}</span></div><Progress value={item.percent} className="h-1.5" /></div><span className="text-right font-mono text-sm text-slate-400">{item.percent}%</span></div>)}</div></section>
      </main>

      <aside className="space-y-0 py-9 lg:pl-8">
        <section className="border-b border-white/10 pb-8"><p className="font-mono text-xs text-slate-500">PROGRESS</p><div className="mt-5 flex items-end justify-between"><p className="text-5xl font-black text-white">{stats.percent}<span className="text-xl text-blue-400">%</span></p><p className="text-right text-xs leading-5 text-slate-500">{stats.solved} of {stats.total}<br />problems complete</p></div><Progress value={stats.percent} className="mt-5 h-2" /><div className="mt-6 grid grid-cols-3 gap-3 text-center"><TinyStat value={stats.dsaDone} label="DSA" /><TinyStat value={stats.cpDone} label="CP" /><TinyStat value={stats.starterDone} label="Start 150" /></div></section>
        <section className="border-b border-white/10 py-8"><div className="flex items-center gap-2 text-sm font-bold text-white"><CalendarClock className="h-4 w-4 text-orange-400" />Next live class</div>{upcomingClass ? <div className="mt-5"><p className="font-mono text-xs text-blue-400">{new Date(upcomingClass.startTime).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" }).toUpperCase()} · {new Date(upcomingClass.startTime).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</p><h3 className="mt-3 text-lg font-black text-white">{upcomingClass.title}</h3><p className="mt-1 text-sm text-slate-500">{upcomingClass.topic} with {upcomingClass.instructor}</p></div> : <p className="mt-4 text-sm leading-6 text-slate-500">No class is scheduled right now. Check the class area for updates.</p>}<Link href="/live-classes" className="mt-5 inline-flex text-sm font-bold text-blue-400">View schedule →</Link></section>
        <section className="py-8"><p className="font-mono text-xs text-slate-500">QUICK LINKS</p><nav className="mt-3 divide-y divide-white/10">{[["DSA sheet", "/dsa"], ["Contests", "/contests"], ["Placement readiness", "/placement-readiness"], ["Code compiler", "/compiler"]].map(([label, href]) => <Link key={href} href={href} className="flex items-center justify-between py-3.5 text-sm font-semibold text-slate-300 transition hover:text-white"><span>{label}</span><ArrowRight className="h-4 w-4 text-slate-600" /></Link>)}</nav></section>
      </aside>
    </div>
  </div>;
}

function TinyStat({ value, label }: { value: number; label: string }) {
  return <div><p className="font-mono text-lg font-bold text-slate-200">{value}</p><p className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">{label}</p></div>;
}
