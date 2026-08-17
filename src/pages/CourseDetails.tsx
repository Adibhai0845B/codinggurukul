import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, Check, Clock3, GraduationCap, MonitorPlay } from "lucide-react";
import { courses } from "@/data/courses";
import { PURCHASE_FORM_URL } from "@/config";
import { Button } from "@/components/ui/button";

export default function CourseDetails() {
  const [, params] = useRoute<{ id: string }>("/courses/:id");
  const courseId = params ? params.id : undefined;
  const course = courses.find((item) => item.id === courseId);

  if (!course) return <div className="py-20 text-center"><h1 className="text-3xl font-bold">Course not found</h1><Link href="/courses" className="mt-5 inline-flex text-blue-500">Return to courses</Link></div>;

  return <div className="pb-16">
    <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"><ArrowLeft className="h-4 w-4" />All courses</Link>

    <header className="mt-8 grid gap-10 border-b pb-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{course.subtitle}</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">{course.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{course.desc}</p>
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-muted-foreground"><span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-blue-500" />{course.duration}</span><span className="flex items-center gap-2"><MonitorPlay className="h-4 w-4 text-blue-500" />{course.format}</span></div>
      </div>
      <div className="aspect-video overflow-hidden rounded-lg border bg-card"><img src={course.image} alt={`${course.title} course`} className="h-full w-full object-cover object-center" /></div>
    </header>

    <div className="grid gap-12 py-12 lg:grid-cols-[1fr_340px]">
      <main className="space-y-12">
        <section><h2 className="text-2xl font-bold">What you will learn</h2><p className="mt-2 text-muted-foreground">A focused curriculum designed around practical progress.</p><div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">{course.features.map((feature) => <div key={feature} className="flex items-start gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"><Check className="h-3 w-3" /></span><span className="text-sm leading-6">{feature}</span></div>)}</div></section>

        {course.mentor && <section className="border-t pt-10"><h2 className="text-2xl font-bold">Your mentor</h2><div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center"><img src={course.mentor.image} alt={course.mentor.name} className="h-28 w-28 rounded-lg object-cover" /><div><h3 className="text-xl font-bold">{course.mentor.name}</h3><p className="mt-1 font-medium text-blue-600 dark:text-blue-400">{course.mentor.role}</p><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Your mentor will guide concept sessions, problem-solving practice and review discussions throughout the program.</p></div></div></section>}

        <section className="border-t pt-10"><h2 className="text-2xl font-bold">How the program works</h2><div className="mt-6 grid gap-6 sm:grid-cols-3">{[["01", "Learn", "Understand concepts through structured mentor-led sessions."], ["02", "Practise", "Apply each topic through curated problems and assignments."], ["03", "Review", "Use feedback, contests and revision to strengthen weak areas."]].map(([number, title, copy]) => <div key={number}><span className="text-sm font-bold text-orange-500">{number}</span><h3 className="mt-2 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></section>
      </main>

      <aside className="lg:sticky lg:top-28 lg:self-start"><div className="rounded-lg border bg-card p-6"><p className="text-sm text-muted-foreground">Program fee</p><div className="mt-2 flex items-baseline gap-2"><span className="text-3xl font-extrabold">{course.price}</span>{course.originalPrice && <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>}</div><dl className="mt-6 space-y-4 border-t pt-5 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Level</dt><dd className="text-right font-semibold">{course.level}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Duration</dt><dd className="font-semibold">{course.duration}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Format</dt><dd className="text-right font-semibold">{course.format}</dd></div></dl><Button className="mt-7 h-12 w-full rounded-lg bg-blue-700 font-bold hover:bg-blue-800" onClick={() => window.open(PURCHASE_FORM_URL, "_blank", "noopener,noreferrer")}>Enroll in this course <ArrowRight className="ml-2 h-4 w-4" /></Button><p className="mt-4 text-center text-xs text-muted-foreground">Registration opens in a secure form.</p></div><div className="mt-5 flex items-center gap-3 rounded-lg bg-blue-50 p-4 text-sm text-blue-950 dark:bg-blue-950/40 dark:text-blue-100"><GraduationCap className="h-5 w-5 shrink-0" /><span>Includes guided practice and completion recognition.</span></div></aside>
    </div>
  </div>;
}
