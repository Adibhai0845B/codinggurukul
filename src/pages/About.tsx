import { ArrowRight, BookOpen, Code2, GraduationCap, HeartHandshake, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const values = [
  { icon: GraduationCap, title: "Mentorship that feels personal", text: "Students learn with people who explain the thinking, review the work and stay invested in their progress." },
  { icon: Code2, title: "Practice that builds confidence", text: "Every concept moves into structured problem-solving, live labs and feedback that turns knowledge into ability." },
  { icon: HeartHandshake, title: "A community that grows together", text: "Workshops, orientations and campus programs create a learning culture where students support and challenge one another." },
];

const moments = [
  { src: "/about-lab-session.jpg", alt: "Students solving coding problems in a Coding Gurukul computer lab", className: "md:col-span-2 md:row-span-2" },
  { src: "/about-welcome.png", alt: "Coding Gurukul team welcoming a guest at the airport", className: "md:row-span-2" },
  { src: "/about-community.jpg", alt: "Coding Gurukul student community after a campus event", className: "md:col-span-2" },
  { src: "/about-mentor-class.jpg", alt: "Mentor leading a live classroom session", className: "" },
  { src: "/about-practice-lab.jpg", alt: "Students focused on practical coding exercises", className: "" },
  { src: "/about-orientation.jpg", alt: "Students attending a large Coding Gurukul orientation", className: "md:col-span-2" },
];

export default function About() {
  return (
    <main className="overflow-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="relative isolate min-h-[650px] overflow-hidden bg-slate-950 text-white">
        <img src="/about-community.jpg" alt="Coding Gurukul learning community" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/10" />
        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-4 py-24 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur"><Sparkles className="h-4 w-4 text-orange-400" /> Our story</div>
            <h1 className="mt-7 text-5xl font-black leading-[1.02] tracking-[-.045em] md:text-7xl">Learning becomes powerful when it becomes <span className="text-orange-400">real.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">Coding Gurukul is a mentor-led learning community built to close the distance between classroom theory and the confidence needed to perform.</p>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl dark:bg-blue-950/40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-6 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-blue-700">Why we exist</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-5xl">We teach the skills between knowing and doing.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">Our programs combine clear explanations, daily coding, mentor feedback and accountability. The result is not just stronger code—it is clearer thinking, better habits and the courage to take on difficult problems.</p>
            <div className="mt-9 grid grid-cols-3 gap-3">
              {[['60K+', 'Students reached'], ['50+', 'Workshops'], ['150+', 'Problems']].map(([value, label]) => <div key={label} className="rounded-2xl bg-slate-950 p-4 text-white"><p className="text-2xl font-black text-orange-400">{value}</p><p className="mt-1 text-xs text-slate-400">{label}</p></div>)}
            </div>
          </div>
          <div className="relative pb-10 pl-5 md:pl-10">
            <img src="/about-welcome.png" alt="A warm Coding Gurukul welcome" className="relative z-10 aspect-[4/5] w-full max-w-lg rounded-[2rem] object-cover shadow-2xl" />
            <div className="absolute bottom-0 right-0 z-20 max-w-xs rounded-3xl bg-blue-700 p-6 text-white shadow-xl"><BookOpen className="h-6 w-6 text-orange-300" /><p className="mt-3 text-xl font-black">Education with a human connection.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fc] py-24 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl"><p className="text-sm font-black uppercase tracking-[.2em] text-blue-700">What makes us different</p><h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Built around student transformation.</h2></div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">{values.map(({ icon: Icon, title, text }, index) => <article key={title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950"><div className={`grid h-14 w-14 place-items-center rounded-2xl text-white ${index === 1 ? 'bg-orange-500' : 'bg-blue-700'}`}><Icon className="h-7 w-7" /></div><h3 className="mt-6 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-black uppercase tracking-[.2em] text-blue-700">Life at Coding Gurukul</p><h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">The moments behind the mission.</h2></div><p className="max-w-md leading-7 text-slate-600 dark:text-slate-400">Live labs, packed orientations, campus workshops and the people who make every milestone meaningful.</p></div>
          <div className="mt-12 grid auto-rows-[260px] gap-4 md:grid-cols-3">{moments.map(photo => <figure key={photo.src} className={`group overflow-hidden rounded-3xl bg-slate-200 ${photo.className}`}><img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></figure>)}</div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-center md:px-6"><div><p className="text-sm font-black uppercase tracking-[.2em] text-orange-400">Your next chapter</p><h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight">Learn with structure. Practise with purpose. Grow with mentors.</h2></div><Button asChild size="lg" className="h-14 rounded-2xl bg-blue-700 px-7 font-bold text-white hover:bg-blue-600"><Link href="/courses">Explore programs <ArrowRight className="ml-2 h-5 w-5" /></Link></Button></div></section>
    </main>
  );
}
