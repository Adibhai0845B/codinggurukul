import { ArrowRight, Code2, GraduationCap, HeartHandshake, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import LearningSphere from "@/components/LearningSphere";
const values = [
  { icon: GraduationCap, title: "Mentorship that feels personal", text: "Students learn with people who explain the thinking, review the work and stay invested in their progress." },
  { icon: Code2, title: "Practice that builds confidence", text: "Every concept moves into structured problem-solving, live labs and feedback that turns knowledge into ability." },
  { icon: HeartHandshake, title: "A community that grows together", text: "Workshops, orientations and campus programs create a learning culture where students support and challenge one another." },
];
const moments = [
  { src: "/about-lab-session.jpg", alt: "Students solving coding problems in a Coding Gurukul computer lab", className: "md:col-span-2 md:row-span-2" },
  { src: "/about-community.jpg", alt: "Coding Gurukul student community after a campus event", className: "md:col-span-2" },
  { src: "/about-mentor-class.jpg", alt: "Mentor leading a live classroom session", className: "" },
  { src: "/about-practice-lab.jpg", alt: "Students focused on practical coding exercises", className: "" },
  { src: "/about-orientation.jpg", alt: "Students attending a large Coding Gurukul orientation", className: "md:col-span-2" },
];

export default function About() {
  return (
    <main className="overflow-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#020817] text-white">
        <img src="/about-community.jpg" alt="Coding Gurukul learning community" className="absolute inset-0 h-full w-full object-cover opacity-15" fetchPriority="high" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_50%,rgba(37,99,235,.26),transparent_30%),linear-gradient(90deg,#020817_12%,rgba(2,8,23,.95)_52%,rgba(2,8,23,.72))]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(96,165,250,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,.08)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="relative mx-auto grid min-h-[680px] w-full max-w-7xl items-center gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[1.04fr_.96fr] lg:px-8">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-blue-100 backdrop-blur"><Sparkles className="h-4 w-4 text-orange-300" /> The people behind the progress</div>
            <h1 className="mt-7 text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl md:text-7xl">Learning becomes powerful when it becomes <span className="bg-gradient-to-r from-sky-300 to-orange-300 bg-clip-text text-transparent">real.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">Coding Gurukul is a mentor-led learning community built to close the distance between classroom theory and the confidence needed to perform.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-14 rounded-xl bg-orange-500 px-7 font-black text-white hover:bg-orange-400"><Link href="/courses">Explore our programs <ArrowRight className="ml-2 h-5 w-5" /></Link></Button><a href="#our-purpose" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 text-sm font-bold backdrop-blur transition hover:bg-white/10">Why we exist <ArrowRight className="h-4 w-4" /></a></div>
          </div>
          <div className="relative hidden min-h-[540px] lg:block"><LearningSphere /></div>
        </div>
      </section>

      <section id="our-purpose" className="relative scroll-mt-20 py-20 md:py-28">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl dark:bg-blue-950/40" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-blue-700">Why we exist</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-5xl">We teach the skills between knowing and doing.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">Our programs combine clear explanations, daily coding, mentor feedback and accountability. The result is not just stronger code—it is clearer thinking, better habits and the courage to take on difficult problems.</p>
            <div className="mt-9 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[['60K+', 'Students reached'], ['50+', 'Workshops'], ['150+', 'Problems']].map(([value, label]) => <div key={label} className="rounded-2xl bg-[#061a35] p-5 text-white"><p className="text-2xl font-black text-sky-300">{value}</p><p className="mt-1 text-xs text-slate-400">{label}</p></div>)}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-sky-50 py-20 dark:bg-slate-900/50 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl"><p className="text-sm font-black uppercase tracking-[.2em] text-blue-700">What makes us different</p><h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Built around student transformation.</h2></div>
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">{values.map(({ icon: Icon, title, text }, index) => <article key={title} className="group relative h-full overflow-hidden rounded-3xl border border-blue-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950"><span className="absolute right-6 top-5 text-5xl font-black text-blue-50 transition group-hover:text-orange-50 dark:text-slate-900">0{index + 1}</span><div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-700/20"><Icon className="h-7 w-7" /></div><h3 className="relative mt-6 text-xl font-black">{title}</h3><p className="relative mt-3 leading-7 text-slate-600 dark:text-slate-400">{text}</p><div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-blue-600 to-orange-400 transition-transform duration-300 group-hover:scale-x-100" /></article>)}</div>
        </div>
      </section>
      <section className="py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-black uppercase tracking-[.2em] text-blue-700">Life at Coding Gurukul</p><h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">The moments behind the mission.</h2></div><p className="max-w-md leading-7 text-slate-600 dark:text-slate-400">Live labs, packed orientations, campus workshops and the people who make every milestone meaningful.</p></div>
          <div className="mt-12 grid gap-4 md:auto-rows-[260px] md:grid-cols-3">{moments.map(photo => <figure key={photo.src} className={`group aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200 md:aspect-auto ${photo.className}`}><img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></figure>)}</div>
        </div>
      </section>
      <section className="border-t border-white/10 bg-[#041225] py-16 text-white"><div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8"><div><p className="text-sm font-black uppercase tracking-[.2em] text-sky-300">Your next chapter</p><h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight">Learn with structure. Practise with purpose. Grow with mentors.</h2></div><Button asChild size="lg" className="h-14 w-full rounded-2xl bg-blue-700 px-7 font-bold text-white hover:bg-blue-600 sm:w-auto"><Link href="/courses">Explore programs <ArrowRight className="ml-2 h-5 w-5" /></Link></Button></div></section>
    </main>
  );
}
