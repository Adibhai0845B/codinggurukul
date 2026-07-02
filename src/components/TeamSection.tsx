import React from "react";
import { Card, CardContent } from "@/components/ui/card";
type Member = {
  id: number;
  name: string;
  role: string;
  avatar: string;
};
const members: Member[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: [
    "Manisha Gupta",
    "Shalika",
    "Aditya Krishna Gupta",
    "Shiv Shanker Gupt",
    "Arunima",
    "Apoorva",
    "Sarika",
    "Shaan",
    "Tejas",
    "Abhishek",
    "Pushkar",
    "Archit"
  ][i],
  role: [
    "Managing Director",
    "Founder",
    "Advisor",
    "CMO",
    "HR Manager",
    "Company Advisor",
    "CSO",
    "AI Mentor",
    "Technical Mentor",
    "SDE,DSA Mentor",
    "DSA,CP Trainer,Mentor",
    "DSA Mentor",
  ][i],
  // avatar will be resolved to a local file at runtime (public/team/<slug>.jpg)
  // fallback to the placeholder service if the local file isn't present
  avatar: [
    "manisha.png",
    "Shalika.png",
    "aditya.png",
    "shivam.png",
    "anu.png",
    "apoorva.png",
    "sarika.png",
    "shaan.png",
    "tejas.png",
    "abhishek.png",
    "pushkar.png",
    "archit.png",
  ][i],
}));

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
          <Card key={m.id} className="rounded-2xl hover:shadow-lg transition">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-gray-100 mb-4">
                  <img
                    src={`/team/${m.avatar}`}
                    alt={m.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.onerror = null;
                      // try images subfolder, then fallback to placeholder
                      if (!img.src.includes("/team/images/")) {
                        img.src = `/team/images/${m.avatar}`;
                      } else {
                        img.src = `https://i.pravatar.cc/200?img=${(m.id % 70) + 1}`;
                      }
                    }}
                  />
              </div>
              <h3 className="font-bold text-lg">{m.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
