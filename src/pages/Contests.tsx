import ContestCard from "@/components/ContestCard";
import { contests } from "@/data/contests";

export default function Contests() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Programming Contests</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Competitive programming requires consistent participation. Here are the top platforms where you can test your skills against global competitors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>
    </div>
  );
}
