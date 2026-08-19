import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, BriefcaseBusiness, ChevronDown, Code2, FileCode2, LayoutDashboard, LogIn, LogOut, Menu, Trophy, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import ThemeToggle from "./ThemeToggle";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Programs" },
  { href: "/b2b", label: "B2B Initiative" },
  { href: "/about", label: "About" },
];

const portalRoots = ["/dashboard", "/learn", "/live-classes", "/placement-readiness", "/roadmap", "/start-100", "/dsa", "/company-specific", "/cp", "/contests", "/progress", "/compiler"];

const sheetLinks = [
  { href: "/start-100", label: "Start 150 Sheet", description: "Beginner-friendly coding practice", icon: FileCode2 },
  { href: "/dsa", label: "DSA Sheet", description: "Interview patterns by topic", icon: Code2 },
  { href: "/company-specific", label: "Company Specific Sheet", description: "Prepare for your target company", icon: BriefcaseBusiness },
  { href: "/cp", label: "CP Sheet", description: "Rating-wise competitive programming", icon: Trophy },
];

export default function Navbar() {
  const [dashboardTransition, setDashboardTransition] = useState(false);
  const [location, setLocation] = useLocation();
  const isLoggedIn = useAuth(state => state.isLoggedIn);
  const username = useAuth(state => state.username);
  const logout = useAuth(state => state.logout);
  const resetProgress = useProgress(state => state.resetProgress);
  const isPortal = portalRoots.some(path => location === path || location.startsWith(`${path}/`));
  const active = (href: string) => href === "/" ? location === "/" : location.startsWith(href);
  const handleLogout = () => {
    logout();
    resetProgress();
    setLocation("/");
  };
  const openDashboard = () => {
    if (location === "/dashboard") return;
    setDashboardTransition(true);
  };

  useEffect(() => {
    if (!dashboardTransition) return;
    const timer = window.setTimeout(() => {
      setLocation("/dashboard");
      setDashboardTransition(false);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [dashboardTransition, setLocation]);

  const mainLinks = isPortal
    ? [{ href: "/", label: "Home" }, { href: "/dashboard", label: "Dashboard" }]
    : publicLinks;

  return <>
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#060b14]/95 text-white backdrop-blur-lg">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Coding Gurukul home">
          <img src="/logo.png" alt="Coding Gurukul" className="h-10 w-10 rounded-lg bg-white p-0.5" />
          <div>
            <p className="font-extrabold leading-tight tracking-tight">Coding Gurukul</p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[.2em] text-slate-500">Learn · Practise · Perform</p>
          </div>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {mainLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${active(link.href) ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition ${sheetLinks.some((link) => active(link.href)) ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>
                Sheets <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={12} className="w-80 rounded-xl border-white/10 bg-[#0b1220] p-2 text-white shadow-2xl shadow-black/40">
              <DropdownMenuLabel className="px-3 py-3"><span className="block text-sm font-extrabold">Practice sheets</span><span className="mt-1 block text-xs font-normal text-slate-400">Choose a structured path and start practising.</span></DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {sheetLinks.map(({ href, label, description, icon: Icon }) => <DropdownMenuItem key={href} asChild className="cursor-pointer rounded-lg p-0 focus:bg-white/5"><Link href={href} className="flex w-full items-center gap-3 px-3 py-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-500/10 text-blue-300"><Icon className="h-4 w-4" /></span><span><span className="block text-sm font-bold">{label}</span><span className="mt-0.5 block text-xs text-slate-400">{description}</span></span></Link></DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="ml-3 hidden items-center gap-2 border-l border-white/10 pl-3 lg:flex">
          <ThemeToggle />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pl-1 pr-3 text-sm font-bold transition hover:border-blue-400 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" aria-label="Open profile and learning menu">
                  <span className="relative grid h-8 w-8 place-items-center rounded-full bg-blue-500 text-white"><UserRound className="h-4 w-4" /><span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#060b14] bg-emerald-400" /></span>
                  <span>My Profile</span><ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={10} className="w-72 rounded-xl border-white/10 bg-[#0b1220] p-2 text-white shadow-2xl shadow-black/40">
                <DropdownMenuLabel className="flex items-center gap-3 px-2 py-3 font-normal">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue-500 text-white"><UserRound className="h-5 w-5" /></span>
                  <span className="min-w-0"><span className="block truncate text-sm font-extrabold text-white">{username || "Student"}</span><span className="mt-0.5 block text-xs text-slate-400">Student account</span></span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 bg-white/10" />
                <DropdownMenuItem className="mt-2 cursor-pointer rounded-lg p-0 focus:bg-transparent" onSelect={openDashboard}>
                  <button type="button" className="cg-dashboard-action flex w-full items-center gap-3 rounded-lg bg-blue-500 px-3 py-3 font-bold text-white transition hover:bg-blue-400">
                    <span className="grid h-8 w-8 place-items-center rounded-md bg-white/15"><LayoutDashboard className="h-4 w-4" /></span>
                    <span>Overview</span>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="mt-2 cursor-pointer rounded-lg p-0 focus:bg-white/5"><Link href="/learn" className="flex w-full items-center gap-3 px-3 py-3 font-bold"><span className="grid h-8 w-8 place-items-center rounded-md bg-orange-400/10 text-orange-300"><BookOpen className="h-4 w-4" /></span><span>My learning hub</span></Link></DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="mt-2 cursor-pointer rounded-lg border border-red-400/15 bg-red-400/[.07] px-3 py-3 font-semibold text-red-300 focus:bg-red-400/15 focus:text-red-200">
                  <span className="mr-3 grid h-8 w-8 place-items-center rounded-md bg-red-400/10"><LogOut className="h-4 w-4" /></span>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pl-1 pr-3 text-sm font-bold text-white shadow-sm transition hover:border-blue-400 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" aria-label="Open profile and learning menu">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white ring-2 ring-blue-400/20 transition group-hover:ring-blue-400/50"><UserRound className="h-4 w-4" /></span>
                  <span>My Profile</span><ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={10} className="w-72 rounded-xl border-white/10 bg-[#0b1220] p-2 text-white shadow-2xl shadow-black/40">
                <DropdownMenuLabel className="px-3 py-3"><span className="block text-sm font-extrabold">Your learning space</span><span className="mt-1 block text-xs font-normal text-slate-400">Explore and practise without signing in.</span></DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg p-0 focus:bg-white/5"><Link href="/dashboard" className="flex w-full items-center gap-3 px-3 py-3"><LayoutDashboard className="h-4 w-4 text-blue-400" /><span><span className="block font-bold">Overview</span><span className="text-xs text-slate-400">See your personal study plan</span></span></Link></DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg p-0 focus:bg-white/5"><Link href="/learn" className="flex w-full items-center gap-3 px-3 py-3"><BookOpen className="h-4 w-4 text-orange-400" /><span><span className="block font-bold">My learning hub</span><span className="text-xs text-slate-400">Practise and track progress</span></span></Link></DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg p-0 focus:bg-white/5"><Link href="/login" className="flex w-full items-center gap-3 px-3 py-3 font-semibold text-slate-300"><LogIn className="h-4 w-4" />Already a student? Sign in</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <button className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/5" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-white/10 bg-[#08111f] p-0 text-white">
              <div className="border-b border-white/10 p-5">
                <p className="font-extrabold">Menu</p>
                <p className="mt-1 text-sm text-slate-400">Choose where you want to go.</p>
              </div>
              <div className="h-[calc(100dvh-190px)] space-y-1 overflow-y-auto p-4 pb-48">
                {mainLinks.map(link => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href} className={`block rounded-lg px-4 py-3 text-sm font-semibold ${active(link.href) ? "bg-blue-500/15 text-blue-300" : "text-slate-300"}`}>
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="pt-5">
                  <p className="mb-2 px-4 text-xs font-bold uppercase tracking-[.14em] text-slate-500">Practice sheets</p>
                  {sheetLinks.map(({ href, label, icon: Icon }) => <SheetClose asChild key={href}><Link href={href} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${active(href) ? "bg-blue-500/15 text-blue-300" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}><Icon className="h-4 w-4 text-blue-400" />{label}</Link></SheetClose>)}
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-5 border-t border-white/10 pt-4">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <SheetClose asChild><Button onClick={openDashboard} className="cg-dashboard-action w-full bg-blue-500 font-bold text-white hover:bg-blue-400"><LayoutDashboard className="mr-2 h-4 w-4" />Overview</Button></SheetClose>
                    <SheetClose asChild><Button asChild variant="outline" className="w-full border-white/15 bg-white/5 font-bold text-white hover:bg-white/10 hover:text-white"><Link href="/learn"><BookOpen className="mr-2 h-4 w-4" />My learning hub</Link></Button></SheetClose>
                    <SheetClose asChild><Button onClick={handleLogout} variant="outline" className="w-full border-red-400/20 bg-red-400/[.06] font-semibold text-red-300 hover:bg-red-400/10 hover:text-red-200"><LogOut className="mr-2 h-4 w-4" />Sign out</Button></SheetClose>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <SheetClose asChild><Button asChild className="w-full bg-blue-500 font-bold text-white"><Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Overview</Link></Button></SheetClose>
                    <SheetClose asChild><Button asChild variant="outline" className="w-full border-white/15 bg-white/5 font-bold text-white hover:bg-white/10 hover:text-white"><Link href="/learn"><BookOpen className="mr-2 h-4 w-4" />My learning hub</Link></Button></SheetClose>
                    <SheetClose asChild><Button asChild variant="ghost" className="w-full text-slate-300 hover:bg-white/5 hover:text-white"><Link href="/login"><LogIn className="mr-2 h-4 w-4" />Student login</Link></Button></SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
    {dashboardTransition && <DashboardTransition />}
  </>;
}

function DashboardTransition() {
  return <div className="cg-dashboard-transition fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#050a13] text-white" role="status" aria-live="polite">
    <div className="cg-dashboard-transition__glow" />
    <div className="relative flex w-full max-w-sm flex-col items-center px-6 text-center">
      <div className="cg-dashboard-transition__mark">
        <span className="cg-dashboard-transition__orbit" />
        <img src="/logo.png" alt="" className="h-16 w-16 rounded-2xl bg-white p-1" />
      </div>
      <p className="mt-8 text-xs font-extrabold uppercase tracking-[.22em] text-blue-300">Student workspace</p>
      <h2 className="mt-3 text-2xl font-black tracking-tight">Preparing your dashboard</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">Loading your learning plan, classes and progress.</p>
      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10"><span className="cg-dashboard-transition__progress block h-full rounded-full bg-gradient-to-r from-blue-500 to-orange-400" /></div>
      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500"><span className="cg-dashboard-transition__dot" /><span>Opening workspace</span></div>
    </div>
  </div>;
}
