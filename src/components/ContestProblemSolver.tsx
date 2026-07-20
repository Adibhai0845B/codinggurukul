import { useEffect, useState } from "react";
import { CheckCircle2, Code2, Loader2, Play, Send, Trophy, XCircle } from "lucide-react";
import Editor from "@/Editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContestProblem } from "@/hooks/useContests";
import { useContestSubmissions } from "@/hooks/useContestSubmissions";
import useAuth from "@/hooks/useAuth";
import { CONTEST_LANGUAGES, type ContestLanguage, executeCode, normalizeOutput } from "@/lib/codeExecution";

type JudgeFeedback = { verdict: string; message: string; passed: number; total: number };

export default function ContestProblemSolver({ contestId, problem, isEnded }: { contestId: string; problem: ContestProblem; isEnded: boolean }) {
  const [language, setLanguage] = useState<ContestLanguage>("cpp");
  const [codeByLanguage, setCodeByLanguage] = useState<Record<ContestLanguage, string>>({
    cpp: CONTEST_LANGUAGES.cpp.starter,
    java: CONTEST_LANGUAGES.java.starter,
    python: CONTEST_LANGUAGES.python.starter,
  });
  const [judging, setJudging] = useState(false);
  const [feedback, setFeedback] = useState<JudgeFeedback | null>(null);
  const username = useAuth((state) => state.username) || "anonymous";
  const addSubmission = useContestSubmissions((state) => state.addSubmission);
  const activeLanguage = CONTEST_LANGUAGES[language];

  useEffect(() => setFeedback(null), [problem.id]);

  const judge = async (sampleOnly: boolean) => {
    if (judging || !codeByLanguage[language].trim()) return;
    const sampleCase = { id: "sample", input: problem.sampleInput, expectedOutput: problem.sampleOutput };
    const cases = sampleOnly ? [sampleCase] : (problem.testCases?.length ? problem.testCases : [sampleCase]);
    if (cases.some((testCase) => !testCase.expectedOutput.trim())) {
      setFeedback({ verdict: "Cannot judge", message: "This problem has no expected test output.", passed: 0, total: cases.length });
      return;
    }

    setJudging(true);
    setFeedback({ verdict: "Judging", message: "Running your code against test cases...", passed: 0, total: cases.length });
    let passed = 0;
    let errorMessage = "";

    try {
      for (let index = 0; index < cases.length; index += 1) {
        const result = await executeCode(codeByLanguage[language], language, cases[index].input);
        const executionFailed = result.status
          ? result.status.id !== 3
          : Boolean(result.compile_output || result.stderr || result.message);
        const executionError = executionFailed
          ? result.compile_output || result.stderr || result.message || result.status?.description || "Execution failed."
          : null;
        if (executionError) {
          errorMessage = String(executionError);
          break;
        }
        if (normalizeOutput(result.stdout || "") === normalizeOutput(cases[index].expectedOutput)) passed += 1;
        else {
          errorMessage = sampleOnly
            ? `Expected:\n${cases[index].expectedOutput}\n\nYour output:\n${result.stdout || "(no output)"}`
            : `Wrong answer on test case ${index + 1}.`;
          break;
        }
      }

      const accepted = passed === cases.length;
      const isWrongAnswer = errorMessage.startsWith("Wrong answer") || errorMessage.startsWith("Expected:");
      const verdict: "Accepted" | "Wrong Answer" | "Error" = accepted ? "Accepted" : isWrongAnswer ? "Wrong Answer" : "Error";
      setFeedback({ verdict, message: accepted ? `All ${cases.length} test cases passed.` : errorMessage, passed, total: cases.length });
      if (!sampleOnly) addSubmission({ contestId, problemId: problem.id, username, language, passed, total: cases.length, score: accepted ? problem.points : 0, verdict });
    } catch (error) {
      const message = error instanceof Error ? error.message : "The judge could not run your submission.";
      setFeedback({ verdict: "Error", message, passed, total: cases.length });
      if (!sampleOnly) addSubmission({ contestId, problemId: problem.id, username, language, passed, total: cases.length, score: 0, verdict: "Error" });
    } finally {
      setJudging(false);
    }
  };

  return (
    <Card>
      <CardHeader><div className="flex flex-wrap items-start justify-between gap-3"><CardTitle>{problem.title}</CardTitle><Badge variant="secondary"><Trophy className="mr-1 h-3 w-3" />{problem.points} points</Badge></div></CardHeader>
      <CardContent className="space-y-6">
        <section><h3 className="mb-2 font-bold">Problem</h3><p className="whitespace-pre-wrap text-sm text-muted-foreground">{problem.statement}</p></section>
        {problem.inputFormat && <section><h3 className="mb-2 font-bold">Input format</h3><p className="whitespace-pre-wrap text-sm text-muted-foreground">{problem.inputFormat}</p></section>}
        {problem.outputFormat && <section><h3 className="mb-2 font-bold">Output format</h3><p className="whitespace-pre-wrap text-sm text-muted-foreground">{problem.outputFormat}</p></section>}
        {problem.constraints && <section><h3 className="mb-2 font-bold">Constraints</h3><pre className="whitespace-pre-wrap rounded-lg bg-slate-950 p-3 text-sm">{problem.constraints}</pre></section>}
        <div className="grid gap-4 md:grid-cols-2"><div><h3 className="mb-2 font-bold">Sample input</h3><pre className="min-h-16 whitespace-pre-wrap rounded-lg bg-slate-950 p-3 text-sm">{problem.sampleInput || "—"}</pre></div><div><h3 className="mb-2 font-bold">Sample output</h3><pre className="min-h-16 whitespace-pre-wrap rounded-lg bg-slate-950 p-3 text-sm text-emerald-300">{problem.sampleOutput || "—"}</pre></div></div>

        {!isEnded && <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#10131a]">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2"><span className="flex items-center gap-2 text-sm font-bold"><Code2 className="h-4 w-4 text-blue-400" />Solution</span><select value={language} onChange={(event) => setLanguage(event.target.value as ContestLanguage)} disabled={judging} className="rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm"><option value="cpp">C++</option><option value="java">Java</option><option value="python">Python</option></select></div>
          <Editor code={codeByLanguage[language]} setCode={(code) => setCodeByLanguage((current) => ({ ...current, [language]: code }))} language={activeLanguage.editorLanguage} onRun={() => judge(true)} />
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-800 p-3"><Button variant="outline" onClick={() => judge(true)} disabled={judging}><Play className="mr-2 h-4 w-4" />Run sample</Button><Button onClick={() => judge(false)} disabled={judging} className="bg-emerald-600 text-white hover:bg-emerald-500">{judging ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}Submit solution</Button></div>
        </div>}

        {feedback && <div aria-live="polite" className={`rounded-xl border p-4 ${feedback.verdict === "Accepted" ? "border-emerald-500/30 bg-emerald-500/10" : feedback.verdict === "Judging" ? "border-blue-500/30 bg-blue-500/10" : "border-red-500/30 bg-red-500/10"}`}><div className="flex items-center gap-2 font-bold">{feedback.verdict === "Accepted" ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : feedback.verdict === "Judging" ? <Loader2 className="h-5 w-5 animate-spin text-blue-400" /> : <XCircle className="h-5 w-5 text-red-400" />}{feedback.verdict}</div><pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-muted-foreground">{feedback.message}</pre><p className="mt-2 text-xs text-muted-foreground">Passed: {feedback.passed}/{feedback.total}</p></div>}
      </CardContent>
    </Card>
  );
}
