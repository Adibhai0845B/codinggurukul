import { Link, useLocation } from "wouter";
import {
  BookOpen,
  ChevronDown,
  Code2,
  FileCode2,
  Flag,
  LogIn,
  LogOut,
  Menu,
  Radio,
  Sparkles,
  ShieldCheck,
  Trophy,
  UserRound,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/contests", label: "Contests" },
];

const learningLinks = [
  { href: "/learn", label: "My Learning Hub", description: "Your daily plan and revision", icon: Sparkles },
  { href: "/live-classes", label: "Live Classes", description: "Join your Google Meet class", icon: Radio },
  { href: "/start-100", label: "Start 150", description: "Essential coding problems", icon: BookOpen },
  { href: "/dsa", label: "DSA Sheet", description: "Master data structures", icon: FileCode2 },
  { href: "/cp", label: "CP Sheet", description: "Competitive programming", icon: Trophy },
  { href: "/progress", label: "My Progress", description: "Review your activity", icon: Flag },
];

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const username = useAuth((state) => state.username);
  const logout = useAuth((state) => state.logout);
  const resetProgress = useProgress((state) => state.resetProgress);

  const visibleLearningLinks = learningLinks.filter((link) => link.href !== "/live-classes" || isLoggedIn);
  const isActive = (href: string) => href === "/" ? location === "/" : location.startsWith(href);
  const learningActive = visibleLearningLinks.some((link) => isActive(link.href));

  const handleLogout = () => {
    logout();
    resetProgress();
    setLocation("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="Coding Gurukul home">
          <img src="/logo.png" alt="" className="h-10 w-10 rounded-xl object-contain ring-1 ring-white/10 transition group-hover:ring-blue-500/50" />
          <div className="hidden sm:block">
            <p className="text-base font-black leading-tight tracking-tight">Coding Gurukul</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">Learn · Code · Grow</p>
          </div>
        </Link>

        <div className="ml-4 hidden items-center gap-1 lg:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive(link.href) ? "bg-blue-500/10 text-blue-400" : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold outline-none transition ${learningActive ? "bg-blue-500/10 text-blue-400" : "text-slate-300 hover:bg-slate-800/70 hover:text-white"}`}>
                Learn <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 border-slate-800 bg-slate-950 p-2">
              <DropdownMenuLabel className="text-xs uppercase tracking-wider text-slate-500">Learning resources</DropdownMenuLabel>
              {visibleLearningLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <DropdownMenuItem key={link.href} asChild className="cursor-pointer rounded-lg p-0 focus:bg-slate-800">
                    <Link href={link.href} className="flex w-full items-center gap-3 p-2.5">
                      <span className="rounded-lg bg-blue-500/10 p-2 text-blue-400"><Icon className="h-4 w-4" /></span>
                      <span><span className="block text-sm font-semibold text-slate-100">{link.label}</span><span className="block text-xs text-slate-500">{link.description}</span></span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          {isLoggedIn && (
            <Button asChild variant="ghost" className={`rounded-xl text-sm ${location.startsWith("/live-classes") ? "bg-red-500/10 text-red-400" : "text-slate-300 hover:bg-slate-800 hover:text-red-400"}`}>
              <Link href="/live-classes"><Radio className="mr-2 h-4 w-4" />Live Classes</Link>
            </Button>
          )}
          <Button asChild variant="ghost" className={`rounded-xl text-sm ${location.startsWith("/make-contest") ? "bg-amber-500/10 text-amber-400" : "text-slate-300 hover:bg-slate-800 hover:text-amber-400"}`}>
            <Link href="/make-contest"><ShieldCheck className="mr-2 h-4 w-4" />Make Contest</Link>
          </Button>
          <Button asChild className="rounded-xl bg-blue-600 text-white shadow-md shadow-blue-950/40 hover:bg-blue-500">
            <Link href="/compiler"><Code2 className="mr-2 h-4 w-4" />Compiler</Link>
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-black text-blue-400 outline-none transition hover:border-blue-500" aria-label="Open user menu">
                  {(username || "U").charAt(0).toUpperCase()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 border-slate-800 bg-slate-950">
                <DropdownMenuLabel><span className="block text-xs font-normal text-slate-500">Signed in as</span><span className="truncate text-sm text-white">{username}</span></DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem asChild><Link href="/progress" className="cursor-pointer"><UserRound className="mr-2 h-4 w-4" />My Progress</Link></DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 focus:text-red-300"><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" className="rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white"><Link href="/login"><LogIn className="mr-2 h-4 w-4" />Login</Link></Button>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" className="rounded-lg bg-blue-600 text-white hover:bg-blue-500"><Link href="/compiler"><Code2 className="mr-1.5 h-4 w-4" />Compiler</Link></Button>
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="text-slate-200 hover:bg-slate-800"><Menu className="h-5 w-5" /><span className="sr-only">Open navigation</span></Button></SheetTrigger>
            <SheetContent side="right" className="w-[310px] border-slate-800 bg-slate-950 p-0 text-white">
              <div className="border-b border-slate-800 p-5"><SheetClose asChild><Link href="/" className="flex items-center gap-3"><img src="/logo.png" alt="" className="h-10 w-10 rounded-xl object-contain" /><div><p className="font-black">Coding Gurukul</p><p className="text-xs text-blue-400">Learn · Code · Grow</p></div></Link></SheetClose></div>
              <div className="space-y-6 overflow-y-auto p-5">
                <div className="space-y-1"><p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Navigate</p>{mainLinks.map((link) => <SheetClose asChild key={link.href}><Link href={link.href} className={`flex rounded-lg px-3 py-2.5 text-sm font-semibold ${isActive(link.href) ? "bg-blue-500/10 text-blue-400" : "text-slate-300 hover:bg-slate-900"}`}>{link.label}</Link></SheetClose>)}</div>
                <div className="space-y-1"><p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Learning</p>{visibleLearningLinks.map((link) => { const Icon = link.icon; return <SheetClose asChild key={link.href}><Link href={link.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${isActive(link.href) ? "bg-blue-500/10 text-blue-400" : "text-slate-300 hover:bg-slate-900"}`}><Icon className="h-4 w-4" />{link.label}</Link></SheetClose>; })}</div>
                <div className="space-y-2 border-t border-slate-800 pt-5"><SheetClose asChild><Button asChild variant="outline" className="w-full border-amber-500/30 text-amber-400"><Link href="/make-contest"><ShieldCheck className="mr-2 h-4 w-4" />Make Contest</Link></Button></SheetClose>{isLoggedIn ? <SheetClose asChild><Button variant="ghost" onClick={handleLogout} className="w-full text-red-400"><LogOut className="mr-2 h-4 w-4" />Logout {username}</Button></SheetClose> : <SheetClose asChild><Button asChild variant="outline" className="w-full"><Link href="/login"><LogIn className="mr-2 h-4 w-4" />Login</Link></Button></SheetClose>}</div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
