import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Importing the Loader2 icon from lucide-react for the loading spinner
import { Loader2 } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const res = await fetch("https://coding-gurukul-backend.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password })
    });
    
    // Parse the data to see the server's message
    const data = await res.json();
    
    // If not okay, throw the message we got from the server!
    if (!res.ok) throw new Error(data.message || "Registration failed");
    
    toast({ title: "Success!", description: "Account created. Please login." });
    setLocation("/login");
    } catch (error: any) {
        // This will now show "Email or Username already taken" instead of "Registration failed"
        toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    finally {
      setIsSubmitting(false); // turning off loadingg
    }
    };
    // Changes to add --->
    // ek loading screen
    // name of cllg too
    // name of the candidate (COMPLETED  )
    // a confirmation page after registration along with checking if gmail given is correctt (COMPLETED  )
    // phir email conform of new register on CG mail  (COMPLETED  )
    // Removing users which have exceeded the premiuim limit  

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 p-8 border rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <Input type="email" placeholder="Gmail" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </div>
  );
}