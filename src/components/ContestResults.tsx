import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContests } from "@/hooks/useContests";
import { useContestSubmissions } from "@/hooks/useContestSubmissions";

export default function ContestResults() {
  const contests = useContests((state) => state.contests);
  const results = useContestSubmissions((state) => state.results);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-emerald-400" /> Student Results
        </CardTitle>
        <p className="text-sm text-muted-foreground">Results are visible only to an authenticated contest creator.</p>
      </CardHeader>
      <CardContent>
        {results.length === 0 ? (
          <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">No student results have been submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="border-b text-xs uppercase text-muted-foreground">
                <tr><th className="p-3">Student</th><th className="p-3">Contest</th><th className="p-3">Solved</th><th className="p-3">Score</th><th className="p-3">Submitted</th></tr>
              </thead>
              <tbody>
                {results.map((result) => {
                  const contest = contests.find((item) => item.id === result.contestId);
                  return (
                    <tr key={result.id} className="border-b last:border-0">
                      <td className="p-3 font-semibold">{result.username}</td>
                      <td className="p-3">{contest?.title || "Deleted contest"}</td>
                      <td className="p-3">{result.solvedProblems}/{result.totalProblems}</td>
                      <td className="p-3"><Badge className="bg-emerald-600">{result.score}/{result.maximumScore}</Badge></td>
                      <td className="p-3 text-muted-foreground">{new Date(result.endedAt).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
