import { Link, useLocation } from "wouter";
import { BookOpen, BriefcaseBusiness, ChevronDown, Code2, FileCode2, Flag, LogIn, LogOut, Menu, Radio, Sparkles, Trophy, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";

const publicLinks = [{ href: "/", label: "Home" }, { href: "/courses", label: "Programs" }, { href: "/about", label: "About" }];
const portalLinks = [
  { href: "/learn", label: "Learning Hub", icon: Sparkles }, { href: "/live-classes", label: "Live Classes", icon: Radio },
  { href: "/placement-readiness", label: "Placement Readiness", icon: BriefcaseBusiness }, { href: "/roadmap", label: "My Roadmap", icon: BookOpen },
  { href: "/start-100", label: "Start 150", icon: FileCode2 }, { href: "/dsa", label: "DSA Sheet", icon: FileCode2 },
  { href: "/cp", label: "CP Sheet", icon: Trophy }, { href: "/contests", label: "Contests", icon: Trophy },
  { href: "/progress", label: "My Progress", icon: Flag }, { href: "/compiler", label: "Compiler", icon: Code2 },
];

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const isLoggedIn = useAuth(state => state.isLoggedIn);
  const username = useAuth(state => state.username);
  const logout = useAuth(state => state.logout);
  const resetProgress = useProgress(state => state.resetProgress);
  const active = (href: string) => href === "/" ? location === "/" : location.startsWith(href);
  const handleLogout = () => { logout(); resetProgress(); setLocation("/"); };

  return <nav className="sticky top-0 z-50 w-full border-b border-blue-950 bg-[#041225]/95 text-white backdrop-blur-xl"><div className="mx-auto flex h-[72px] w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:gap-5 lg:px-8">
    <Link href="/" className="flex shrink-0 items-center gap-3"><img src="/logo.png" alt="" className="h-10 w-10 rounded-xl bg-white p-0.5" /><div><p className="font-black leading-tight">Coding Gurukul</p><p className="text-[10px] font-bold uppercase tracking-[.15em] text-sky-300">Train • Practise • Get placed</p></div></Link>
    <div className="ml-auto hidden items-center gap-1 lg:flex">{publicLinks.map(link => <Link key={link.href} href={link.href} className={`rounded-lg px-4 py-2 text-sm font-bold transition ${active(link.href) ? "bg-white/10 text-white" : "text-slate-300 hover:text-white"}`}>{link.label}</Link>)}
      <DropdownMenu><DropdownMenuTrigger asChild><button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-bold text-slate-300 hover:text-white">Student Portal <ChevronDown className="h-4 w-4" /></button></DropdownMenuTrigger><DropdownMenuContent className="w-64 border-blue-950 bg-[#041225] p-2 text-white"><DropdownMenuLabel className="text-xs uppercase tracking-wider text-slate-500">Learning & placement tools</DropdownMenuLabel>{portalLinks.map(link => { const Icon = link.icon; return <DropdownMenuItem key={link.href} asChild className="p-0 focus:bg-blue-950"><Link href={link.href} className="flex w-full items-center gap-3 rounded-lg p-2.5 text-sm font-semibold"><Icon className="h-4 w-4 text-sky-300" />{link.label}</Link></DropdownMenuItem>; })}</DropdownMenuContent></DropdownMenu>
    </div>
    <div className="hidden items-center gap-2 lg:flex">{isLoggedIn ? <DropdownMenu><DropdownMenuTrigger asChild><button className="grid h-10 w-10 place-items-center rounded-full border border-blue-800 bg-blue-950 font-black text-sky-300">{(username || "U")[0].toUpperCase()}</button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-52 border-blue-950 bg-[#041225] text-white"><DropdownMenuLabel>{username}</DropdownMenuLabel><DropdownMenuSeparator className="bg-blue-950" /><DropdownMenuItem asChild><Link href="/progress"><UserRound className="mr-2 h-4 w-4" />My progress</Link></DropdownMenuItem><DropdownMenuItem onClick={handleLogout} className="text-red-400"><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem></DropdownMenuContent></DropdownMenu> : <Button asChild variant="ghost" className="text-slate-200 hover:bg-white/10 hover:text-white"><Link href="/login"><LogIn className="mr-2 h-4 w-4" />Student login</Link></Button>}<Button asChild className="rounded-xl bg-sky-300 font-black text-[#061a35] hover:bg-sky-200"><Link href="/courses">Enrol now →</Link></Button></div>
    <div className="ml-auto lg:hidden"><Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="text-white"><Menu className="h-6 w-6" /></Button></SheetTrigger><SheetContent side="right" className="w-[320px] border-blue-950 bg-[#041225] p-0 text-white"><div className="border-b border-blue-950 p-5"><p className="font-black">Coding Gurukul</p><p className="text-xs text-sky-300">Training & Placement</p></div><div className="h-[calc(100vh-80px)] overflow-y-auto p-5"><p className="mb-2 px-3 text-xs font-black uppercase tracking-wider text-slate-500">Explore</p>{publicLinks.map(link => <SheetClose asChild key={link.href}><Link href={link.href} className="block rounded-lg px-3 py-2.5 font-semibold">{link.label}</Link></SheetClose>)}<p className="mb-2 mt-6 px-3 text-xs font-black uppercase tracking-wider text-slate-500">Student portal</p>{portalLinks.map(link => { const Icon = link.icon; return <SheetClose asChild key={link.href}><Link href={link.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300"><Icon className="h-4 w-4 text-sky-300" />{link.label}</Link></SheetClose>; })}<div className="mt-6 space-y-2 border-t border-blue-950 pt-5">{isLoggedIn ? <SheetClose asChild><Button variant="outline" onClick={handleLogout} className="w-full border-blue-900 text-red-400">Logout</Button></SheetClose> : <SheetClose asChild><Button asChild variant="outline" className="w-full border-blue-900 text-white"><Link href="/login">Student login</Link></Button></SheetClose>}<SheetClose asChild><Button asChild className="w-full bg-sky-300 font-black text-[#061a35]"><Link href="/courses">Enrol now</Link></Button></SheetClose></div></div></SheetContent></Sheet></div>
  </div></nav>;
}
