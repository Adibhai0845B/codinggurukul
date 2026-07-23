import { useMemo } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Radio,
  ShieldCheck,
  UserRound,
  Video,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { type LiveClass, useLiveClasses } from "@/hooks/useLiveClasses";

function getClassState(session: LiveClass, now: Date) {
  const start = new Date(session.startTime);
  const end = new Date(start.getTime() + session.durationMinutes * 60_000);
  const joinOpens = new Date(start.getTime() - 15 * 60_000);

  if (now > end) return "completed";
  if (now >= joinOpens) return "live";
  return "upcoming";
}

function formatClassDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
}

function formatClassTime(date: string, durationMinutes: number) {
  const start = new Date(date);
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const formatter = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  return `${formatter.format(start)} – ${formatter.format(end)} IST`;
}

export default function LiveClasses() {
  const username = useAuth((state) => state.username);
  const classes = useLiveClasses((state) => state.liveClasses);
  const now = useMemo(() => new Date(), []);
  const sortedClasses = [...classes].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  const upcomingClasses = sortedClasses.filter((session) => getClassState(session, now) !== "completed");
  const completedClasses = sortedClasses.filter((session) => getClassState(session, now) === "completed");

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-slate-950 px-6 py-9 text-white shadow-2xl shadow-blue-950/20 md:px-10 md:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.28),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(249,115,22,0.18),transparent_32%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Badge className="border-blue-400/30 bg-blue-400/10 text-blue-200 hover:bg-blue-400/10">
              <Radio className="mr-1.5 h-3.5 w-3.5" /> Live learning
            </Badge>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">Your live classroom</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Join instructor-led classes, code along in real time and ask questions directly on Google Meet.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Signed in as</p>
            <p className="mt-1 flex items-center gap-2 font-bold"><UserRound className="h-4 w-4 text-blue-300" />{username}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-400">Schedule</p>
            <h2 className="mt-1 text-2xl font-black md:text-3xl">Upcoming classes</h2>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">Published Meet links are ready to join</p>
        </div>

        {upcomingClasses.length ? (
          <div className="grid gap-5">
            {upcomingClasses.map((session) => (
              <ClassCard key={session.id} session={session} now={now} />
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center py-12 text-center">
              <CalendarDays className="h-10 w-10 text-slate-500" />
              <h3 className="mt-4 text-lg font-bold">No upcoming class scheduled</h3>
              <p className="mt-2 text-sm text-muted-foreground">The next class will appear here once the schedule is published.</p>
            </CardContent>
          </Card>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard icon={Clock3} title="Join on time" copy="Use the Join Google Meet button before the scheduled start." />
        <InfoCard icon={Video} title="Check your setup" copy="Allow camera and microphone access before entering Google Meet." />
        <InfoCard icon={ShieldCheck} title="Students only" copy="You must sign in before opening the live classroom." />
      </section>

      {completedClasses.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-black">Previous classes</h2>
          <div className="grid gap-3">
            {completedClasses.map((session) => (
              <div key={session.id} className="flex flex-col gap-3 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /><p className="font-bold">{session.title}</p></div>
                  <p className="mt-1 text-sm text-muted-foreground">{formatClassDate(session.startTime)}</p>
                </div>
                <Badge variant="secondary" className="w-fit">Completed</Badge>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ClassCard({ session, now }: { session: LiveClass; now: Date }) {
  const state = getClassState(session, now);
  const isJoinable = state !== "completed";
  const hasMeetLink = session.meetUrl.startsWith("https://meet.google.com/");

  return (
    <Card className="overflow-hidden rounded-3xl border-slate-800 bg-slate-950 text-white shadow-xl">
      <CardContent className="grid gap-0 p-0 lg:grid-cols-[1fr_270px]">
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={isJoinable ? "bg-red-500 text-white" : "bg-blue-500/15 text-blue-300 hover:bg-blue-500/15"}>
              {isJoinable ? <><Radio className="mr-1.5 h-3.5 w-3.5" />Live now</> : "Upcoming"}
            </Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-300">Google Meet</Badge>
          </div>
          <h3 className="mt-5 text-2xl font-black md:text-3xl">{session.title}</h3>
          <p className="mt-2 text-slate-400">{session.topic}</p>
          <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-blue-400" />{formatClassDate(session.startTime)}</span>
            <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-blue-400" />{formatClassTime(session.startTime, session.durationMinutes)}</span>
            <span className="flex items-center gap-2"><UserRound className="h-4 w-4 text-blue-400" />{session.instructor}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center border-t border-slate-800 bg-white/[0.035] p-6 lg:border-l lg:border-t-0">
          <Button
            asChild={isJoinable && hasMeetLink}
            disabled={!isJoinable || !hasMeetLink}
            className="h-12 rounded-xl bg-blue-600 font-bold hover:bg-blue-500"
          >
            {isJoinable && hasMeetLink ? (
              <a href={session.meetUrl} target="_blank" rel="noopener noreferrer">
                <Video className="mr-2 h-4 w-4" />Join Google Meet<ExternalLink className="ml-2 h-3.5 w-3.5" />
              </a>
            ) : (
              <span><Video className="mr-2 inline h-4 w-4" />Meet link unavailable</span>
            )}
          </Button>
          <p className="mt-3 text-center text-xs leading-5 text-slate-500">
            Use the same name as your Coding Gurukul account for attendance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoCard({ icon: Icon, title, copy }: { icon: typeof Clock3; title: string; copy: string }) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400"><Icon className="h-5 w-5" /></span>
        <h3 className="mt-4 font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p>
      </CardContent>
    </Card>
  );
}
