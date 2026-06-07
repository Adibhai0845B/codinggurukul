import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const [location, setLocation] = useLocation();

  const links =[
    { href: "/", label: "Home" },
    { href: "/dsa", label: "DSA Sheet" },
    { href: "/cp", label: "CP Sheet" },
    { href: "/contests", label: "Contests" },
    { href: "/progress", label: "Progress" },
  ];

  const isLoggedIn = useAuth((s) => s.isLoggedIn);
  const logout = useAuth((s) => s.logout);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img src="/logo.png" alt="Coding Gurukul" className="h-7 w-7 object-contain" />
            <span className="font-bold sm:inline-block">
              Coding Gurukul Sheet
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-foreground/80 ${
                  location === link.href ? "text-foreground font-semibold" : "text-foreground/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                if (isLoggedIn) {
                  logout();
                  setLocation('/');
                } else {
                  setLocation('/login');
                }
              }}
              className="text-sm ml-2 text-foreground/80"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </nav>
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
            <div className="flex flex-col space-y-3">
              {links.map((link) => (
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
            <img src="/logo.png" alt="Coding Gurukul" className="h-7 w-7 object-contain" />
            <span className="font-bold">Coding Gurukul Sheet</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
