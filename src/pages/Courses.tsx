import {
  ArrowRight,
  Award,
  CheckCircle2,
  CalendarDays,
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";

export default function Courses() {
  const [level, setLevel] = useState("All");
  const filteredCourses = useMemo(() => level === "All" ? courses : courses.filter((course) => level === "Beginner" ? course.level.toLowerCase().includes("beginner") : level === "Advanced" ? course.level.toLowerCase().includes("advanced") : course.format.toLowerCase().includes("self-paced")), [level]);

  return (
    <div className="pb-8">
      <section className="border-b pb-10 pt-2 md:pb-12">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_360px]">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">Student programs</p><h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.08] md:text-6xl">Choose a program by where you are—not by what sounds impressive.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Compare the starting level, learning format and expected outcome before you enrol. Every program has a clear purpose.</p></div>
          <div className="border-l-2 border-orange-500 pl-5"><p className="text-sm font-bold">Not sure where to begin?</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Start with Foundation if DSA is new. Choose Pro only if you already solve basic problems independently.</p><Button asChild variant="link" className="mt-2 h-auto p-0 text-blue-600"><Link href="/placement-readiness">Check your readiness <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </div>
      </section>

      <section className="border-b py-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <TrustPoint icon={<CalendarDays />} title="Enrollment Open" />
          <TrustPoint icon={<Award />} title="Certificate Included" />
          <TrustPoint icon={<ShieldCheck />} title="Interview Focused" />
          <TrustPoint icon={<CheckCircle2 />} title="Form Registration" />
        </div>
      </section>

      <section id="course-list" className="cg-enter py-12 lg:py-16">
        <div className="flex flex-col justify-between gap-5 border-b pb-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-orange-500">Compare programs</p><h2 className="mt-3 text-3xl font-extrabold">Find your next step</h2></div><div className="flex items-center gap-2 overflow-x-auto" aria-label="Filter programs by level"><SlidersHorizontal className="mr-1 h-4 w-4 shrink-0 text-slate-400" />{["All", "Beginner", "Advanced", "Self-paced"].map((item) => <button key={item} onClick={() => setLevel(item)} className={`shrink-0 rounded-md border px-3 py-2 text-sm font-semibold transition ${level === item ? "border-blue-600 bg-blue-600 text-white" : "bg-card text-muted-foreground hover:border-blue-400 hover:text-foreground"}`}>{item}</button>)}</div>
        </div>
        <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredCourses.map((course) => <CourseCard key={course.id} course={course} compact />)}</div>
        {!filteredCourses.length && <div className="mt-8 rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">No program matches this filter yet.</div>}
      </section>
    </div>
  );
}

function TrustPoint({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex h-full items-center gap-3 rounded-lg border bg-card px-4 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950">
        {icon}
      </div>
      <p className="font-semibold">{title}</p>
    </div>
  );
}
