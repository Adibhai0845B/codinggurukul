import { useState } from "react";
import { useLocation } from "wouter";
import { LockKeyhole, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useContestAdminAuth } from "@/hooks/useContestAdminAuth";

export default function ContestAdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useContestAdminAuth((state) => state.login);
  const [, setLocation] = useLocation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (login(username.trim(), password)) {
      setLocation("/make-contest");
    } else {
      setError("Invalid contest creator ID or password.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[65vh] max-w-md items-center">
      <Card className="w-full border-blue-500/20 bg-slate-950/80 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10"><Trophy className="h-6 w-6 text-amber-400" /></div>
          <CardTitle className="text-2xl">Contest Creator Login</CardTitle>
          <p className="text-sm text-muted-foreground">Authorized contest organizers only.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-2 text-sm font-medium">Creator ID
              <Input required autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter creator ID" />
            </label>
            <label className="block space-y-2 text-sm font-medium">Password
              <Input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
            </label>
            {error && <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-500"><LockKeyhole className="mr-2 h-4 w-4" />Sign in to create contests</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
