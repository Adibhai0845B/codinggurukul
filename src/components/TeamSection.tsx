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
  { id: 4, name: "Shiv Shanker Gupt", role: "CMO", avatar: "shivam.png" },
  { id: 5, name: "Arunima", role: "HR Manager", avatar: "anu.png" },
  { id: 6, name: "Apoorva", role: "Company Advisor", avatar: "apoorva.png" },
  { id: 7, name: "Sarika", role: "CSO", avatar: "sarika.png" },
  { id: 8, name: "Shaan", role: "AI Mentor", avatar: "shaan.png" },
  { id: 9, name: "Tejas", role: "Technical Mentor", avatar: "tejas.png" },
  { id: 10, name: "Abhishek", role: "DSA Mentor + SDE", avatar: "abhishek.png" },
  { id: 11, name: "Shivam", role: "DSA & CP Mentor", avatar: "shivamt.png" },
  { id: 12, name: "Piyush", role: "DSA Mentor", avatar: "piyush.png" },
  { id: 13, name: "Harsh Lakhra", role: "DSA Mentor", avatar: "harsh-lakhra.png" },
  { id: 14, name: "Aryan Tiwari", role: "DSA Mentor" },
];

export default function TeamSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-bold text-orange-500 uppercase tracking-wider">Our Team</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">Meet the People Behind Coding Gurukul</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">A passionate team of mentors, coaches and creators building a strong learning experience.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((m) => (
          <Card key={m.id} className="group overflow-hidden rounded-3xl border-white/10 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-950/30">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-5 h-28 w-28 overflow-hidden rounded-3xl border-2 border-white/10 bg-gradient-to-br from-blue-600 to-violet-700 shadow-lg transition group-hover:scale-105">
                {m.avatar ? <img src={`/team/${m.avatar}`} alt={m.name} className="h-full w-full object-cover" /> : <div className="grid h-full w-full place-items-center text-3xl font-black text-white">{m.name.split(" ").map(part => part[0]).join("")}</div>}
              </div>
              <h3 className="font-bold text-lg">{m.name}</h3>
              <p className="mt-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">{m.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
