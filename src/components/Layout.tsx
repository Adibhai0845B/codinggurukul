import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isHome = location === "/";
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main className={isHome ? "flex-1 w-full" : "flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6"}>
        {children}
      </main>
      <footer className={`${isHome ? "hidden" : ""} border-t py-6 text-center text-sm text-muted-foreground mt-auto`}>
        <p>Built for the dedicated coder. Master DSA and CP.</p>
      </footer>
    </div>
  );
}
