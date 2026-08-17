import {
  Award,
  CheckCircle2,
  CreditCard,
  CalendarDays,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import CourseCard from "@/components/CourseCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { courses, type Course } from "@/data/courses";
import { PURCHASE_FORM_URL } from "@/config";

export default function Courses() {
  function buyCourse(_course: Course) {
    window.open(PURCHASE_FORM_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 dark:from-slate-950 dark:via-background dark:to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(10,71,163,0.12),transparent_30%),radial-gradient(circle_at_88%_70%,rgba(255,101,0,0.14),transparent_32%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-orange-500" />
              Coding Gurukul Courses
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl dark:text-white">
              Placement courses made for coding rounds, OAs and interviews.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Choose the right accelerator: the 10-day starter bootcamp,
              foundation for basics, pro batch for advanced DSA and CP, or the
              dedicated sheet for focused practice. Enrollment is currently open.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 px-6" onClick={() => buyCourse(courses[0])}>
                <CreditCard className="mr-2 h-4 w-4" />
                Buy Bootcamp Batch
              </Button>
              <Button variant="outline" className="h-12 px-6" asChild>
                <a href="#course-list">Explore Courses</a>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <HeroStat value="4" label="Programs" />
              <HeroStat value="Rs. 299" label="Starting" />
              <HeroStat value="Live" label="Mentor-led" />
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-xl border bg-white shadow-xl">
            <img
              src={courses[0].image}
              alt={`${courses[0].title} banner`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="border-b bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <TrustPoint icon={<CalendarDays />} title="Enrollment Open" />
          <TrustPoint icon={<Award />} title="Certificate Included" />
          <TrustPoint icon={<ShieldCheck />} title="Interview Focused" />
          <TrustPoint icon={<CheckCircle2 />} title="Form Registration" />
        </div>
      </section>

      <section id="course-list" className="cg-enter mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 max-w-3xl">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-orange-500">
              Choose Your Track
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950 md:text-4xl dark:text-white">
              Four clear options for placement preparation
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Each course card shows the full banner, exact launch price and
              what the learner receives.
            </p>
          </div>

        </div>

        <Carousel opts={{ align: "start", loop: false }} className="mt-10">
          <CarouselContent className="-ml-5 items-stretch">
            {courses.map((course) => <CarouselItem key={course.id} className="h-auto pl-5 md:basis-1/2 lg:basis-1/3"><CourseCard course={course} compact /></CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="-top-14 left-auto right-11 h-9 w-9 rounded-md" />
          <CarouselNext className="-top-14 right-0 h-9 w-9 rounded-md" />
        </Carousel>
      </section>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="h-full rounded-xl border bg-white/80 p-4 shadow-sm dark:bg-card">
      <p className="text-xl font-extrabold text-blue-700">{value}</p>
      <p className="mt-1 text-xs font-semibold text-muted-foreground">
        {label}
      </p>
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
    <div className="flex h-full items-center gap-3 rounded-xl px-2 py-1">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-orange-300">
        {icon}
      </div>
      <p className="font-semibold">{title}</p>
    </div>
  );
}
