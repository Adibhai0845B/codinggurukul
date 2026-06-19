import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  // 1. Define the state variables that TypeScript couldn't find
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const authResponse = await fetch("https://coding-gurukul-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }) 
      });

      const data = await authResponse.json();

      if (!authResponse.ok) {
        // Throw the specific message from the server
        throw new Error(data.message || "Invalid credentials");
      }

      // Success path...
      useAuth.getState().login(data.username, data.token);
      // ... rest of your success logic
      await useProgress.getState().fetchProgress();// fetch the user progress (Maybe change karunga in future)
      setLocation("/");
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message, // This now shows "Username not found" or "Incorrect password"
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8 border rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button type="submit" className="p-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;