import { useState } from "react";
import { CalendarPlus, Pencil, Plus, Trash2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type ContestProblem, useContests } from "@/hooks/useContests";

const emptyProblem = (): ContestProblem => ({
  id: "",
  title: "",
  statement: "",
  inputFormat: "",
  outputFormat: "",
  constraints: "",
  sampleInput: "",
  sampleOutput: "",
  points: 100,
  testCases: [{ id: "", input: "", expectedOutput: "" }],
});

export default function ContestManager() {
  const { contests, addContest, updateContest, deleteContest } = useContests();
  const [showForm, setShowForm] = useState(false);
  const [editingContestId, setEditingContestId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [problems, setProblems] = useState<ContestProblem[]>([emptyProblem()]);

  const updateProblem = (index: number, field: keyof ContestProblem, value: string | number) => {
    setProblems((current) =>
      current.map((problem, problemIndex) =>
        problemIndex === index ? { ...problem, [field]: value } : problem,
      ),
    );
  };

  const updateTestCase = (problemIndex: number, testIndex: number, field: "input" | "expectedOutput", value: string) => {
    setProblems((current) => current.map((problem, index) => index === problemIndex ? {
      ...problem,
      testCases: problem.testCases.map((testCase, caseIndex) => caseIndex === testIndex ? { ...testCase, [field]: value } : testCase),
    } : problem));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartTime("");
    setDurationMinutes(90);
    setDifficulty("Beginner");
    setProblems([emptyProblem()]);
    setEditingContestId(null);
    setShowForm(false);
  };

  const startEditing = (contest: (typeof contests)[number]) => {
    setTitle(contest.title);
    setDescription(contest.description);
    setStartTime(contest.startTime);
    setDurationMinutes(contest.durationMinutes);
    setDifficulty(contest.difficulty);
    setProblems(contest.problems.map((problem) => ({
      ...problem,
      testCases: problem.testCases.map((testCase) => ({ ...testCase })),
    })));
    setEditingContestId(contest.id);
    setShowForm(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const contest = { title, description, startTime, durationMinutes, difficulty, problems };
    if (editingContestId) updateContest(editingContestId, contest);
    else addContest(contest);
    resetForm();
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-amber-400" /> Contest Management</CardTitle>
          <p className="mt-1 text-sm text-zinc-400">Create programming contests and add problem statements.</p>
        </div>
        <Button onClick={() => showForm ? resetForm() : setShowForm(true)} className="bg-blue-600 text-white hover:bg-blue-700">
          <CalendarPlus className="mr-2 h-4 w-4" /> {showForm ? "Cancel" : "Create Contest"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-blue-500/30 bg-zinc-950/50 p-5">
            {editingContestId && <h3 className="text-lg font-bold text-blue-400">Edit Contest</h3>}
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-zinc-300">Contest title *
                <Input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Weekly Coding Challenge" className="mt-2 bg-zinc-900" />
              </label>
              <label className="space-y-2 text-sm text-zinc-300">Start date and time *
                <Input required type="datetime-local" value={startTime} onChange={(event) => setStartTime(event.target.value)} className="mt-2 bg-zinc-900" />
              </label>
              <label className="space-y-2 text-sm text-zinc-300">Duration (minutes) *
                <Input required type="number" min={10} max={1440} value={durationMinutes} onChange={(event) => setDurationMinutes(Number(event.target.value))} className="mt-2 bg-zinc-900" />
              </label>
              <label className="space-y-2 text-sm text-zinc-300">Difficulty
                <select value={difficulty} onChange={(event) => setDifficulty(event.target.value as typeof difficulty)} className="mt-2 flex h-9 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm">
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </label>
            </div>
            <label className="block space-y-2 text-sm text-zinc-300">Description *
              <Textarea required value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the contest rules and goals..." className="mt-2 bg-zinc-900" />
            </label>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">Problems ({problems.length})</h3>
                <Button type="button" variant="outline" onClick={() => setProblems((current) => [...current, emptyProblem()])}><Plus className="mr-2 h-4 w-4" /> Add Problem</Button>
              </div>
              {problems.map((problem, index) => (
                <div key={index} className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/70 p-4">
                  <div className="flex items-center justify-between"><h4 className="font-semibold text-blue-400">Problem {String.fromCharCode(65 + index)}</h4>
                    {problems.length > 1 && <Button type="button" variant="ghost" onClick={() => setProblems((current) => current.filter((_, i) => i !== index))} className="text-red-400"><Trash2 className="h-4 w-4" /></Button>}
                  </div>
                  <div className="grid gap-4 md:grid-cols-[1fr_140px]">
                    <Input required value={problem.title} onChange={(event) => updateProblem(index, "title", event.target.value)} placeholder="Problem title *" />
                    <Input required type="number" min={1} value={problem.points} onChange={(event) => updateProblem(index, "points", Number(event.target.value))} placeholder="Points" />
                  </div>
                  <Textarea required value={problem.statement} onChange={(event) => updateProblem(index, "statement", event.target.value)} placeholder="Problem statement *" className="min-h-28" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Textarea value={problem.inputFormat} onChange={(event) => updateProblem(index, "inputFormat", event.target.value)} placeholder="Input format" />
                    <Textarea value={problem.outputFormat} onChange={(event) => updateProblem(index, "outputFormat", event.target.value)} placeholder="Output format" />
                    <Textarea value={problem.constraints} onChange={(event) => updateProblem(index, "constraints", event.target.value)} placeholder="Constraints" />
                    <div />
                    <Textarea value={problem.sampleInput} onChange={(event) => updateProblem(index, "sampleInput", event.target.value)} placeholder="Sample input" className="font-mono" />
                    <Textarea value={problem.sampleOutput} onChange={(event) => updateProblem(index, "sampleOutput", event.target.value)} placeholder="Sample output" className="font-mono" />
                  </div>
                  <div className="space-y-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                    <div className="flex items-center justify-between"><div><h5 className="font-semibold text-amber-300">Judge test cases *</h5><p className="text-xs text-zinc-500">These inputs and expected outputs are used for automatic judging.</p></div>
                      <Button type="button" size="sm" variant="outline" onClick={() => setProblems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, testCases: [...item.testCases, { id: "", input: "", expectedOutput: "" }] } : item))}><Plus className="mr-1 h-3 w-3" />Test case</Button>
                    </div>
                    {problem.testCases.map((testCase, testIndex) => (
                      <div key={testIndex} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                        <Textarea value={testCase.input} onChange={(event) => updateTestCase(index, testIndex, "input", event.target.value)} placeholder={`Test ${testIndex + 1} input (can be empty)`} className="font-mono" />
                        <Textarea required value={testCase.expectedOutput} onChange={(event) => updateTestCase(index, testIndex, "expectedOutput", event.target.value)} placeholder={`Test ${testIndex + 1} expected output`} className="font-mono" />
                        {problem.testCases.length > 1 && <Button type="button" variant="ghost" className="text-red-400" onClick={() => setProblems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, testCases: item.testCases.filter((_, caseIndex) => caseIndex !== testIndex) } : item))}><Trash2 className="h-4 w-4" /></Button>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end"><Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700">{editingContestId ? "Save Changes" : "Publish Contest"}</Button></div>
          </form>
        )}

        {contests.length === 0 ? <p className="rounded-lg border border-dashed border-zinc-700 p-6 text-center text-sm text-zinc-500">No custom contests yet.</p> : (
          <div className="space-y-3">{contests.map((contest) => (
            <div key={contest.id} className="flex items-center justify-between rounded-lg border border-zinc-800 p-4">
              <div><p className="font-semibold text-white">{contest.title}</p><p className="text-xs text-zinc-400">{new Date(contest.startTime).toLocaleString()} · {contest.durationMinutes} min · {contest.problems.length} problems</p></div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" onClick={() => startEditing(contest)} className="text-blue-400"><Pencil className="mr-2 h-4 w-4" /> Edit</Button>
                <Button variant="ghost" onClick={() => { if (window.confirm("Delete this contest?")) deleteContest(contest.id); }} className="text-red-400"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
              </div>
            </div>
          ))}</div>
        )}
      </CardContent>
    </Card>
  );
}
