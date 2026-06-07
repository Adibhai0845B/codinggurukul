import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Code2,
  GraduationCap,
  Layers,
  LineChart,
  Rocket,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProgress } from "@/hooks/useProgress";
import { dsaQuestions } from "@/data/dsaQuestions";
import { cpQuestions } from "@/data/cpQuestions";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  const { completedIds } = useProgress();

  const dsaCompleted = dsaQuestions.filter((q) =>
    completedIds.includes(q.id)
  ).length;

  const cpCompleted = cpQuestions.filter((q) =>
    completedIds.includes(q.id)
  ).length;

  const curriculum = [
    "Complexity & Problem Decomposition",
    "Arrays, Prefix Sum & Kadane",
    "Sorting & Binary Search",
    "Strings, Hashing & Sliding Window",
    "Two Pointers & Recursion",
    "Linked List, Stack & Queue",
    "Trees, BST & Graphs",
    "Mock Interviews & OA Simulation",
  ];

  const testimonials = [
    {
      name: "DSA Training Student",
      role: "Placement Preparation Batch",
      text: "Before joining, I was solving problems randomly. Coding Gurukul gave me a proper roadmap, daily practice discipline and confidence to explain my approach in interviews.",
    },
    {
      name: "Competitive Programming Learner",
      role: "Contest Preparation Batch",
      text: "The mentors focused on thinking patterns, not just solutions. Timed contests, editorials and debugging sessions helped me improve my speed and accuracy.",
    },
    {
      name: "Full Stack Project Student",
      role: "Project-Based Learning Track",
      text: "I learned how frontend, backend, APIs, database and deployment work together. The project sessions helped me build something useful for my resume.",
    },
    {
      name:"AI/ML Workshop Student",
      role:"Hands-on AI/ML Program",
      text:"The sessions were beginner-friendly and practical. We learned Python, data handling, model building and how AI projects are actually structured.",
    },
    {
      name: "Final Year Student",
      role: "Mock Interview Program",
      text: "Mock interviews helped me identify where I was weak. I improved my dry run explanation, complexity analysis and confidence while speaking.",
    },
    {
      name: "College Training Participant",
      role: "Placement Accelerator Program",
      text: "The best part was the structure: concept, live coding, practice, contest and review. It made placement preparation much more organized.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-slate-950 dark:via-background dark:to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-700 mb-6">
              <GraduationCap className="h-4 w-4" />
              Placement-Focused Tech Training Company
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white">
              Empowering Students with{" "}
              <span className="text-orange-500">Industry-Ready</span>{" "}
              <span className="text-blue-600">Tech Skills</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Coding Gurukul helps students become placement-ready through
              structured DSA, Competitive Programming, Full Stack, AI/ML,
              Data Science and Aptitude training.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-12 px-7 rounded-xl" asChild>
                <Link href="/dsa">
                  Start DSA Practice <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 rounded-xl"
                asChild
              >
                <Link href="/cp">Explore CP Sheet</Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat value="60K+" label="Student Reach" />
              <Stat value="50+" label="Workshops" />
              <Stat value="150+" label="Problems" />
              <Stat value="5+" label="Domains" />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border bg-white">
              <img
                src="//banner.png"
                alt="Coding Gurukul Banner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6 text-center">
          <TrustItem title="Academic Partnerships" desc="Stronger coding culture" />
          <TrustItem title="Industry-Aligned Curriculum" desc="Skills that matter" />
          <TrustItem title="Career-Focused Outcomes" desc="Future-ready learners" />
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <SectionHeader
          label="Our Programs"
          title="Training Domains Designed for Career Growth"
          desc="Practical, mentor-led programs that can be customized for different batches, timelines and learning goals."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgramCard
            icon={<Code2 />}
            title="DSA"
            desc="Arrays, strings, recursion, trees, graphs, DP and interview patterns with dry runs and coding practice."
          />
          <ProgramCard
            icon={<Trophy />}
            title="Competitive Programming"
            desc="Contest thinking, time complexity, speed, debugging and implementation accuracy."
          />
          <ProgramCard
            icon={<Layers />}
            title="Full Stack"
            desc="Frontend, backend, REST APIs, databases, authentication, Git and deployment."
          />
          <ProgramCard
            icon={<Rocket />}
            title="AI/ML"
            desc="Python, statistics, ML models, NLP, data analysis and project-based learning."
          />
        </div>
      </section>

      {/* STUDENT BENEFITS */}
      <section className="bg-muted/40 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            label="Student Benefits"
            title="What Students Get from Coding Gurukul"
            desc="A complete learning experience focused on confidence, consistency and career readiness."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Benefit
              title="Structured Learning Path"
              desc="No random learning. Students follow a clear roadmap from basics to advanced topics."
            />
            <Benefit
              title="Live Coding Practice"
              desc="Every important concept is taught through dry runs, code implementation and debugging."
            />
            <Benefit
              title="Interview Explanation Skills"
              desc="Students learn how to explain brute force, optimized approach, complexity and edge cases."
            />
            <Benefit
              title="Topic-Wise Practice Sheets"
              desc="Curated problems help students revise important patterns before tests and interviews."
            />
            <Benefit
              title="Mock Assessments"
              desc="Timed tests and coding contests simulate real online assessment pressure."
            />
            <Benefit
              title="Certificate & Internship Pathway"
              desc="Eligible students receive completion certificates and top performers get internship opportunity pathways."
            />
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-gradient-to-br from-blue-50 to-orange-50 dark:from-slate-900 dark:to-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-bold text-orange-500 uppercase tracking-wider text-sm">
              Why Coding Gurukul
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
              We don't just teach coding. We build placement confidence.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Our training model focuses on concepts, live coding, assignments,
              contests, mock interviews and measurable progress tracking.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <MiniPoint title="Mentor-Led Classes" />
              <MiniPoint title="Practice Sheets" />
              <MiniPoint title="Weekly Assessments" />
              <MiniPoint title="Performance Reports" />
            </div>
          </div>

          <Card className="rounded-3xl shadow-xl border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">
                Our Training Methodology
              </h3>

              <div className="space-y-5">
                <Process
                  step="01"
                  title="Assess"
                  desc="Understand student level, learning gaps and preparation stage."
                />
                <Process
                  step="02"
                  title="Teach"
                  desc="Deliver concepts with live coding, dry runs and practical explanation."
                />
                <Process
                  step="03"
                  title="Practice"
                  desc="Give curated problems, assignments and revision sheets."
                />
                <Process
                  step="04"
                  title="Evaluate"
                  desc="Run contests, mocks, interviews and performance reports."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <SectionHeader
          label="Curriculum Roadmap"
          title="Placement Accelerator Learning Path"
          desc="A structured roadmap from coding fundamentals to interview simulation."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {curriculum.map((item, index) => (
            <Card key={item} className="rounded-2xl hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="font-bold leading-snug">{item}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="bg-muted/40 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            label="Deliverables"
            title="Professional Deliverables for Training Programs"
            desc="A complete execution model with planning, reporting and measurable student improvement."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Deliverable
              title="Before Training"
              items={[
                "Batch-level diagnostic test",
                "Demo class for quality validation",
                "Customized curriculum planning",
                "Topic-wise timetable and mentor allocation",
              ]}
            />

            <Deliverable
              title="During Training"
              items={[
                "Live concept sessions",
                "Daily coding assignments",
                "Doubt support and revision guidance",
                "Weekly contests and assessments",
              ]}
            />

            <Deliverable
              title="After Training"
              items={[
                "Final coding assessment",
                "Mock interview evaluation",
                "Performance report",
                "Certificate of completion",
              ]}
            />

            <Deliverable
              title="Student Growth Areas"
              items={[
                "Problem-solving confidence",
                "Code quality and debugging speed",
                "Interview communication",
                "Placement test readiness",
              ]}
            />
          </div>
        </div>
      </section>

      {/* MENTOR NETWORK */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <SectionHeader
          label="Mentor Network"
          title="Learn from Mentors Who Have Solved, Competed and Taught at Scale"
          desc="Our mentor network includes DSA trainers, competitive programmers, AI/ML mentors, aptitude experts and project mentors."
        />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <MentorCard
            title="DSA & CP Mentors"
            points={[
              "Codeforces and CodeChef rated mentors",
              "Thousands of DSA problems solved",
              "Interview-focused teaching style",
              "Strong dry-run and explanation approach",
            ]}
          />

          <MentorCard
            title="AI/ML Mentors"
            points={[
              "Hands-on Python and ML training",
              "Practical project-based learning",
              "NLP and data analysis exposure",
              "Beginner-friendly explanation style",
            ]}
          />

          <MentorCard
            title="Aptitude & Interview Mentors"
            points={[
              "Quantitative aptitude training",
              "Reasoning and verbal ability practice",
              "Mock interview guidance",
              "Resume and communication improvement",
            ]}
          />
        </div>
      </section>

      {/* PLANS */}
      <section className="bg-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            label="Engagement Models"
            title="Flexible Plans for Different Learning Needs"
            desc="Choose short bootcamps, placement-focused tracks or advanced learning programs."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <PlanCard
              title="Foundation Track"
              duration="2–4 Weeks"
              desc="Best for beginners who need programming basics, DSA foundation and coding confidence."
            />
            <PlanCard
              title="Placement Track"
              duration="6–8 Weeks"
              desc="Best for students preparing for online assessments, interviews and campus hiring."
              highlighted
            />
            <PlanCard
              title="Advanced Track"
              duration="8–12 Weeks"
              desc="Best for strong batches needing CP, AI/ML, full stack projects and contests."
            />
          </div>
        </div>
      </section>

      {/* PROGRESS */}
      {(dsaCompleted > 0 || cpCompleted > 0) && (
        <section className="max-w-5xl mx-auto px-4 py-20 w-full">
          <Card className="rounded-3xl border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Your Progress</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">DSA Problems</span>
                    <span className="text-primary font-mono">
                      {dsaCompleted} / {dsaQuestions.length}
                    </span>
                  </div>
                  <ProgressBar
                    completed={dsaCompleted}
                    total={dsaQuestions.length}
                    className="h-3"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">CP Problems</span>
                    <span className="text-primary font-mono">
                      {cpCompleted} / {cpQuestions.length}
                    </span>
                  </div>
                  <ProgressBar
                    completed={cpCompleted}
                    total={cpQuestions.length}
                    className="h-3"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <SectionHeader
          label="Testimonials"
          title="Student Learning Experience"
          desc="Feedback from learners who improved through structured practice, mentor guidance and interview-focused training."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="rounded-3xl shadow-sm hover:shadow-xl transition"
            >
              <CardContent className="p-7">
                <Trophy className="h-8 w-8 text-orange-500 mb-5" />
                <p className="text-muted-foreground leading-relaxed">
                  “{t.text}”
                </p>
                <div className="mt-6">
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-r from-blue-700 to-orange-500 p-10 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold">
            Start Your Coding Journey with Coding Gurukul
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-white/90">
            Learn. Code. Build. Succeed. Practice with structured DSA and CP
            sheets designed for placement preparation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-7 rounded-xl"
              asChild
            >
              <Link href="/dsa">Open DSA Sheet</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-7 rounded-xl bg-transparent border-white text-white hover:bg-white hover:text-blue-700"
              asChild
            >
              <Link href="/cp">Open CP Sheet</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  label,
  title,
  desc,
}: {
  label: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <p className="text-sm font-bold text-orange-500 uppercase tracking-wider">
        {label}
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">{title}</h2>
      <p className="mt-4 text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/80 dark:bg-card border p-4 shadow-sm">
      <div className="text-2xl font-extrabold text-blue-600">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function TrustItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-slate-300 mt-1">{desc}</p>
    </div>
  );
}

function ProgramCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="rounded-3xl hover:shadow-xl transition border-slate-200">
      <CardContent className="p-7">
        <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </CardContent>
    </Card>
  );
}

function Benefit({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="rounded-3xl hover:shadow-lg transition">
      <CardContent className="p-7">
        <CheckCircle2 className="h-8 w-8 text-blue-600 mb-5" />
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </CardContent>
    </Card>
  );
}

function MiniPoint({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-card p-4 shadow-sm">
      <CheckCircle2 className="h-5 w-5 text-orange-500" />
      <span className="font-semibold">{title}</span>
    </div>
  );
}

function Process({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
        {step}
      </div>
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function Deliverable({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="p-7">
        <h3 className="text-xl font-bold mb-5">{title}</h3>
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function MentorCard({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <Card className="rounded-3xl hover:shadow-lg transition">
      <CardContent className="p-7">
        <Users className="h-8 w-8 text-blue-600 mb-5" />
        <h3 className="text-xl font-bold">{title}</h3>
        <ul className="mt-5 space-y-3">
          {points.map((point) => (
            <li
              key={point}
              className="flex gap-3 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function PlanCard({
  title,
  duration,
  desc,
  highlighted,
}: {
  title: string;
  duration: string;
  desc: string;
  highlighted?: boolean;
}) {
  return (
    <Card
      className={`rounded-3xl ${
        highlighted
          ? "bg-white text-slate-950 scale-105 shadow-2xl"
          : "bg-white/10 text-white border-white/10"
      }`}
    >
      <CardContent className="p-8">
        <p
          className={
            highlighted
              ? "text-orange-500 font-bold"
              : "text-orange-300 font-bold"
          }
        >
          {duration}
        </p>
        <h3 className="mt-3 text-2xl font-bold">{title}</h3>
        <p
          className={`mt-4 text-sm leading-relaxed ${
            highlighted ? "text-slate-600" : "text-slate-300"
          }`}
        >
          {desc}
        </p>
      </CardContent>
    </Card>
  );
}