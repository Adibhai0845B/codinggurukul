import { Link } from "wouter";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[55vh] w-full items-center justify-center py-16">
      <div className="w-full max-w-xl text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950"><Compass className="h-7 w-7" /></div><p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-orange-500">Error 404</p><h1 className="mt-3 text-4xl font-extrabold">This page is not available.</h1><p className="mx-auto mt-4 max-w-md leading-7 text-muted-foreground">The link may be outdated or the page may have moved. Return to the homepage or continue from your dashboard.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild><Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to home</Link></Button><Button asChild variant="outline"><Link href="/dashboard">Open dashboard</Link></Button></div></div>
    </div>
  );
}
