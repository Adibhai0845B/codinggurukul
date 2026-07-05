import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://coding-gurukul-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password })
      });
      
      if (!res.ok) throw new Error("Registration failed");
      
      toast({ title: "Success!", description: "Account created. Please login." });
      setLocation("/login");
    } catch (error) {
      toast({ title: "Error", description: "Registration failed", variant: "destructive" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 p-8 border rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <Input type="email" placeholder="Gmail" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}