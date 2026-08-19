import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Award, BarChart3, BriefcaseBusiness, Building2, CheckCircle2, Clock3, Code2, GraduationCap, Handshake, Phone, Presentation, Users } from "lucide-react";
import B2BInquiryModal from "@/components/B2BInquiryModal";
import { Button } from "@/components/ui/button";
import { CONTACT_PHONE } from "@/config";

const campusPhotos = [
  { src: "/home-classroom.jpg", alt: "Mentor-led coding class in a college lab" },
  { src: "/about-orientation.jpg", alt: "Coding Gurukul college orientation" },
  { src: "/about-practice-lab.jpg", alt: "Students practising coding in a campus lab" },
  { src: "/home-achievement.jpg", alt: "Students celebrating a learning achievement" },
  { src: "/about-community.jpg", alt: "Coding Gurukul campus learning community" },
];

const offers = [
  { icon: Code2, title: "Technical training", copy: "Programming, DSA, competitive coding and development tracks aligned to student level." },
  { icon: Presentation, title: "Campus bootcamps", copy: "Focused workshops and longer cohorts delivered on campus, online or in a blended format." },
  { icon: BarChart3, title: "Assessment and reporting", copy: "Baseline checks, regular evaluations and progress evidence for faculty and placement teams." },
  { icon: GraduationCap, title: "Placement preparation", copy: "Online assessments, interviews, aptitude and company-focused practice before hiring season." },
];

const partnershipPrograms = [
  {
    icon: Clock3,
    label: "Training only",
    hours: "120 hours",
    title: "Rigorous technical training",
    copy: "A structured, mentor-led program delivered offline on campus, supported by online practice, doubt resolution and progress tracking.",
    points: ["Offline classroom delivery", "Online learning support", "Structured assessments", "Faculty progress visibility"],
    tone: "blue",
  },
  {
    icon: GraduationCap,
    label: "Training + internship",
    hours: "100 hours",
    title: "Placement training-cum-internship",
    copy: "A practical career program combining placement preparation, project-style work and guided problem solving with internship recognition.",
    points: ["Placement-focused curriculum", "Practical assignments", "Interview preparation", "Internship experience and recognition"],
    tone: "orange",
  },
  {
    icon: Handshake,
    label: "End-to-end partnership",
    hours: "Training + opportunities",
    title: "Training with placement assistance",
    copy: "Our complete partnership combines technical preparation with access to relevant hiring opportunities through our company network.",
    points: ["Cohort-specific preparation", "Hiring opportunity coordination", "Mock OAs and interviews", "Placement-team collaboration"],
    tone: "emerald",
  },
];

export default function B2BInitiative() {
  const [bookOpen, setBookOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return <div className="overflow-hidden bg-[#f4f7fb] text-slate-950 dark:bg-[#070c15] dark:text-white">
    <B2BInquiryModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

    <section className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden bg-[#06142b] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_40%,rgba(37,99,235,.25),transparent_30%),radial-gradient(circle_at_20%_10%,rgba(249,115,22,.12),transparent_28%)]" />
      <div className="absolute inset-0 opacity-[.045] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
        <div className="z-20 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.16em] text-orange-300"><Building2 className="h-3.5 w-3.5" />B2B initiative for colleges</div>
          <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-.045em] sm:text-5xl lg:text-6xl">A stronger learning culture, built inside your campus.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">Coding Gurukul partners with institutions to design, deliver and measure technical training that prepares students for real placement opportunities.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 bg-orange-500 px-6 font-bold text-white hover:bg-orange-400"><a href="#partnership-programs">Plan a campus program <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
            <Button asChild variant="outline" className="h-12 border-white/20 bg-white/5 px-6 font-bold text-white hover:bg-white hover:text-slate-950"><a href="#offer">See what we offer</a></Button>
          </div>
        </div>

        <div className="relative min-h-[510px] lg:min-h-[620px]" aria-label="Interactive Coding Gurukul campus story">
          <p className={`absolute inset-x-0 top-1 text-center text-xs font-bold uppercase tracking-[.2em] text-blue-200 transition duration-500 ${bookOpen ? "opacity-0" : "opacity-100"}`}>Click the book to open our campus story</p>
          <div className={`cg-story-photos ${bookOpen ? "is-open" : ""}`}>
            {campusPhotos.map((photo, index) => <figure key={photo.src} className="cg-story-photo" style={{ "--photo-index": index } as React.CSSProperties}><img src={photo.src} alt={photo.alt} /></figure>)}
          </div>
          <button type="button" onClick={() => setBookOpen(open => !open)} className={`cg-story-book ${bookOpen ? "is-open" : ""}`} aria-expanded={bookOpen} aria-label={bookOpen ? "Close campus story book" : "Open campus story book"}>
            <span className="cg-story-book__pages" />
            <span className="cg-story-book__back" />
            <span className="cg-story-book__cover">
              <img src="/logo.png" alt="" />
              <span className="cg-story-book__eyebrow">Coding Gurukul</span>
              <strong>Campus<br />Partnerships</strong>
              <span className="cg-story-book__rule" />
              <small>Learn · Practise · Perform</small>
            </span>
          </button>
          <p className={`absolute inset-x-0 bottom-3 text-center text-sm font-semibold text-slate-400 transition duration-500 ${bookOpen ? "opacity-100" : "opacity-0"}`}>Real classrooms. Real mentors. Visible progress.</p>
        </div>
      </div>
    </section>

    <section className="border-b bg-white dark:border-white/10 dark:bg-[#0b111c]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[["60K+", "Learners reached"], ["50+", "Campus workshops"], ["Flexible", "On-campus or online"], ["Measurable", "Progress reporting"]].map(([value, label]) => <div key={label} className="border-r px-4 py-7 text-center last:border-r-0 dark:border-white/10"><p className="text-xl font-black text-blue-700 dark:text-blue-400">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}
      </div>
    </section>

    <section className="border-b bg-white dark:border-white/10 dark:bg-[#0b111c]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div><p className="text-sm font-bold text-slate-900 dark:text-white">Registered and quality certified</p><p className="mt-1 text-sm text-slate-500">Institutional training delivered through documented business and quality processes.</p></div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-3 rounded-lg border bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5"><span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-md bg-white p-1"><img src="/msme-logo.png" alt="MSME registered enterprise logo" className="h-full w-full object-contain" /></span><div><p className="text-sm font-black">MSME</p><p className="text-xs text-slate-500">Registered enterprise</p></div></div>
          <div className="flex items-center gap-3 rounded-lg border bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5"><span className="grid h-12 w-16 shrink-0 place-items-center overflow-hidden rounded-md bg-white p-1"><img src="/iso-logo.png" alt="ISO certification logo" className="h-full w-full object-contain" /></span><div><p className="text-sm font-black">ISO 9001</p><p className="text-xs text-slate-500">Quality management certified</p></div></div>
        </div>
      </div>
    </section>

    <section id="partnership-programs" className="scroll-mt-20 bg-[#eaf1fa] py-20 dark:bg-[#09101b] md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[.18em] text-blue-700 dark:text-blue-400">Current institutional programs</p><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.04em] md:text-5xl">Choose the partnership model that matches your campus goal.</h2><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">Start with focused training, add practical internship experience, or work with us across training and placement assistance.</p></div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {partnershipPrograms.map(({ icon: Icon, label, hours, title, copy, points, tone }) => <article key={label} className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#101824]">
            <div className="flex items-start justify-between gap-4"><span className={`grid h-11 w-11 place-items-center rounded-lg ${tone === "orange" ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300" : tone === "emerald" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"}`}><Icon className="h-5 w-5" /></span><span className="rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:border-white/10">{hours}</span></div>
            <p className="mt-6 text-xs font-black uppercase tracking-[.14em] text-blue-700 dark:text-blue-400">{label}</p>
            <h3 className="mt-2 text-2xl font-black leading-tight">{title}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{copy}</p>
            <div className="mt-6 space-y-3 border-t pt-5 dark:border-white/10">{points.map(point => <p key={point} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{point}</p>)}</div>
            <Button onClick={() => setContactOpen(true)} variant="outline" className="mt-7 w-full font-bold">Discuss this program <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </article>)}
        </div>

        <div className="mt-12 grid overflow-hidden rounded-xl bg-[#061b3c] text-white lg:grid-cols-[.8fr_1.2fr]">
          <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-9"><p className="text-xs font-black uppercase tracking-[.18em] text-orange-300">Why Coding Gurukul</p><h3 className="mt-4 text-3xl font-black leading-tight">Training led by people who understand competitive coding and hiring.</h3></div>
          <div className="grid sm:grid-cols-3">{[[Award, "Top mentors", "Learn from experienced mentors and competitive programmers from across India."], [Code2, "Real problem solving", "Students solve company-relevant coding problems, not only classroom examples."], [BriefcaseBusiness, "Industry connections", "Our company network helps trained cohorts discover relevant hiring opportunities."]].map(([Icon, title, copy], index) => { const QualityIcon = Icon as typeof Award; return <div key={String(title)} className={`p-7 ${index ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}><QualityIcon className="h-5 w-5 text-blue-300" /><h4 className="mt-5 font-black">{String(title)}</h4><p className="mt-3 text-sm leading-6 text-slate-400">{String(copy)}</p></div>; })}</div>
        </div>
        <p className="mt-5 text-center text-xs leading-5 text-slate-500">Placement assistance means opportunity support and employer coordination; final hiring decisions remain with participating companies.</p>

        <div className="mt-16 grid items-center gap-8 border-t border-slate-300 pt-12 dark:border-white/10 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-orange-500">Leadership behind the initiative</p><h3 className="mt-4 text-3xl font-black leading-tight">Institutional relationships with personal ownership.</h3><p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">College partnerships are guided directly by Coding Gurukul leadership—from understanding campus requirements to aligning delivery and outcomes.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <article className="flex items-center gap-4 rounded-xl border bg-white p-4 dark:border-white/10 dark:bg-[#101824]"><img src="/team/shalika-formal.png" alt="Shalika, Founder of Coding Gurukul" className="h-20 w-20 shrink-0 rounded-lg object-cover object-top" /><div><h4 className="font-black">Shalika</h4><p className="mt-1 text-sm font-semibold text-blue-700 dark:text-blue-400">Founder</p><p className="mt-2 text-xs leading-5 text-slate-500">Institutional vision and partnership direction</p></div></article>
            <article className="flex items-center gap-4 rounded-xl border bg-white p-4 dark:border-white/10 dark:bg-[#101824]"><img src="/team/arunima-gupta-formal.png" alt="Arunima Gupta, Head of Operations at Coding Gurukul" className="h-20 w-20 shrink-0 rounded-lg object-cover object-top" /><div><h4 className="font-black">Arunima Gupta</h4><p className="mt-1 text-sm font-semibold text-blue-700 dark:text-blue-400">Head of Operations</p><p className="mt-2 text-xs leading-5 text-slate-500">Program coordination and operational delivery</p></div></article>
            <article className="flex items-center gap-4 rounded-xl border bg-white p-4 dark:border-white/10 dark:bg-[#101824]"><img src="/team/aditya-formal.png" alt="Aditya Krishna Gupta, Advisor at Coding Gurukul" className="h-20 w-20 shrink-0 rounded-lg object-cover object-top" /><div><h4 className="font-black">Aditya Krishna Gupta</h4><p className="mt-1 text-sm font-semibold text-blue-700 dark:text-blue-400">Advisor</p><p className="mt-2 text-xs leading-5 text-slate-500">Technology and industry alignment</p></div></article>
          </div>
        </div>
      </div>
    </section>

    <section id="offer" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-orange-500">What we offer</p><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.035em]">One partner for the complete training cycle.</h2><p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">We shape the program around your cohort, academic calendar and placement goals—not a fixed off-the-shelf syllabus.</p></div>
          <div className="grid gap-px overflow-hidden rounded-xl border bg-slate-200 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">{offers.map(({ icon: Icon, title, copy }) => <article key={title} className="bg-white p-7 dark:bg-[#101824]"><span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"><Icon className="h-5 w-5" /></span><h3 className="mt-5 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{copy}</p></article>)}</div>
        </div>
      </div>
    </section>

    <section className="bg-white py-20 dark:bg-[#0b111c] md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[.18em] text-blue-700 dark:text-blue-400">How partnership works</p><h2 className="mt-5 text-4xl font-black tracking-[-.035em]">Clear from first conversation to final report.</h2></div>
        <div className="mt-12 grid gap-8 md:grid-cols-4">{[["01", "Discover", "Understand the cohort, timetable and placement targets."], ["02", "Design", "Build the curriculum, assessments and delivery plan."], ["03", "Deliver", "Run mentor-led learning with guided practice."], ["04", "Demonstrate", "Share progress, gaps and outcome evidence."]].map(([number, title, copy]) => <article key={number} className="border-t-2 border-blue-700 pt-5"><span className="font-mono text-xs font-bold text-orange-500">{number}</span><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{copy}</p></article>)}</div>
      </div>
    </section>

    <section className="bg-[#0a2d66] py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl"><div className="flex items-center gap-2 text-sm font-bold text-blue-200"><Users className="h-4 w-4" />For placement cells, departments and institutions</div><h2 className="mt-4 text-3xl font-black md:text-4xl">Let’s design the right program for your students.</h2><p className="mt-4 leading-7 text-blue-100">Share your cohort size, target skills and preferred delivery format. We’ll take the conversation forward.</p></div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col"><Button asChild className="h-14 bg-white px-6 font-bold text-blue-800 hover:bg-blue-50"><a href={`tel:${CONTACT_PHONE}`}><Phone className="mr-3 h-4 w-4" /><span className="text-left"><span className="block text-[10px] font-bold uppercase tracking-wider text-blue-500">Request a partnership call</span><span className="block text-base font-black">{CONTACT_PHONE}</span></span></a></Button><Button asChild variant="ghost" className="text-blue-100 hover:bg-white/10 hover:text-white"><Link href="/courses"><CheckCircle2 className="mr-2 h-4 w-4" />View current programs</Link></Button></div>
      </div>
    </section>
  </div>;
}
