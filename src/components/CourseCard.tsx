import { CalendarDays, CheckCircle2, CreditCard, ShoppingCart, Sparkles } from "lucide-react";

import type { Course } from "@/data/courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <Card
      id={course.id}
      className="overflow-hidden rounded-2xl border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="relative aspect-[3/1] bg-white">
        <img
          src={course.image}
          alt={`${course.title} banner`}
          className="h-full w-full object-contain"
        />
        <Badge className="absolute left-4 top-4 bg-white text-slate-900 hover:bg-white">
          <Sparkles className="mr-1 h-3.5 w-3.5 text-orange-500" />
          {course.tag}
        </Badge>
      </div>
      <CardContent className="border-t bg-white p-6 text-slate-950">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              {course.subtitle}
            </p>
            <h3 className="mt-1 text-2xl font-extrabold leading-snug text-slate-950">
              {course.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Duration: {course.duration}
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-blue-700">
              <CalendarDays className="h-3.5 w-3.5" />
              Launching on {course.launchDate}
            </p>
          </div>
          <div className="shrink-0 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-left sm:text-right">
            {course.originalPrice && (
              <p className="text-xs font-semibold text-slate-500 line-through">
                {course.originalPrice}
              </p>
            )}
            <p className="text-xl font-extrabold text-orange-700">
              {course.price}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-700">
          {course.desc}
        </p>

        {!compact && (
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {course.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            onClick={() => onBuy(course)}
            className="h-11 bg-blue-700 text-white hover:bg-blue-800"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
          <Button
            variant={isAdded ? "secondary" : "outline"}
            onClick={() => onAddToCart(course)}
            className="h-11 border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAdded ? "Added" : "Add"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
