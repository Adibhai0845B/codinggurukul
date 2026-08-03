import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight, Award, BarChart3, BookOpen, Check, Clock,
  CalendarDays, ChevronRight, Code2, ExternalLink, GraduationCap, Headphones,
  Layers3, Mail, MapPin, Phone, Quote, Rocket, ShieldCheck,
  MessageCircle, Target, Trophy, Users,
} from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ContactModal from "@/components/ContactModal";
import TeamSection from "@/components/TeamSection";
import CourseCard from "@/components/CourseCard";
import { courses, type Course } from "@/data/courses";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_FORM_URL, PURCHASE_FORM_URL } from "@/config";
import { useCourseCart } from "@/hooks/useCourseCart";
import { toast } from "@/hooks/use-toast";

const stories = [
  { name: "Pratham Jain", result: "1st Rank", program: "UDAAN 1.0 DSA Workshop", quote: "The mentorship made an intensive learning experience smooth, practical and deeply rewarding.", tone: "blue" },
  { name: "Abhishek Bhadauriya", result: "Rank 3", program: "Outstanding Performer", quote: "The continuous guidance inspired me to work harder and keep improving every day.", tone: "orange" },
  { name: "Rudrakshi Sharma", result: "Top 5", program: "Java + DSA Summer Program", quote: "The goal was never just to write better code—it was to think better. This is only the beginning.", tone: "violet" },
  { name: "Arlap Jain", result: "Internship", program: "Java + DSA Completed", quote: "I built a stronger programming foundation and learned to approach real-world problems efficiently.", tone: "emerald" },
  { name: "Yash Gupta", result: "Internship", program: "Java + DSA Completed", quote: "Consistent practice and mentor support improved my logical thinking and confidence.", tone: "blue" },
  { name: "Ishant Sharma", result: "Internship", program: "Practical Training Completed", quote: "I strengthened my skills, gained practical experience and learned from talented mentors.", tone: "orange" },
];

const programCards = [
  { icon: Code2, number: "01", title: "Data Structures & Algorithms", text: "Build interview-ready problem-solving skills through patterns, dry runs and daily coding practice.", color: "bg-blue-700" },
  { icon: Trophy, number: "02", title: "Competitive Programming", text: "Improve speed, logic and implementation with contests, editorials and mentor-led reviews.", color: "bg-orange-500" },
  { icon: Layers3, number: "03", title: "Full Stack Development", text: "Create portfolio-ready applications using modern frontend, backend, database and deployment tools.", color: "bg-violet-600" },
  { icon: Rocket, number: "04", title: "AI & Machine Learning", text: "Learn Python, data analysis and practical model-building through approachable hands-on projects.", color: "bg-emerald-600" },
];

const heroPhotos = [
  { src: "/home-community.jpg", alt: "Coding Gurukul mentors and students together after a campus learning event", position: "object-center" },
  { src: "/home-classroom.jpg", alt: "A mentor guiding Coding Gurukul students during a live computer lab", position: "object-center" },
  { src: "/home-achievement.jpg", alt: "Coding Gurukul representatives receiving an award in a packed auditorium", position: "object-center" },
];

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeHeroPhoto, setActiveHeroPhoto] = useState(0);
  const cartItems = useCourseCart((state) => state.items);
  const addCourse = useCourseCart((state) => state.addCourse);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroPhoto((current) => (current + 1) % heroPhotos.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  function addToCart(course: Course) {
    const added = addCourse(course);
    toast({
      title: added ? "Added to cart" : "Already in cart",
      description: `${course.title} ${added ? "has been added." : "is already selected."}`,
    });
  }

  function buyCourse(_course: Course) {
    window.open(PURCHASE_FORM_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="overflow-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} formUrl={CONTACT_FORM_URL} />

      <aside className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(120deg,transparent_20%,white_20%,white_22%,transparent_22%,transparent_72%,white_72%,white_74%,transparent_74%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 text-center sm:flex-row sm:text-left md:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/20"><Clock className="h-5 w-5" /></div>
            <div><p className="text-xs font-black uppercase tracking-[.18em] text-orange-100">Free demo session</p><p className="mt-0.5 text-lg font-black">Sunday · 10:00 AM to 11:00 AM</p></div>
          </div>
          <Button onClick={() => setContactOpen(true)} className="shrink-0 rounded-xl bg-white font-bold text-orange-600 shadow-md hover:bg-orange-50">Register for demo <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </aside>

      <section className="relative isolate min-h-[calc(100svh-132px)] overflow-hidden bg-slate-950 text-white">
        {heroPhotos.map((photo, index) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${photo.position} ${index === activeHeroPhoto ? "opacity-100" : "opacity-0"}`}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/10" />
        <div className="relative mx-auto flex min-h-[calc(100svh-132px)] max-w-7xl items-end px-4 pb-12 pt-24 md:px-6 md:pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-orange-400" /> Real classrooms. Real practice.
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-[-0.04em] drop-shadow-lg sm:text-5xl md:text-6xl">
              Where students learn by <span className="text-orange-400">doing.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base font-medium leading-7 text-slate-100 drop-shadow md:text-lg">
              Live mentorship, focused coding practice and a community that grows together.
            </p>
            <a href="#main-intro" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-orange-300">
              Discover Coding Gurukul <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-7 flex items-center gap-2" aria-label="Homepage photo gallery">
              {heroPhotos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActiveHeroPhoto(index)}
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={index === activeHeroPhoto}
                  className={`h-1.5 rounded-full transition-all ${index === activeHeroPhoto ? "w-9 bg-orange-400" : "w-5 bg-white/50 hover:bg-white"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="main-intro" className="scroll-mt-20 border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1.12fr_.88fr] lg:gap-20">
          <div className="lg:pr-8">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-blue-700 dark:text-blue-400">
              <span className="h-px w-9 bg-orange-500" /> Coding Gurukul
            </p>
            <h2 className="mt-7 max-w-3xl text-4xl font-black leading-[1.06] tracking-[-0.04em] text-slate-950 sm:text-5xl md:text-6xl dark:text-white">
              Learn the craft.<br />Earn the confidence.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Structured DSA, competitive programming and development programs taught live by mentors who stay involved—from your first dry run to the interview room.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" asChild className="h-14 rounded-lg bg-blue-700 px-6 text-base font-bold text-white hover:bg-blue-800">
                <Link href="/courses">View all programs <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <button onClick={() => setContactOpen(true)} className="inline-flex h-14 items-center justify-center gap-2 px-2 text-sm font-bold text-slate-700 transition hover:text-blue-700 dark:text-slate-200 dark:hover:text-blue-400">
                Speak with a mentor <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-16 border-t border-slate-300 lg:mt-0 dark:border-white/20">
            <p className="py-5 text-xs font-bold uppercase tracking-[.2em] text-slate-500 dark:text-slate-400">What the work looks like</p>
            {[
              ["01", "Understand", "Live explanations and visual dry runs"],
              ["02", "Apply", "Curated problems and timed contests"],
              ["03", "Improve", "Code reviews, feedback and mock interviews"],
            ].map(([number, title, text]) => (
              <div key={number} className="grid grid-cols-[3rem_1fr] gap-3 border-t border-slate-200 py-6 dark:border-white/10 sm:grid-cols-[3rem_8rem_1fr]">
                <span className="font-mono text-xs text-orange-600 dark:text-orange-400">{number}</span>
                <h3 className="text-base font-bold text-slate-950 dark:text-white">{title}</h3>
                <p className="col-start-2 text-sm leading-6 text-slate-500 dark:text-slate-400 sm:col-start-auto">{text}</p>
              </div>
            ))}
            <div className="border-t border-slate-300 py-6 dark:border-white/20">
              <p className="max-w-md text-xl font-semibold leading-8 text-slate-800 dark:text-slate-200">The goal is simple: leave every session better at solving problems on your own.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-8 md:grid-cols-4 md:px-6">
          {[["60K+", "Student reach"], ["50+", "Workshops"], ["150+", "Practice problems"], ["12 LPA", "Success story"]].map(([value, label]) => <div key={label} className="text-center md:border-r md:last:border-0 dark:border-slate-700"><p className="text-3xl font-black text-blue-700">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}
        </div>
      </section>

      <Section id="programs" eyebrow="Explore our programs" title="Skills that move your career forward" description="Focused learning paths designed around the skills companies test and the confidence students need.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {programCards.map(({ icon: Icon, ...program }) => <article key={program.title} className="group rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><div className={`grid h-12 w-12 place-items-center rounded-2xl text-white ${program.color}`}><Icon className="h-6 w-6" /></div><span className="text-sm font-black text-slate-300 dark:text-slate-700">{program.number}</span></div><h3 className="mt-7 text-xl font-black">{program.title}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{program.text}</p><Link href="/courses" className="mt-6 inline-flex items-center text-sm font-bold text-blue-700">Learn more <ChevronRight className="h-4 w-4" /></Link></article>)}
        </div>
      </Section>

      <section className="bg-slate-950 py-20 text-white"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-6 lg:grid-cols-[1.1fr_.9fr]"><div><Eyebrow>About Coding Gurukul</Eyebrow><h2 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-5xl">More than classes—a community built around progress.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">See the people, classrooms and purpose behind our mentor-led learning experience.</p><Button asChild className="mt-7 rounded-xl bg-blue-700 font-bold text-white hover:bg-blue-600"><Link href="/about">Discover our story <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div><img src="/about-community.jpg" alt="Coding Gurukul community" className="aspect-[16/10] w-full rounded-3xl object-cover shadow-2xl" /></div></section>

      <Section eyebrow="How learning works" title="A simple system built for progress" description="No random tutorials or disconnected practice. Every stage prepares you for the next.">
        <div className="relative grid gap-5 md:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-blue-200 md:block dark:bg-slate-700" />
          {[[BookOpen, "01", "Learn", "Understand concepts with visual dry runs and live examples."], [Code2, "02", "Practise", "Solve curated questions that reinforce each pattern."], [Headphones, "03", "Get feedback", "Clear doubts, review code and learn from mistakes."], [Award, "04", "Perform", "Test yourself through contests, mocks and interviews."]].map(([Icon, step, title, text]) => { const C = Icon as typeof BookOpen; return <div key={String(step)} className="relative text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border-4 border-white bg-blue-700 text-white shadow-lg dark:border-slate-950"><C className="h-6 w-6" /></div><p className="mt-5 text-xs font-black tracking-widest text-orange-500">STEP {String(step)}</p><h3 className="mt-2 text-xl font-black">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{String(text)}</p></div>})}
        </div>
      </Section>

      <section className="bg-[#f6f9ff] py-24 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 md:px-6"><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><Eyebrow>Featured courses</Eyebrow><h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Choose your next milestone</h2><p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">Live training, dedicated practice and long-term access options for every stage.</p></div>{cartItems.length > 0 && <Badge className="w-fit bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-100">{cartItems.length} course{cartItems.length > 1 ? "s" : ""} in cart</Badge>}</div><div className="mt-9 flex flex-col gap-4 rounded-3xl bg-blue-700 p-6 text-white shadow-xl shadow-blue-700/15 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15"><CalendarDays className="h-6 w-6" /></div><div><p className="text-sm font-bold uppercase tracking-[.16em] text-blue-200">Admissions now open</p><p className="mt-1 text-xl font-black">All batches launch on 25th July</p></div></div><Button onClick={() => setContactOpen(true)} className="rounded-xl bg-white font-bold text-blue-700 hover:bg-orange-50">Get free counselling <ArrowRight className="ml-2 h-4 w-4" /></Button></div><div className="mt-8 grid gap-6 md:grid-cols-3">{courses.map(course => <CourseCard key={course.id} course={course} isAdded={cartItems.some(item => item.id === course.id)} onAddToCart={addToCart} onBuy={buyCourse} compact />)}</div></div>
      </section>

      <section id="student-gallery" className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div className="lg:sticky lg:top-28 lg:self-start"><Eyebrow>Student success gallery</Eyebrow><h2 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-5xl">Real learners.<br />Real momentum.</h2><p className="mt-5 max-w-md text-lg leading-8 text-slate-600 dark:text-slate-400">From first successful programs to top ranks and placement breakthroughs, these milestones show what focused learning can unlock.</p><div className="mt-8 rounded-3xl bg-orange-500 p-7 text-white"><p className="text-sm font-bold uppercase tracking-widest text-orange-100">Placement highlight</p><p className="mt-3 text-4xl font-black">3.5 → 12 LPA</p><p className="mt-3 leading-7 text-orange-50">A learner’s confidence grew through constant guidance, practical training and interview support.</p></div><Button asChild variant="outline" className="mt-6 rounded-xl"><a href="https://www.linkedin.com/company/codinggurukul/posts/?feedView=all" target="_blank" rel="noreferrer">See posts on LinkedIn <ExternalLink className="ml-2 h-4 w-4" /></a></Button></div><div className="grid gap-5 md:grid-cols-2">{stories.map(story => <StoryCard key={story.name} {...story} />)}</div></div></div>
      </section>

      <section className="bg-slate-950 py-20 text-white"><TeamSection /></section>

      <section id="academic-counselling" className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 py-24 text-white"><div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border-[70px] border-white/5" /><div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" /><div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-6 lg:grid-cols-[1fr_.72fr]"><div><div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-100"><MessageCircle className="h-4 w-4 text-orange-300" /> Free Academic Counselling</div><h2 className="mt-6 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">Not sure which program is right for you?</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">Speak one-to-one with our academic counsellor. We’ll understand your current skills, career goal and available study time, then recommend the most suitable learning path—without any pressure.</p><div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-blue-100">{["Personal skill assessment", "Course and roadmap guidance", "Placement preparation advice"].map(item => <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-orange-300" />{item}</span>)}</div></div><Card className="border-white/15 bg-white p-2 shadow-2xl"><CardContent className="rounded-2xl bg-white p-6 text-slate-950 md:p-8"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-600"><GraduationCap className="h-7 w-7" /></div><h3 className="mt-5 text-2xl font-black">Book your counselling session</h3><p className="mt-2 leading-7 text-slate-600">Connect with us for batch details, course selection, fees or placement preparation support.</p><Button size="lg" onClick={() => setContactOpen(true)} className="mt-6 h-13 w-full rounded-xl bg-blue-700 font-bold text-white hover:bg-blue-800">Book free counselling <ArrowRight className="ml-2 h-5 w-5" /></Button><div className="mt-5 grid gap-3 sm:grid-cols-2"><a href={`tel:${CONTACT_PHONE}`} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold hover:bg-slate-50"><Phone className="h-4 w-4 text-blue-700" /> Call us</a><a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold hover:bg-slate-50"><Mail className="h-4 w-4 text-blue-700" /> Email us</a></div></CardContent></Card></div></section>

      <footer className="bg-slate-950 text-slate-300"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.3fr_.7fr_.8fr] md:px-6"><div><div className="flex items-center gap-3"><img src="/logo.png" className="h-11 w-11 rounded-xl bg-white p-1" alt="Coding Gurukul" /><span className="text-xl font-black text-white">Coding Gurukul</span></div><p className="mt-5 max-w-sm leading-7 text-slate-400">Practical, mentor-led technical education for ambitious students and future developers.</p><div className="mt-6 flex gap-3"><Social href="https://www.linkedin.com/company/codinggurukul/posts/?feedView=all"><FaLinkedinIn /></Social><Social href="https://www.instagram.com/codinggurukulofficial/"><FaInstagram /></Social></div></div><div><h3 className="font-bold text-white">Explore</h3><div className="mt-5 space-y-3 text-sm"><FooterLink href="/courses">Courses</FooterLink><FooterLink href="/roadmap">Roadmap</FooterLink><FooterLink href="/dsa">DSA Sheet</FooterLink><FooterLink href="/contests">Contests</FooterLink></div></div><div><h3 className="font-bold text-white">Contact</h3><div className="mt-5 space-y-4 text-sm"><a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 hover:text-white"><Mail className="h-4 w-4 text-orange-400" />{CONTACT_EMAIL}</a><a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 text-orange-400" />{CONTACT_PHONE}</a><p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-orange-400" />India</p></div></div></div><div className="border-t border-white/10 px-4 py-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} Coding Gurukul. Built for learners who keep going.</div></footer>
    </div>
  );
}

function Section({ id, eyebrow, title, description, children }: { id?: string; eyebrow: string; title: string; description: string; children: React.ReactNode }) { return <section id={id} className="py-24"><div className="mx-auto max-w-7xl px-4 md:px-6"><div className="mb-12 max-w-3xl"><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">{title}</h2><p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">{description}</p></div>{children}</div></section> }
function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[.18em] text-blue-700"><span className="h-2 w-2 rounded-full bg-orange-500" />{children}</p> }
function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) { return <div className="rounded-2xl bg-white/10 p-4">{React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "h-5 w-5 text-orange-300" })}<p className="mt-3 font-black">{value}</p><p className="mt-1 text-xs text-blue-200">{label}</p></div> }
function StoryCard({ name, result, program, quote, tone }: (typeof stories)[number]) { const colors: Record<string, string> = { blue: "bg-blue-100 text-blue-700 dark:bg-blue-950", orange: "bg-orange-100 text-orange-700 dark:bg-orange-950", violet: "bg-violet-100 text-violet-700 dark:bg-violet-950", emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950" }; return <article className="flex min-h-[290px] flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"><div className="flex items-start justify-between"><span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${colors[tone]}`}>{result}</span><FaLinkedinIn className="text-blue-600" /></div><Quote className="mt-7 h-7 w-7 text-orange-400" /><p className="mt-4 flex-1 leading-7 text-slate-600 dark:text-slate-300">“{quote}”</p><div className="mt-6 border-t pt-5 dark:border-slate-700"><h3 className="font-black">{name}</h3><p className="mt-1 text-sm text-slate-500">{program}</p></div></article> }
function Social({ href, children }: { href: string; children: React.ReactNode }) { return <a href={href} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-blue-700">{children}</a> }
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) { return <p><Link href={href} className="transition hover:text-white">{children}</Link></p> }
