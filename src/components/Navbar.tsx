import { Link, useLocation } from "wouter";
import { ArrowRight, Code2, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import useAuth from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress"; 

export default function Navbar() {
  const [location, setLocation] = useLocation();

  const primaryLinks =[
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/start-100", label: "Start 150" },
    { href: "/dsa", label: "DSA Sheet" },
    { href: "/cp", label: "CP Sheet" },
  ];
  const allLinks =[
    ...primaryLinks,
    { href: "/contests", label: "Contests" },
    { href: "/progress", label: "Progress" },
    { href: "/compiler", label: "Compiler" },
  ];

  const isLoggedIn = useAuth((s) => s.isLoggedIn);
  const logout = useAuth((s) => s.logout)
  const resetProgress = useProgress((s) => s.resetProgress);// reset the progress
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 text-slate-900 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 dark:text-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center px-4 md:px-6">
        <div className="hidden w-full items-center md:flex">
          <Link href="/" className="mr-7 flex items-center space-x-3">
            <img src="/logo.png" alt="Coding Gurukul" className="h-10 w-10 rounded-xl object-contain" />
            <span className="text-lg font-black tracking-tight">
              Coding Gurukul
            </span>
          </Link>
          <div className="flex items-center space-x-5 text-sm font-semibold">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-blue-700 ${
                  location === link.href ? "text-blue-700" : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              className={`rounded-xl border-slate-700 px-4 ${
                location === "/compiler"
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "text-slate-200 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Link href="/compiler">
                <Code2 className="mr-2 h-4 w-4" />
                Compiler
              </Link>
            </Button>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  logout();
                  resetProgress();
                  setLocation('/');
                  window.location.reload();// Reloading the page
                } else {
                  setLocation('/login');
                }
              }}
              className="px-3 text-sm font-semibold text-slate-600 hover:text-blue-700 dark:text-slate-300"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
            <Button asChild className="rounded-xl bg-blue-700 px-5 text-white hover:bg-blue-800">
              <Link href="/courses">Explore courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <img src="/logo.png" alt="Coding Gurukul" className="h-7 w-7 object-contain" />
              <span className="font-bold">Coding Gurukul Sheet</span>
            </Link>
            <div className="flex flex-col space-y-4">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm ${
                    location === link.href ? "text-foreground font-semibold" : "text-foreground/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-2 md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Coding Gurukul" className="h-9 w-9 rounded-lg object-contain" />
            <span className="font-black">Coding Gurukul</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
