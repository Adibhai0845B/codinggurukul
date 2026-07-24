import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight, BookOpenCheck, BriefcaseBusiness, Check, CheckCircle2, ChevronRight,
  Circle, Code2, FileText, Gauge, MessageSquareText, RefreshCw, Rocket, Target, Trophy,
} from "lucide-react";
import { dsaQuestions } from "@/data/dsaQuestions";
import { cpQuestions } from "@/data/cpQuestions";
import { start100Questions } from "@/data/start100Questions";
import { useProgress } from "@/hooks/useProgress";
import { type ConfidenceLevel, usePlacementReadiness } from "@/hooks/usePlacementReadiness";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const checklist = [
  { id: "resume-one-page", group: "Resume", label: "Resume is concise and one page" },
  { id: "resume-impact", group: "Resume", label: "Projects use measurable impact statements" },
  { id: "resume-links", group: "Resume", label: "GitHub, LinkedIn and portfolio links work" },
  { id: "project-depth", group: "Projects", label: "I can explain one project end-to-end" },
  { id: "project-decisions", group: "Projects", label: "I can defend technical decisions and trade-offs" },
  { id: "intro", group: "Interview", label: "My 60-second introduction is prepared" },
  { id: "star-stories", group: "Interview", label: "I have three STAR-format behavioral stories" },
  { id: "mock", group: "Interview", label: "I completed a timed mock interview" },
  { id: "company-research", group: "Applications", label: "I research every company before applying" },
  { id: "documents", group: "Applications", label: "Resume, marksheets and IDs are organized" },
];

const fundamentals = ["OOP", "DBMS", "Operating Systems", "Computer Networks", "SQL", "System Design"];

const interviewQuestions = [
  "Tell me about yourself and why you chose software engineering.",
  "Explain your strongest project as if I were a new team member.",
  "Describe a difficult bug you found and how you solved it.",
  "What happens after you enter a URL in a browser?",
  "Explain process versus thread with a practical example.",
  "How would you improve the performance of a slow database query?",
  "Tell me about a time you disagreed with a teammate.",
  "Why should we hire you for this role?",
];

const confidenceLabels = ["Not started", "Learning", "Comfortable", "Interview ready"];

export default function PlacementReadiness() {
  const { completedIds } = useProgress();
  const { checklistIds, confidence, interviewAnswers, toggleChecklist, setConfidence, saveInterviewAnswer } = usePlacementReadiness();
  const [questionIndex, setQuestionIndex] = useState(0);
  const activeQuestion = interviewQuestions[questionIndex];

  const dsaSolved = dsaQuestions.filter((q) => completedIds.includes(q.id)).length;
  const cpSolved = cpQuestions.filter((q) => completedIds.includes(q.id)).length;
  const starterSolved = start100Questions.filter((q) => completedIds.includes(q.id)).length;
  const confidenceTotal = fundamentals.reduce((sum, topic) => sum + (confidence[topic] || 0), 0);
  const answeredMocks = Object.values(interviewAnswers).filter((answer) => answer.trim().length >= 40).length;

  const sections = useMemo(() => {
    const problemSolving = Math.min(35, Math.round((dsaSolved / 100) * 25) + Math.round((cpSolved / 50) * 7) + Math.round((starterSolved / 100) * 3));
    const fundamentalsScore = Math.round((confidenceTotal / (fundamentals.length * 3)) * 25);
    const checklistScore = Math.round((checklistIds.length / checklist.length) * 25);
    const interviewScore = Math.min(15, answeredMocks * 5);
    return [
      { label: "Problem solving", score: problemSolving, max: 35, icon: Code2, href: "/learn" },
      { label: "CS fundamentals", score: fundamentalsScore, max: 25, icon: BookOpenCheck, href: "#fundamentals" },
      { label: "Career profile", score: checklistScore, max: 25, icon: FileText, href: "#checklist" },
      { label: "Interview practice", score: interviewScore, max: 15, icon: MessageSquareText, href: "#mock" },
    ];
  }, [answeredMocks, checklistIds.length, confidenceTotal, cpSolved, dsaSolved, starterSolved]);

  const readinessScore = sections.reduce((sum, section) => sum + section.score, 0);
  const readiness = readinessScore >= 80 ? "Interview ready" : readinessScore >= 55 ? "Building momentum" : readinessScore >= 30 ? "Foundation forming" : "Getting started";
  const nextAction = [...sections].sort((a, b) => (a.score / a.max) - (b.score / b.max))[0];

  function nextQuestion() {
    setQuestionIndex((current) => (current + 1) % interviewQuestions.length);
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 p-7 text-white md:p-10">
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div><Badge className="bg-emerald-500 text-white hover:bg-emerald-500"><Rocket className="mr-1.5 h-3.5 w-3.5" />Placement Readiness Centre</Badge><h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">Turn preparation into proof.</h1><p className="mt-3 max-w-2xl text-slate-300">Your score combines coding progress, CS fundamentals, career preparation and interview practice. All new information stays in this browser.</p><Button asChild className="mt-6 bg-white text-slate-950 hover:bg-slate-100"><a href={nextAction.href}>Improve {nextAction.label.toLowerCase()} <ArrowRight className="ml-2 h-4 w-4" /></a></Button></div>
          <div className="relative mx-auto grid h-52 w-52 place-items-center rounded-full bg-[conic-gradient(#10b981_var(--score),rgba(255,255,255,.10)_0)] p-3" style={{ "--score": `${readinessScore}%` } as React.CSSProperties}><div className="grid h-full w-full place-items-center rounded-full bg-slate-950 text-center"><div><Gauge className="mx-auto h-7 w-7 text-emerald-400" /><p className="mt-2 text-5xl font-black">{readinessScore}</p><p className="mt-1 text-xs font-bold uppercase tracking-widest text-emerald-300">{readiness}</p></div></div></div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{sections.map(({ icon: Icon, ...section }) => <Card key={section.label}><CardContent className="p-5"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span><span className="text-lg font-black">{section.score}<span className="text-xs font-medium text-muted-foreground">/{section.max}</span></span></div><p className="mt-4 font-bold">{section.label}</p><Progress value={(section.score / section.max) * 100} className="mt-3 h-2" /></CardContent></Card>)}</div>

      <Card id="fundamentals">
        <CardHeader><CardTitle className="flex items-center gap-2 text-2xl"><BookOpenCheck className="h-6 w-6 text-blue-500" />CS fundamentals check</CardTitle><p className="text-sm text-muted-foreground">Rate yourself honestly. The goal is to identify what to revise next.</p></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">{fundamentals.map((topic) => <div key={topic} className="rounded-2xl border p-4"><div className="mb-3 flex items-center justify-between"><p className="font-bold">{topic}</p><Badge variant="outline">{confidenceLabels[confidence[topic] || 0]}</Badge></div><div className="grid grid-cols-4 gap-2">{([0, 1, 2, 3] as ConfidenceLevel[]).map((level) => <button key={level} onClick={() => setConfidence(topic, level)} className={`h-2 rounded-full transition ${level <= (confidence[topic] || 0) ? "bg-blue-500" : "bg-secondary hover:bg-blue-500/40"}`} aria-label={`Set ${topic} confidence to ${confidenceLabels[level]}`} />)}</div></div>)}</CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card id="checklist">
          <CardHeader><CardTitle className="flex items-center gap-2 text-2xl"><FileText className="h-6 w-6 text-orange-500" />Placement checklist</CardTitle><p className="text-sm text-muted-foreground">{checklistIds.length}/{checklist.length} essentials completed</p></CardHeader>
          <CardContent className="space-y-2">{checklist.map((item) => { const checked = checklistIds.includes(item.id); return <button key={item.id} onClick={() => toggleChecklist(item.id)} className="flex w-full items-start gap-3 rounded-xl border p-3 text-left transition hover:bg-secondary/50"><span className={checked ? "text-emerald-500" : "text-muted-foreground"}>{checked ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}</span><span className="flex-1"><span className={`block text-sm font-semibold ${checked ? "text-muted-foreground line-through" : ""}`}>{item.label}</span><span className="mt-1 block text-xs text-muted-foreground">{item.group}</span></span></button>})}</CardContent>
        </Card>

        <Card id="mock">
          <CardHeader><div className="flex items-start justify-between gap-4"><div><CardTitle className="flex items-center gap-2 text-2xl"><MessageSquareText className="h-6 w-6 text-violet-500" />Mock interview room</CardTitle><p className="mt-2 text-sm text-muted-foreground">Write a structured answer of at least 40 characters to earn practice credit.</p></div><Button size="icon" variant="outline" onClick={nextQuestion} aria-label="Next question"><RefreshCw className="h-4 w-4" /></Button></div></CardHeader>
          <CardContent><Badge variant="secondary">Question {questionIndex + 1} of {interviewQuestions.length}</Badge><h3 className="mt-5 text-xl font-black leading-8">{activeQuestion}</h3><Textarea className="mt-5 min-h-48 resize-y" placeholder="Structure your answer with context, action, reasoning and result..." value={interviewAnswers[activeQuestion] || ""} onChange={(event) => saveInterviewAnswer(activeQuestion, event.target.value)} /><div className="mt-4 flex items-center justify-between text-xs text-muted-foreground"><span>{(interviewAnswers[activeQuestion] || "").length} characters</span>{(interviewAnswers[activeQuestion] || "").trim().length >= 40 && <span className="flex items-center gap-1 text-emerald-500"><Check className="h-4 w-4" />Practice completed</span>}</div><Button onClick={nextQuestion} className="mt-5 w-full">Next interview question <ChevronRight className="ml-2 h-4 w-4" /></Button></CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/25 bg-blue-500/5"><CardContent className="flex flex-col items-start justify-between gap-5 p-6 md:flex-row md:items-center"><div><p className="text-xs font-black uppercase tracking-widest text-blue-500">Recommended next action</p><h2 className="mt-2 text-2xl font-black">Improve your {nextAction.label.toLowerCase()} score</h2><p className="mt-1 text-sm text-muted-foreground">This is currently your lowest-scoring readiness area.</p></div><Button asChild><a href={nextAction.href}>Start now <Target className="ml-2 h-4 w-4" /></a></Button></CardContent></Card>
    </div>
  );
}
