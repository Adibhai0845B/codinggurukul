import React, { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

export default function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  const isLoggedIn = useAuth((s) => s.isLoggedIn);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoggedIn && location !== "/login") {
      setLocation("/login");
    }
  }, [isLoggedIn, location, setLocation]);

  if (!isLoggedIn) return null;

  return <Component />;
}
