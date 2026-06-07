import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";

export default function Login() {
  const [location, setLocation] = useLocation();
  const login = useAuth((s) => s.login);
  const logout = useAuth((s) => s.logout);
  const isLoggedIn = useAuth((s) => s.isLoggedIn);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = login(username.trim(), password);
    if (ok) {
      setLocation("/dsa");
    } else {
      setError("Invalid credentials. Use the provided  credentials to you.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-card rounded-xl border border-border">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {isLoggedIn ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">You are already logged in.</p>
          <Button onClick={() => { logout(); setLocation('/'); }}>Logout</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex items-center justify-between">
            <Button type="submit">Login</Button>
          </div>
        </form>
      )}
    </div>
  );
}
