import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "./Navbar";
import StudentSidebar from "./StudentSidebar";
import { useTheme } from "@/hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/config";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isHome = location === "/";
  const isFullWidthPage = isHome || location === "/about";
  const portalPaths = ["/dashboard", "/learn", "/live-classes", "/placement-readiness", "/roadmap", "/start-100", "/dsa", "/cp", "/contests", "/progress", "/compiler"];
  const isPortal = portalPaths.some((path) => location === path || location.startsWith(`${path}/`));
  const isAuthOrAdmin = ["/login", "/register", "/admin", "/make-contest/login"].some((path) => location === path || location.startsWith(`${path}/`));
  const pageLabel = getPageLabel(location);
  const theme = useTheme((state) => state.theme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-background text-foreground selection:bg-blue-600/40">
      <Navbar />
      {!isHome && <div className="flex items-center justify-between border-b border-white/10 bg-[#060b14] px-4 py-2 lg:hidden"><span className="text-xs font-semibold text-slate-500">Appearance</span><div className="w-32"><ThemeToggle showLabel /></div></div>}
      {!isHome && !isPortal && !isAuthOrAdmin && <div className="border-b bg-white/80 dark:border-white/10 dark:bg-[#0d1119]/90"><div className="mx-auto flex h-11 w-full max-w-7xl items-center gap-2 px-4 text-xs sm:px-6 lg:px-8"><Link href="/" className="font-semibold text-slate-500 transition hover:text-blue-600">Home</Link><span className="text-slate-300 dark:text-slate-700">/</span><span className="font-semibold text-slate-700 dark:text-slate-300">{pageLabel}</span></div></div>}
      {isPortal ? <div className="mx-auto flex w-full max-w-[1600px] flex-1"><StudentSidebar /><main className="cg-portal min-w-0 flex-1 px-4 py-8 sm:px-6 md:py-10 lg:px-10 xl:px-12">{children}</main></div> : <main className={`${isFullWidthPage ? "w-full" : "relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"} ${isHome ? "" : "cg-public-page"} ${isAuthOrAdmin ? "py-8 md:py-12" : isFullWidthPage ? "" : "py-10 md:py-14"} flex-1`}>{children}</main>}
      <footer className="mt-auto border-t border-white/10 bg-[#060a12] text-slate-300">
        <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-14 sm:px-6 md:pt-16 lg:px-8">
          <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.35fr_.65fr_.65fr_1fr] lg:gap-10">
            <div className="max-w-sm">
              <Link href="/" className="inline-flex items-center gap-3">
                <img src="/logo.png" alt="Coding Gurukul" className="h-11 w-11 rounded-lg bg-white p-0.5" />
                <div><p className="text-lg font-extrabold leading-tight text-white">Coding Gurukul</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[.2em] text-slate-500">Learn · Practise · Perform</p></div>
              </Link>
              <p className="mt-5 text-sm leading-7 text-slate-400">Mentor-led technical training, coding practice and placement preparation for colleges and ambitious learners.</p>
              <Link href="/courses" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-400 transition hover:text-orange-300">Explore programs <ArrowUpRight className="h-4 w-4" /></Link>
            </div>

            <FooterGroup title="Platform" links={[["Courses", "/courses"], ["Dashboard", "/dashboard"], ["Live classes", "/live-classes"], ["Online compiler", "/compiler"]]} />
            <FooterGroup title="Practice" links={[["Start 150", "/start-100"], ["DSA sheet", "/dsa"], ["CP sheet", "/cp"], ["Contests", "/contests"]]} />

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.16em] text-white">College partnerships</p>
              <p className="mt-5 text-sm leading-6 text-slate-400">Planning a campus training program? Speak with our team about your cohort and placement goals.</p>
              <div className="mt-5 space-y-3 text-sm">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-3 transition hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" /><span className="break-all">{CONTACT_EMAIL}</span></a>
                <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-3 transition hover:text-white"><Phone className="h-4 w-4 shrink-0 text-orange-400" />{CONTACT_PHONE}</a>
                <p className="flex items-center gap-3"><MapPin className="h-4 w-4 shrink-0 text-orange-400" />India</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Coding Gurukul. All rights reserved.</p>
            <p>Structured learning · Deliberate practice · Career confidence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterGroup({ title, links }: { title: string; links: string[][] }) {
  return <div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-white">{title}</p><nav className="mt-5 space-y-3">{links.map(([label, href]) => <p key={href}><Link href={href} className="text-sm text-slate-400 transition hover:text-white">{label}</Link></p>)}</nav></div>;
}

function getPageLabel(path: string) {
  if (path.startsWith("/courses/")) return "Program details";
  if (path.startsWith("/contests/")) return "Contest details";
  const labels: Record<string, string> = {
    "/about": "About us", "/courses": "Programs", "/roadmap": "Learning roadmap",
    "/live-classes": "Live classes", "/placement-readiness": "Placement readiness",
    "/compiler": "Online compiler", "/contests": "Contests", "/progress": "Progress",
  };
  return labels[path] || "Coding Gurukul";
}
