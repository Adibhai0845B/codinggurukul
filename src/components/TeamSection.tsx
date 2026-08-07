import React from "react";
import { Card, CardContent } from "@/components/ui/card";
type Member = {
  id: number;
  name: string;
  role: string;
  avatar?: string;
};
const members: Member[] = [
  { id: 1, name: "Manisha Gupta", role: "Managing Director", avatar: "manisha.png" },
  { id: 2, name: "Shalika", role: "Founder", avatar: "Shalika.png" },
  { id: 3, name: "Aditya Krishna Gupta", role: "Advisor", avatar: "aditya.png" },
  { id: 4, name: "Shiv Shanker", role: "CMO", avatar: "shivam.png" },
  { id: 5, name: "Arunima", role: "HR Manager", avatar: "anu.png" },
  { id: 6, name: "Apoorva", role: "B2C Sales Head", avatar: "apoorva.png" },
  { id: 7, name: "Sarika", role: "CSO", avatar: "sarika.png" },
  { id: 8, name: "Shaan", role: "AI Mentor", avatar: "shaan.png" },
  { id: 9, name: "Tejas", role: "Technical Mentor", avatar: "tejas.png" },
  { id: 10, name: "Abhishek", role: "DSA Mentor + SDE", avatar: "abhishek.png" },
  { id: 11, name: "Shivam", role: "DSA & CP Mentor", avatar: "shivamt.png" },
  { id: 12, name: "Piyush", role: "DSA Mentor" },
  { id: 13, name: "Harsh Lakhra", role: "DSA Mentor", avatar: "harsh-lakhra.png" },
  { id: 14, name: "Aryan Tiwari", role: "DSA Mentor", avatar: "aryan-tiwari.png" },
];

export default function TeamSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[.18em] text-sky-300">The people behind the mission</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-.035em] md:text-5xl">Meet the Coding Gurukul team</h2>
        <p className="mt-4 text-lg leading-8 text-slate-400">Mentors, leaders and advisors working together to create a stronger learning experience.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map((m) => (
          <Card key={m.id} className="group h-full overflow-hidden rounded-3xl border-sky-200/10 bg-sky-300/[.05] text-white transition duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-sky-300/[.09] hover:shadow-2xl hover:shadow-black/20">
            <CardContent className="flex h-full flex-col items-center p-6 text-center">
              <div className="mb-5 h-28 w-28 overflow-hidden rounded-3xl border-2 border-white/10 bg-gradient-to-br from-blue-700 to-sky-500 shadow-lg transition group-hover:scale-105">
                {m.avatar ? <img src={`/team/${m.avatar}`} alt={m.name} className="h-full w-full object-cover" /> : <div className="grid h-full w-full place-items-center text-3xl font-black text-white">{m.name.split(" ").map(part => part[0]).join("")}</div>}
              </div>
              <h3 className="font-bold text-lg">{m.name}</h3>
              <p className="mt-2 rounded-full bg-sky-300/10 px-3 py-1 text-xs font-bold text-sky-300">{m.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
