import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import type { Course } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CourseCard({
  course,
  isAdded,
  onAddToCart,
  onBuy,
  compact = false,
}: {
  course: Course;
  isAdded: boolean;
  onAddToCart: (course: Course) => void;
  onBuy: (course: Course) => void;
  compact?: boolean;
}) {
  const visibleFeatures = compact ? course.features.slice(0, 3) : course.features;
  const isPopular = course.id === "foundation-batch";

  return (
    <Card
      id={course.id}
      className={`group relative flex h-full overflow-hidden rounded-[1.75rem] border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_55px_rgba(30,64,175,0.14)] dark:border-slate-800 dark:bg-slate-900 ${
        compact ? "flex-col" : "flex-col lg:grid lg:grid-cols-[.85fr_1.15fr]"
      }`}
    >
      {isPopular && (
        <div className="absolute right-5 top-5 z-20 rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-white shadow-lg">
          Most popular
        </div>
      )}

      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 dark:from-slate-900 dark:via-blue-950/50 dark:to-slate-900 ${compact ? "aspect-[16/9]" : "min-h-[300px] lg:min-h-full"}`}>
        <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_20%,rgba(37,99,235,.12),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,.12),transparent_28%)]" />
        <img
          src={course.image}
          alt={`${course.title} banner`}
          className="relative h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.025]"
        />
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-black text-slate-800 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 dark:text-white">
          <Sparkles className="h-3.5 w-3.5 text-orange-500" />
          {course.tag}
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-6" : "p-7 md:p-9"}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Clock3 className="h-3.5 w-3.5" /> {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
            <CalendarDays className="h-3.5 w-3.5" /> Starts {course.launchDate}
          </span>
        </div>

        <p className="mt-6 text-xs font-black uppercase tracking-[.16em] text-blue-700 dark:text-blue-400">
          {course.subtitle}
        </p>
        <h3 className={`${compact ? "text-2xl" : "text-3xl"} mt-2 font-black leading-tight tracking-tight text-slate-950 dark:text-white`}>
          {course.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {course.desc}
        </p>

        <div className={`mt-6 grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
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

          <div className="grid grid-cols-[1fr_auto] gap-3">
            <Button
              onClick={() => onBuy(course)}
              className="h-12 rounded-xl bg-blue-700 font-bold text-white shadow-md shadow-blue-700/15 hover:bg-blue-800"
            >
              Enroll now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              aria-label={isAdded ? `${course.title} added to cart` : `Add ${course.title} to cart`}
              variant="outline"
              onClick={() => onAddToCart(course)}
              className={`h-12 w-12 rounded-xl border-slate-300 p-0 ${isAdded ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "bg-white text-slate-700 hover:bg-slate-50"}`}
            >
              {isAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
