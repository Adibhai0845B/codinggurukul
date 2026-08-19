import { Link, useLocation } from "wouter";
import {
  ArrowLeft, BarChart3, BookOpen, BriefcaseBusiness, ChevronRight, Code2,
  FileCode2, LayoutDashboard, Map, Radio, Trophy,
} from "lucide-react";
import { dsaQuestions } from "@/data/dsaQuestions";
import { cpQuestions } from "@/data/cpQuestions";
import { start100Questions } from "@/data/start100Questions";
import { useProgress } from "@/hooks/useProgress";
import { Progress } from "@/components/ui/progress";

const groups = [
  {
    label: "Workspace",
    links: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/learn", label: "My learning hub", icon: BookOpen },
      { href: "/live-classes", label: "Live classes", icon: Radio },
    ],
  },
  {
    label: "Practice",
    links: [
      { href: "/start-100", label: "Start 150", icon: FileCode2 },
      { href: "/dsa", label: "DSA sheet", icon: Code2 },
      { href: "/company-specific", label: "Company Specific Sheet", icon: BriefcaseBusiness },
      { href: "/cp", label: "CP sheet", icon: Trophy },
      { href: "/contests", label: "Contests", icon: Trophy },
      { href: "/compiler", label: "Compiler", icon: Code2 },
    ],
  },
  {
    label: "Career",
    links: [
      { href: "/roadmap", label: "My roadmap", icon: Map },
      { href: "/placement-readiness", label: "Placement readiness", icon: BriefcaseBusiness },
      { href: "/progress", label: "Progress report", icon: BarChart3 },
    ],
  },
];

export default function StudentSidebar() {
  const [location] = useLocation();
  const completedIds = useProgress((state) => state.completedIds);
  const allIds = new Set([...dsaQuestions, ...cpQuestions, ...start100Questions].map((question) => question.id));
  const completed = completedIds.filter((id) => allIds.has(id)).length;
  const total = allIds.size;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  const isActive = (href: string) => location === href || (href === "/contests" && location.startsWith("/contests/"));

  return <aside className="sticky top-[76px] hidden h-[calc(100vh-76px)] w-[248px] shrink-0 border-r bg-white lg:flex lg:flex-col dark:border-white/10 dark:bg-[#070c15]">
    <div className="flex-1 overflow-y-auto px-4 py-7">
      <p className="px-3 text-sm font-bold text-slate-900 dark:text-slate-200">Student portal</p>
      <Link href="/" className="mt-4 flex h-10 items-center gap-3 rounded-md border px-3 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to website</span>
      </Link>
      <nav className="mt-6 space-y-7">
        {groups.map((group) => <section key={group.label}>
          <p className="mb-2 px-3 text-xs font-semibold text-slate-400 dark:text-slate-600">{group.label}</p>
          <div className="space-y-1">{group.links.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return <Link key={href} href={href} className={`group flex h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-950/20" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"}`}>
              <Icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-600 group-hover:text-blue-400"}`} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="h-3.5 w-3.5 opacity-70" />}
            </Link>;
          })}</div>
        </section>)}
      </nav>
    </div>
    <div className="border-t border-white/10 p-5">
      <div className="flex items-center justify-between text-xs"><span className="font-bold text-slate-300">Course progress</span><span className="font-mono text-blue-400">{percentage}%</span></div>
      <Progress value={percentage} className="mt-3 h-1.5" />
      <p className="mt-3 text-[11px] leading-5 text-slate-600">{completed} of {total} practice problems completed</p>
    </div>
  </aside>;
}
