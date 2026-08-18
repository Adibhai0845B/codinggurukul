import {
  ArrowRight,
  Check,
  Clock3,
} from "lucide-react";

import type { Course } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

export default function CourseCard({
  course,
  compact = false,
}: {
  course: Course;
  compact?: boolean;
}) {
  const visibleFeatures = compact ? course.features.slice(0, 3) : course.features;
  const isPopular = course.id === "foundation-batch";

  return (
    <Card
      id={course.id}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      {isPopular && (
        <div className="absolute right-4 top-4 z-20 rounded-md bg-orange-500 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
          Best for beginners
        </div>
      )}

      <div className="relative aspect-[3/1] w-full shrink-0 overflow-hidden border-b border-slate-100 bg-[#f8fbff] dark:border-slate-800">
        <img
          src={course.image}
          alt={`${course.title} banner`}
          className="h-full w-full object-contain object-center"
        />
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-6" : "p-7"}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1.5 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Clock3 className="h-3.5 w-3.5" /> {course.duration}
          </span>
        </div>

        <p className="mt-5 text-xs font-black uppercase tracking-[.14em] text-blue-700 dark:text-blue-400">
          {course.subtitle}
        </p>
        <h3 className={`${compact ? "text-2xl" : "text-3xl"} mt-2 font-black leading-tight tracking-tight text-slate-950 dark:text-white`}>
          {course.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{course.idealFor}</p>

        <div className="mt-5 border-y py-4"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Expected outcome</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">{course.outcome}</p></div>

        <div className={`mt-5 grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
          {visibleFeatures.map((feature) => (
            <div key={feature} className="flex items-start gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <Check className="h-3 w-3 stroke-[3]" />
              </span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-7">
          <div className="mb-5 flex items-end justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
            <div>
              <p className="text-xs font-semibold text-slate-500">Program fee</p>
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-2xl font-black text-slate-950 dark:text-white">{course.price}</p>
                {course.originalPrice && <p className="text-xs font-semibold text-slate-400 line-through">{course.originalPrice}</p>}
              </div>
            </div>
            <p className="text-xs font-bold text-emerald-600">Enrollment open</p>
          </div>

          <Button asChild className="h-12 w-full rounded-lg bg-blue-700 font-bold text-white hover:bg-blue-800"><Link href={`/courses/${course.id}`}>View course <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
      </div>
    </Card>
  );
}
