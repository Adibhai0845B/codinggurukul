import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Braces,
  Eye,
  EyeOff,
  LockKeyhole,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import LoadingOverlay from "../components/LoadingOverlay";

const highlights = [
  { icon: Braces, title: "Practice with purpose", copy: "Curated DSA and CP tracks" },
  { icon: Trophy, title: "Track every win", copy: "Progress that stays with you" },
  { icon: BookOpenCheck, title: "Learn by doing", copy: "Roadmaps, sheets and contests" },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isLocalDemoUser = import.meta.env.DEV && (
        (username === "student" && password === "student123") ||
        (username === "student2_demo" && password === "password123")
      );

      if (isLocalDemoUser) {
        useAuth.getState().login(username, `local-dev-token-${username}`, "enrolled");
        setLocation("/");
        toast({
          title: "Local Login Successful",
          description: "Welcome to localhost testing!",
        });
        return;
      }

      const authResponse = await fetch("https://coding-gurukul-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await authResponse.json();

      if (!authResponse.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      useAuth.getState().login(data.username, data.token, data.role);
      await useProgress.getState().fetchProgress();
      setLocation("/");
      toast({ title: "Login Successful", description: "Welcome back!" });
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#070b16] px-4 py-8 text-white sm:px-6 lg:px-8">
      <LoadingOverlay isLoading={loading} />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]"
          animate={{ x: [0, 70, 0], y: [0, 35, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[110px]"
          animate={{ x: [0, -55, 0], y: [0, -45, 0], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto grid min-h-[min(760px,calc(100vh-8rem))] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 shadow-2xl shadow-blue-950/30 backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]"
      >
        <div className="relative hidden overflow-hidden border-r border-white/10 p-12 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-violet-600/10" />

          <motion.button
            type="button"
            onClick={() => setLocation("/")}
            whileHover={{ scale: 1.02 }}
            className="relative flex w-fit items-center gap-3 text-left"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-blue-400/30 bg-blue-500/15 shadow-lg shadow-blue-500/10">
              <Braces className="h-6 w-6 text-blue-300" />
            </span>
            <span>
              <span className="block text-lg font-bold tracking-tight">Coding Gurukul</span>
              <span className="block text-xs text-slate-400">Learn. Build. Get ahead.</span>
            </span>
          </motion.button>

          <div className="relative max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="mb-5 flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-200"
            >
              <Sparkles className="h-3.5 w-3.5" /> Your coding journey continues
            </motion.div>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.04em]">
              Turn consistency into your
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent"> superpower.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
              Sign in to pick up where you left off and keep moving toward your next breakthrough.
            </p>

            <div className="mt-9 grid gap-3">
              {highlights.map(({ icon: Icon, title, copy }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.42 + index * 0.12, duration: 0.45 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-blue-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-100">{title}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{copy}</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-slate-600">Built for students who refuse to stop growing.</p>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
            className="w-full max-w-md"
          >
            <motion.button
              type="button"
              onClick={() => setLocation("/")}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="mb-12 flex items-center gap-2 text-sm font-bold lg:hidden"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-500/15 text-blue-300"><Braces className="h-5 w-5" /></span>
              Coding Gurukul
            </motion.button>

            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
              <span className="text-sm font-semibold text-blue-400">WELCOME BACK</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Sign in to your account</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">Your roadmap, progress and practice streak are waiting.</p>
            </motion.div>

            <motion.form
              onSubmit={handleLogin}
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="mt-9 space-y-5"
            >
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Username</span>
                <span className="group relative block">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400" />
                  <input
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.045] pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 hover:border-white/20 focus:border-blue-500/60 focus:bg-blue-500/[0.04] focus:ring-4 focus:ring-blue-500/10"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
                <span className="group relative block">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.045] pl-12 pr-12 text-sm text-white outline-none transition-all placeholder:text-slate-600 hover:border-white/20 focus:border-blue-500/60 focus:bg-blue-500/[0.04] focus:ring-4 focus:ring-blue-500/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </span>
              </label>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:shadow-xl hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Sign in to continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.form>

          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default Login;
