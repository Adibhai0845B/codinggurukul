import { useState } from "react";
import { CalendarPlus, Radio, Trash2, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLiveClasses } from "@/hooks/useLiveClasses";
import { toast } from "@/hooks/use-toast";

export default function LiveClassManager() {
  const { liveClasses, addLiveClass, deleteLiveClass } = useLiveClasses();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [instructor, setInstructor] = useState("Coding Gurukul Team");
  const [startTime, setStartTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [meetUrl, setMeetUrl] = useState("");

  const resetForm = () => {
    setTitle("");
    setTopic("");
    setInstructor("Coding Gurukul Team");
    setStartTime("");
    setDurationMinutes(90);
    setMeetUrl("");
    setShowForm(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedUrl = meetUrl.trim();
    if (!/^https:\/\/meet\.google\.com\/[a-z-]+(?:[/?].*)?$/i.test(normalizedUrl)) {
      toast({ title: "Invalid Google Meet link", description: "Enter a link beginning with https://meet.google.com/", variant: "destructive" });
      return;
    }

    addLiveClass({ title: title.trim(), topic: topic.trim(), instructor: instructor.trim(), startTime, durationMinutes, meetUrl: normalizedUrl });
    toast({ title: "Live class published", description: "Logged-in students can now see it in Live Classes." });
    resetForm();
  };

  return (
    <Card className="border-blue-500/20 bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2"><Radio className="h-5 w-5 text-red-400" /> Live Class Management</CardTitle>
          <p className="mt-1 text-sm text-zinc-400">Publish a Google Meet class for logged-in students.</p>
        </div>
        <Button onClick={() => showForm ? resetForm() : setShowForm(true)} className="bg-blue-600 text-white hover:bg-blue-500">
          <CalendarPlus className="mr-2 h-4 w-4" />{showForm ? "Cancel" : "Add Live Class"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-5">
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-blue-500/30 bg-zinc-950/50 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-zinc-300">Class title *<Input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="DSA Live Class" className="mt-2 bg-zinc-900" /></label>
              <label className="space-y-2 text-sm text-zinc-300">Instructor *<Input required value={instructor} onChange={(event) => setInstructor(event.target.value)} className="mt-2 bg-zinc-900" /></label>
              <label className="space-y-2 text-sm text-zinc-300">Start date and time *<Input required type="datetime-local" value={startTime} onChange={(event) => setStartTime(event.target.value)} className="mt-2 bg-zinc-900" /></label>
              <label className="space-y-2 text-sm text-zinc-300">Duration (minutes) *<Input required type="number" min={10} max={480} value={durationMinutes} onChange={(event) => setDurationMinutes(Number(event.target.value))} className="mt-2 bg-zinc-900" /></label>
            </div>
            <label className="block space-y-2 text-sm text-zinc-300">Topic *<Textarea required value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="What students will learn in this class" className="mt-2 bg-zinc-900" /></label>
            <label className="block space-y-2 text-sm text-zinc-300">Google Meet link *<Input required type="url" value={meetUrl} onChange={(event) => setMeetUrl(event.target.value)} placeholder="https://meet.google.com/abc-defg-hij" className="mt-2 bg-zinc-900" /></label>
            <div className="flex justify-end"><Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-500"><Video className="mr-2 h-4 w-4" />Publish Live Class</Button></div>
          </form>
        )}

        {liveClasses.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-700 p-6 text-center text-sm text-zinc-500">No live classes published yet.</p>
        ) : (
          <div className="space-y-3">{[...liveClasses].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()).map((session) => (
            <div key={session.id} className="flex flex-col gap-3 rounded-lg border border-zinc-800 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="font-semibold text-white">{session.title}</p><p className="mt-1 text-xs text-zinc-400">{new Date(session.startTime).toLocaleString("en-IN")} · {session.durationMinutes} min · {session.instructor}</p></div>
              <Button variant="ghost" onClick={() => { if (window.confirm("Delete this live class?")) deleteLiveClass(session.id); }} className="w-fit text-red-400"><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
            </div>
          ))}</div>
        )}
      </CardContent>
    </Card>
  );
}
