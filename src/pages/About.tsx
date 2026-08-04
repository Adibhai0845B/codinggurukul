import { ArrowRight, BookOpen, Check, Code2, GraduationCap, HeartHandshake, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import TeamSection from "@/components/TeamSection";

const values = [
  { icon: GraduationCap, number: "01", title: "Personal mentorship", text: "Mentors explain the thinking, review the work and stay involved in every student’s progress." },
  { icon: Code2, number: "02", title: "Practice with purpose", text: "Concepts move directly into coding labs, structured problems and feedback that builds confidence." },
  { icon: HeartHandshake, number: "03", title: "A strong community", text: "Students learn together through workshops, contests and campus programs that create momentum." },
];

const learningJourney = [
  { step: "Understand", text: "Clear explanations and visual examples make difficult concepts approachable." },
  { step: "Apply", text: "Students solve curated questions with guidance instead of watching endless tutorials." },
  { step: "Improve", text: "Reviews, doubt sessions and contests turn mistakes into measurable progress." },
  { step: "Perform", text: "Mock OAs and interviews prepare learners to show their skills with confidence." },
];

const moments = [
  { src: "/about-lab-session.jpg", alt: "Students solving coding problems in a computer lab", className: "md:col-span-2 md:row-span-2" },
  { src: "/about-welcome.png", alt: "Coding Gurukul team welcoming a guest", className: "" },
  { src: "/about-mentor-class.jpg", alt: "Mentor leading a live classroom session", className: "" },
  { src: "/about-community.jpg", alt: "Coding Gurukul student community", className: "md:col-span-2" },
  { src: "/about-practice-lab.jpg", alt: "Students focused on practical coding exercises", className: "" },
  { src: "/about-orientation.jpg", alt: "Students attending a Coding Gurukul orientation", className: "" },
];

export default function About() {
  return (
    <main className="overflow-hidden bg-[#041225] text-white">
      <section className="relative bg-[#04162d] text-white">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(125,211,252,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,.08)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative mx-auto grid min-h-[720px] w-full max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm font-bold text-sky-200"><Sparkles className="h-4 w-4" /> This is Coding Gurukul</div>
            <h1 className="mt-7 text-5xl font-black leading-[1.02] tracking-[-.05em] sm:text-6xl lg:text-7xl">We don’t just teach code.<br /><span className="text-sky-300">We build confidence.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">A mentor-led learning community helping students turn classroom knowledge into practical skills, stronger thinking and placement readiness.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-14 rounded-xl bg-sky-300 px-7 font-black text-[#04162d] hover:bg-sky-200"><Link href="/courses">Explore our programs <ArrowRight className="ml-2 h-5 w-5" /></Link></Button><a href="#our-story" className="inline-flex h-14 items-center justify-center gap-2 px-4 font-bold text-slate-200 hover:text-white">Read our story <ArrowRight className="h-4 w-4" /></a></div>
          </div>

          <div className="relative mx-auto hidden h-[560px] w-full max-w-[610px] lg:block">
            <div className="absolute right-0 top-0 h-[430px] w-[72%] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl"><img src="/about-community.jpg" alt="Coding Gurukul learning community" className="h-full w-full object-cover" /></div>
            <div className="absolute bottom-0 left-0 h-[300px] w-[52%] overflow-hidden rounded-[2rem] border-[8px] border-[#04162d] shadow-2xl"><img src="/about-mentor-class.jpg" alt="A Coding Gurukul mentor teaching students" className="h-full w-full object-cover" /></div>
            <div className="absolute bottom-12 right-4 rounded-2xl border border-sky-200/20 bg-sky-300/10 p-5 backdrop-blur-xl"><p className="text-3xl font-black text-sky-300">60K+</p><p className="mt-1 text-sm text-slate-300">students reached</p></div>
          </div>
          <div className="overflow-hidden rounded-3xl lg:hidden"><img src="/about-community.jpg" alt="Coding Gurukul learning community" className="aspect-[4/3] w-full object-cover" /></div>
        </div>
      </section>

      <section className="border-b border-sky-300/10 bg-[#08264d]"><div className="mx-auto grid w-full max-w-7xl grid-cols-2 px-4 py-7 sm:px-6 md:grid-cols-4 lg:px-8">{[["60K+", "Student reach"], ["50+", "Workshops"], ["150+", "Curated problems"], ["12 LPA", "Success story"]].map(([value, label], index) => <div key={label} className={`px-4 py-3 text-center ${index % 2 === 0 ? "border-r border-sky-300/15" : ""} md:border-r md:last:border-0`}><p className="text-3xl font-black text-sky-300">{value}</p><p className="mt-1 text-sm font-semibold text-slate-300">{label}</p></div>)}</div></section>

      <section id="our-story" className="bg-[#071d38] py-20 md:py-28"><div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:gap-20 lg:px-8">
        <div className="relative"><div className="overflow-hidden rounded-[2rem] bg-sky-100"><img src="/about-welcome.png" alt="A warm Coding Gurukul welcome" className="aspect-[4/5] w-full object-cover" /></div><div className="absolute -bottom-7 -right-2 max-w-[280px] rounded-3xl bg-blue-700 p-6 text-white shadow-2xl sm:right-[-1.5rem]"><BookOpen className="h-6 w-6 text-sky-200" /><p className="mt-3 text-xl font-black leading-snug">Education works better with a human connection.</p></div></div>
        <div className="pt-8 lg:pt-0"><Eyebrow>Why we exist</Eyebrow><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.035em] md:text-5xl">We bridge the gap between knowing and doing.</h2><p className="mt-6 text-lg leading-8 text-slate-300">Students often understand a concept but struggle to use it independently. Coding Gurukul was built to close that gap through explanation, practice, feedback and accountability.</p><p className="mt-5 text-lg leading-8 text-slate-300">Our goal is simple: every learner should leave a session better equipped to solve the next problem on their own.</p><div className="mt-8 space-y-4">{["Live guidance from practising mentors", "Structured learning instead of random tutorials", "Preparation connected to real hiring expectations"].map(item => <div key={item} className="flex items-center gap-3 font-bold text-slate-200"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-300/15 text-sky-300"><Check className="h-4 w-4" /></span>{item}</div>)}</div></div>
      </div></section>

      <section className="bg-[#0a2a52] py-20 md:py-28"><div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="What defines us" title="Built around student transformation" text="A good learning experience should feel clear, practical and personal at every step." /><div className="mt-12 grid gap-6 md:grid-cols-3">{values.map(({ icon: Icon, number, title, text }) => <article key={title} className="group flex h-full flex-col rounded-3xl border border-sky-300/10 bg-[#0d3566] p-8 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-sky-300/30 hover:bg-[#104078]"><div className="flex items-center justify-between"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-300 text-[#041225]"><Icon className="h-7 w-7" /></div><span className="font-mono text-sm font-bold text-sky-300">{number}</span></div><h3 className="mt-7 text-2xl font-black">{title}</h3><p className="mt-3 flex-1 leading-7 text-slate-300">{text}</p></article>)}</div></div></section>

      <section className="bg-[#061a35] py-20 text-white md:py-28"><div className="mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr] lg:gap-20 lg:px-8"><div><Eyebrow light>Our learning approach</Eyebrow><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.035em] md:text-5xl">Progress should never feel random.</h2><p className="mt-5 text-lg leading-8 text-slate-300">Every part of the journey prepares students for what comes next.</p><div className="mt-8 overflow-hidden rounded-3xl"><img src="/about-practice-lab.jpg" alt="Students practising coding" className="aspect-[4/3] w-full object-cover" /></div></div><div className="divide-y divide-white/10 border-y border-white/10">{learningJourney.map((item, index) => <div key={item.step} className="grid gap-3 py-7 sm:grid-cols-[4rem_9rem_1fr]"><span className="font-mono text-sm text-sky-300">0{index + 1}</span><h3 className="text-xl font-black">{item.step}</h3><p className="leading-7 text-slate-300">{item.text}</p></div>)}</div></div></section>

      <section className="bg-[#071d38] py-20 md:py-28"><div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="Life at Coding Gurukul" title="Real people. Real classrooms." text="" /><p className="max-w-md leading-7 text-slate-300">Labs, orientations, workshops and the shared moments that turn a course into a community.</p></div><div className="mt-12 grid gap-4 md:auto-rows-[230px] md:grid-cols-4">{moments.map(photo => <figure key={photo.src} className={`group aspect-[4/3] overflow-hidden rounded-3xl bg-[#0d3566] md:aspect-auto ${photo.className}`}><img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></figure>)}</div></div></section>

      <section className="bg-[#041225] text-white"><TeamSection /></section>

      <section className="relative overflow-hidden bg-blue-700 py-20 text-white"><div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border-[60px] border-sky-200/10" /><div className="relative mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8"><div><p className="text-sm font-black uppercase tracking-[.2em] text-sky-200">Your next chapter</p><h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">Learn with structure. Grow with mentors.</h2></div><Button asChild size="lg" className="h-14 w-full shrink-0 rounded-xl bg-sky-200 px-7 font-black text-blue-800 hover:bg-sky-100 sm:w-auto"><Link href="/courses">Explore programs <ArrowRight className="ml-2 h-5 w-5" /></Link></Button></div></section>
    </main>
  );
}

function Eyebrow({ children }: { children: React.ReactNode; light?: boolean }) { return <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[.18em] text-sky-300"><span className="h-2 w-2 rounded-full bg-sky-400" />{children}</p>; }
function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) { return <div className="max-w-3xl"><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-5 text-4xl font-black tracking-[-.035em] md:text-5xl">{title}</h2>{text && <p className="mt-4 text-lg leading-8 text-slate-300">{text}</p>}</div>; }
