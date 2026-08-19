import { FormEvent, useEffect, useState } from "react";
import { Building2, Mail, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/config";

interface B2BInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  program?: string;
}

export default function B2BInquiryModal({ isOpen, onClose, program }: B2BInquiryModalProps) {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function sendInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Campus partnership inquiry — ${institution}`;
    const body = [
      "Hello Coding Gurukul team,",
      "",
      "I would like to discuss a B2B campus partnership.",
      "",
      `Name: ${name}`,
      `Institution: ${institution}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Program: ${program || "To be discussed"}`,
      `Requirement: ${requirement || "To be discussed"}`,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4" role="dialog" aria-modal="true" aria-labelledby="b2b-inquiry-title">
      <button type="button" aria-label="Close partnership inquiry" className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative my-6 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#101824]">
        <div className="bg-[#0a2d66] px-6 py-6 text-white sm:px-8">
          <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-blue-100 transition hover:bg-white/10 hover:text-white" aria-label="Close"><X className="h-5 w-5" /></button>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-orange-300"><Building2 className="h-4 w-4" />Institutional partnership</div>
          <h2 id="b2b-inquiry-title" className="mt-3 pr-10 text-2xl font-black sm:text-3xl">Tell us about your campus requirement.</h2>
          <p className="mt-2 text-sm leading-6 text-blue-100">Share a few details and your email app will open with a ready-to-send inquiry.</p>
        </div>

        <form onSubmit={sendInquiry} className="space-y-5 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-bold">Your name<Input value={name} onChange={event => setName(event.target.value)} placeholder="Full name" required /></label>
            <label className="space-y-2 text-sm font-bold">Institution name<Input value={institution} onChange={event => setInstitution(event.target.value)} placeholder="College or university" required /></label>
            <label className="space-y-2 text-sm font-bold">Work email<Input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="name@institution.edu" required /></label>
            <label className="space-y-2 text-sm font-bold">Phone number<Input type="tel" value={phone} onChange={event => setPhone(event.target.value)} placeholder="Your contact number" required /></label>
          </div>
          <label className="block space-y-2 text-sm font-bold">What would you like to plan?
            <textarea value={requirement} onChange={event => setRequirement(event.target.value)} rows={4} placeholder="Cohort size, target skills, preferred dates or delivery format" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
          </label>
          <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
            <a href={`tel:${CONTACT_PHONE}`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 dark:text-blue-300"><Phone className="h-4 w-4" />Or call {CONTACT_PHONE}</a>
            <Button type="submit" className="h-11 bg-orange-500 px-6 font-bold text-white hover:bg-orange-600"><Mail className="mr-2 h-4 w-4" />Prepare partnership email</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
