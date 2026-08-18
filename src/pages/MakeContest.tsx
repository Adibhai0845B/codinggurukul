import { useLocation } from "wouter";
import { LogOut, Radio, Trophy } from "lucide-react";
import ContestManager from "@/components/ContestManager";
import ContestResults from "@/components/ContestResults";
import LiveClassManager from "@/components/LiveClassManager";
import { Button } from "@/components/ui/button";
import { useContestAdminAuth } from "@/hooks/useContestAdminAuth";

export default function MakeContest() {
  const logout = useContestAdminAuth((state) => state.logout);
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/make-contest/login");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><div className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-400"><Trophy className="h-4 w-4" /> Contest Organizer</div><h1 className="text-3xl font-black">Make a Programming Contest</h1><p className="mt-2 text-muted-foreground">Schedule your contest and publish problems for students.</p></div>
        <Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" />Creator logout</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button asChild className="h-12 justify-start bg-blue-600 px-5 font-bold text-white hover:bg-blue-500"><a href="#contest"><Trophy className="mr-3 h-5 w-5" />Create a contest</a></Button>
        <Button asChild className="h-12 justify-start bg-emerald-600 px-5 font-bold text-white hover:bg-emerald-500"><a href="#live-class"><Radio className="mr-3 h-5 w-5" />Schedule a live class</a></Button>
      </div>
      <section id="live-class" className="scroll-mt-24"><LiveClassManager /></section>
      <section id="contest" className="scroll-mt-24"><ContestManager /></section>
      <ContestResults />
    </div>
  );
}
