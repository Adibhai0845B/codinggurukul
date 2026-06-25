import {
  Award,
  CheckCircle2,
  Clock,
  CreditCard,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import CourseCard from "@/components/CourseCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useCourseCart } from "@/hooks/useCourseCart";
import { courses, type Course } from "@/data/courses";
import { openRazorpayCheckout } from "@/lib/razorpay";

export default function Courses() {
  const cartItems = useCourseCart((state) => state.items);
  const addCourse = useCourseCart((state) => state.addCourse);

  function addToCart(course: Course) {
    if (addCourse(course)) {
      toast({
        title: "Added to cart",
        description: `${course.title} has been added.`,
      });
      return;
    }

    toast({
      title: "Already in cart",
      description: `${course.title} is already added.`,
    });
  }

  async function buyCourse(course: Course) {
    addToCart(course);
    await openRazorpayCheckout({
      course,
      onSuccess: (paymentId) => {
        toast({
          title: "Payment successful",
          description: `Payment ID: ${paymentId}`,
        });
      },
      onMissingKey: () => {
        toast({
          title: "Razorpay key missing",
          description: "Add VITE_RAZORPAY_KEY_ID to your environment.",
        });
      },
      onScriptError: () => {
        toast({
          title: "Razorpay unavailable",
          description: "Please check your internet connection and try again.",
        });
      },
    });
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 dark:from-slate-950 dark:via-background dark:to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(10,71,163,0.12),transparent_30%),radial-gradient(circle_at_88%_70%,rgba(255,101,0,0.14),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-orange-500" />
              Coding Gurukul Courses
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl dark:text-white">
              Placement courses made for coding rounds, OAs and interviews.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Choose the right accelerator: foundation for basics, pro batch
              for advanced DSA and CP, or the dedicated sheet for focused
              practice.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 px-6" onClick={() => buyCourse(courses[0])}>
                <CreditCard className="mr-2 h-4 w-4" />
                Buy Pro Batch
              </Button>
              <Button variant="outline" className="h-12 px-6" asChild>
                <a href="#course-list">Explore Courses</a>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <HeroStat value="3" label="Programs" />
              <HeroStat value="Rs. 299" label="Starting" />
              <HeroStat value="45 Days" label="Pro Batch" />
            </div>
          </div>

          <div className="relative rounded-2xl border bg-white p-3 shadow-2xl">
            <img
              src={courses[0].image}
              alt={`${courses[0].title} banner`}
              className="aspect-[3/1] w-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="border-b bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 md:grid-cols-4">
          <TrustPoint icon={<Clock />} title="Live + Structured" />
          <TrustPoint icon={<Award />} title="Certificate Included" />
          <TrustPoint icon={<ShieldCheck />} title="Interview Focused" />
          <TrustPoint icon={<CheckCircle2 />} title="Razorpay Checkout" />
        </div>
      </section>

      <section id="course-list" className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-orange-500">
              Choose Your Track
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950 md:text-4xl dark:text-white">
              Three clear options for placement preparation
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Each course card shows the full banner, exact launch price and
              what the learner receives.
            </p>
          </div>

          <Card className="rounded-2xl border-blue-100 bg-blue-50/70">
            <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-700">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">Cart</p>
                <p className="text-sm text-muted-foreground">
                  {cartItems.length
                    ? `${cartItems.length} course${cartItems.length > 1 ? "s" : ""} selected`
                    : "No courses added yet"}
                </p>
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {cartItems.map((item) => (
                  <Badge key={item.id} variant="secondary">
                    {item.title}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </div>

        <div className="grid gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isAdded={cartItems.some((item) => item.id === course.id)}
              onAddToCart={addToCart}
              onBuy={buyCourse}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border bg-white/80 p-4 shadow-sm dark:bg-card">
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
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-orange-300">
        {icon}
      </div>
      <p className="font-semibold">{title}</p>
    </div>
  );
}
