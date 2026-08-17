import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight, BookOpen, BriefcaseBusiness, ChevronRight, Code2,
  ExternalLink, Flame, GraduationCap, PlayCircle, Presentation,
  Radio, Target, Trophy,
} from "lucide-react";
import ContactModal from "@/components/ContactModal";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CONTACT_FORM_URL } from "@/config";
import { courses } from "@/data/courses";
import { cpQuestions } from "@/data/cpQuestions";
import { dsaQuestions } from "@/data/dsaQuestions";
import { start100Questions } from "@/data/start100Questions";
import useAuth from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";

const heroPhotos = [
  { src: "/home-community.jpg", alt: "Coding Gurukul mentors and students at a college learning event" },
  { src: "/home-classroom.jpg", alt: "Mentor-led coding training in a college computer lab" },
  { src: "/home-achievement.jpg", alt: "Coding Gurukul students celebrating an achievement" },
];

const programs = [
  { icon: Code2, title: "DSA and problem solving", copy: "Programming foundations, interview patterns, guided practice and regular assessments." },
  { icon: Trophy, title: "Competitive programming", copy: "Contest-focused training for faster implementation, stronger logic and confident problem solving." },
  { icon: BriefcaseBusiness, title: "Placement preparation", copy: "Technical interviews, aptitude, mock assessments, resume readiness and company-focused practice." },
  { icon: Presentation, title: "Workshops and bootcamps", copy: "Focused campus programs for orientation, skill development and placement drives." },
];

export default function Home() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const completedIds = useProgress((state) => state.completedIds);
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  useEffect(() => {
    const timer = window.setInterval(() => setActivePhoto((current) => (current + 1) % heroPhotos.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const allIds = useMemo(() => new Set([...dsaQuestions, ...cpQuestions, ...start100Questions].map((q) => q.id)), []);
  const totalQuestions = allIds.size;
  const solved = completedIds.filter((id) => allIds.has(id)).length;
  const dailyQuestion = dsaQuestions[Math.floor(Date.now() / 86_400_000) % dsaQuestions.length];
  const dailyUrl = dailyQuestion.leetcodeLink || dailyQuestion.gfgLink;

  return (
    <div className="overflow-hidden bg-[#f7f8fa] text-slate-950 dark:bg-[#0f0f0f] dark:text-white">
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} formUrl={CONTACT_FORM_URL} />

      <section className="relative isolate min-h-[calc(100svh-76px)] overflow-hidden bg-slate-950 text-white">
        {heroPhotos.map((photo, index) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fetchPriority={index === 0 ? "high" : "auto"}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${index === activePhoto ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b16]/95 via-[#050b16]/70 to-[#050b16]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b16]/85 via-transparent to-[#050b16]/25" />
        <div className="relative mx-auto flex min-h-[calc(100svh-76px)] w-full max-w-7xl items-end px-4 pb-10 pt-20 sm:px-6 sm:pb-14 lg:items-center lg:px-8 lg:py-16">
          <div className="w-full max-w-[760px]">
            <div className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.16em] text-orange-300 sm:text-xs">
              <span className="h-px w-8 bg-orange-400" /> College training and placement partnerships
            </div>
            <h1 className="mt-5 text-[2.6rem] font-black leading-[1.04] tracking-[-.045em] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              Turn campus potential into <span className="text-orange-400">industry-ready talent.</span>
            </h1>
            <p className="mt-5 max-w-[650px] text-base font-medium leading-7 text-slate-200 sm:mt-6 sm:text-lg sm:leading-8">
              Structured technical training, coding practice, assessments and placement preparation—delivered on campus and online by experienced mentors.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <Button onClick={() => setContactOpen(true)} className="h-12 rounded-md bg-orange-500 px-6 font-bold text-white shadow-lg shadow-black/20 hover:bg-orange-600">Partner with us <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button asChild variant="outline" className="h-12 border-white/30 bg-white/10 px-6 font-bold text-white backdrop-blur-sm hover:bg-white hover:text-slate-950"><a href="#programs">Explore training programs</a></Button>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-5 sm:mt-10">
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-300"><span><strong className="text-white">60K+</strong> learners</span><span className="h-4 w-px bg-white/20" /><span><strong className="text-white">50+</strong> workshops</span></div>
              <div className="flex items-center gap-2" aria-label="Homepage image carousel">
                {heroPhotos.map((photo, index) => <button key={photo.src} type="button" onClick={() => setActivePhoto(index)} aria-label={`Show image ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === activePhoto ? "w-9 bg-orange-400" : "w-4 bg-white/40 hover:bg-white"}`} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b2f6b] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {[["60K+", "Students reached"], ["50+", "Campus workshops"], ["Mentor-led", "Live classroom delivery"], ["Placement-first", "Career outcome focus"]].map(([value, label]) => <div key={label} className="border-white/10 px-4 py-6 text-center odd:border-r lg:border-r lg:last:border-0"><p className="text-xl font-extrabold leading-tight">{value}</p><p className="mt-2 text-xs leading-5 text-blue-200">{label}</p></div>)}
        </div>
      </section>

      <section id="programs" className="bg-white py-16 dark:bg-[#141414] md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16">
            <div><p className="text-sm font-semibold text-blue-600">Institutional training programs</p><h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-.025em] md:text-4xl">Built around your students and placement goals.</h2><p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">We work with departments and placement cells to define the right modules, difficulty, delivery schedule and assessment plan.</p><Button onClick={() => setContactOpen(true)} variant="outline" className="mt-7">Discuss your requirement</Button></div>
            <div className="grid gap-4 sm:grid-cols-2">{programs.map(({ icon: Icon, title, copy }) => <article key={title} className="min-h-[190px] rounded-lg border p-6 dark:border-white/10"><Icon className="h-5 w-5 text-blue-600" /><h3 className="mt-5 text-lg font-bold leading-6">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{copy}</p></article>)}</div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <section className="grid items-stretch gap-5 lg:grid-cols-[1.35fr_.65fr]">
          <article className="rounded-lg border bg-white p-6 dark:border-white/10 dark:bg-[#171717] md:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-orange-500">Problem of the day</p><h2 className="mt-2 text-2xl font-bold leading-tight">{dailyQuestion.title}</h2><p className="mt-2 text-sm text-slate-500">{dailyQuestion.topic} · {dailyQuestion.difficulty}</p></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-orange-50 text-orange-600 dark:bg-orange-500/10"><Target className="h-5 w-5" /></span></div><p className="mt-6 border-l-2 pl-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-400">{dailyQuestion.note || "Identify the pattern, test the approach on small examples and then write the solution."}</p><Button asChild className="mt-6 bg-[#2cbb5d] font-bold hover:bg-[#24a950]"><a href={dailyUrl} target="_blank" rel="noreferrer">Solve problem <ExternalLink className="ml-2 h-4 w-4" /></a></Button></article>
          <article className="rounded-lg border bg-white p-6 dark:border-white/10 dark:bg-[#171717] md:p-7"><div className="flex items-center justify-between"><h2 className="font-bold">Your progress</h2><Flame className="h-5 w-5 text-orange-500" /></div>{isLoggedIn ? <><p className="mt-7 text-4xl font-extrabold leading-none">{solved}<span className="text-base font-medium text-slate-400"> / {totalQuestions}</span></p><p className="mt-3 text-sm text-slate-500">problems completed</p><Progress value={(solved / totalQuestions) * 100} className="mt-5 h-2" /><Link href="/progress" className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600">View report <ChevronRight className="h-4 w-4" /></Link></> : <><p className="mt-6 text-sm leading-6 text-slate-500">Sign in to save solved problems, bookmarks, notes and learning streaks.</p><Button asChild variant="outline" className="mt-5 w-full"><Link href="/login">Sign in</Link></Button></>}</article>
        </section>

        <section><SectionHeading title="Choose a learning path" copy="Start with the track that matches your current goal." href="/dashboard" /><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><PathCard icon={<BookOpen />} title="Start 150" copy="Build programming confidence with beginner problems." href="/start-100" meta={`${start100Questions.length} problems`} /><PathCard icon={<Code2 />} title="DSA practice" copy="Master interview patterns topic by topic." href="/dsa" meta={`${dsaQuestions.length} problems`} /><PathCard icon={<Trophy />} title="Competitive programming" copy="Improve speed through rating-wise practice." href="/cp" meta={`${cpQuestions.length} problems`} /><PathCard icon={<BriefcaseBusiness />} title="Placement readiness" copy="Prepare your profile, fundamentals and interviews." href="/placement-readiness" meta="Career toolkit" /></div></section>

        <section><SectionHeading title="Courses" copy="Mentor-led and self-paced programs for focused outcomes." href="/courses" /><Carousel opts={{ align: "start" }} className="mt-5"><CarouselContent className="-ml-4 items-stretch">{courses.map((course) => <CarouselItem key={course.id} className="h-auto pl-4 md:basis-1/2 lg:basis-1/3"><CourseCard course={course} compact /></CarouselItem>)}</CarouselContent><CarouselPrevious className="-top-12 left-auto right-11 h-8 w-8 rounded-md" /><CarouselNext className="-top-12 right-0 h-8 w-8 rounded-md" /></Carousel></section>

        <section className="grid gap-5 md:grid-cols-3"><QuickLink icon={<Radio />} title="Live classes" copy="Join upcoming mentor sessions." href="/live-classes" /><QuickLink icon={<PlayCircle />} title="Online compiler" copy="Write, run and test your code." href="/compiler" /><QuickLink icon={<GraduationCap />} title="Course catalogue" copy="Compare programs and mentors." href="/courses" /></section>

        <section className="rounded-lg bg-[#0b2f6b] px-6 py-10 text-white md:px-10 md:py-12"><div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between"><div className="max-w-2xl"><p className="text-sm font-semibold text-blue-200">For colleges and placement teams</p><h2 className="mt-3 text-3xl font-extrabold leading-tight">Plan a training program for your campus.</h2><p className="mt-4 leading-7 text-blue-100">Tell us about your cohort, target skills and preferred delivery format. We’ll structure the right program.</p></div><Button onClick={() => setContactOpen(true)} className="h-11 w-full shrink-0 bg-white px-5 font-bold text-blue-800 hover:bg-blue-50 sm:w-auto">Request a proposal <ArrowRight className="ml-2 h-4 w-4" /></Button></div></section>
      </main>
    </div>
  );
}

function SectionHeading({ title, copy, href }: { title: string; copy: string; href: string }) {
  return <div className="flex items-end justify-between gap-5"><div><h2 className="text-2xl font-bold leading-tight">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p></div><Link href={href} className="shrink-0 text-sm font-semibold text-blue-600">View all</Link></div>;
}

function PathCard({ icon, title, copy, href, meta }: { icon: React.ReactNode; title: string; copy: string; href: string; meta: string }) {
  return <Link href={href} className="group flex min-h-[220px] flex-col rounded-lg border bg-white p-5 transition hover:border-blue-300 hover:shadow-sm dark:border-white/10 dark:bg-[#171717]"><span className="grid h-9 w-9 place-items-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-500/10">{icon}</span><h3 className="mt-5 font-bold group-hover:text-blue-600">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p><p className="mt-auto pt-5 text-xs font-semibold text-slate-400">{meta}</p></Link>;
}

function QuickLink({ icon, title, copy, href }: { icon: React.ReactNode; title: string; copy: string; href: string }) {
  return <Link href={href} className="flex items-center gap-4 rounded-lg border bg-white p-5 transition hover:border-blue-300 dark:border-white/10 dark:bg-[#171717]"><span className="text-blue-600">{icon}</span><div className="min-w-0 flex-1"><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm text-slate-500">{copy}</p></div><ChevronRight className="h-4 w-4 shrink-0 text-slate-400" /></Link>;
}
