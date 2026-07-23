import React, { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  requireEnrolled?: boolean; // New prop to lock premium pages
  returnTo?: string;
}

export default function ProtectedRoute({ component: Component, requireEnrolled = false, returnTo }: ProtectedRouteProps) {
  const isLoggedIn = useAuth((s) => s.isLoggedIn);
  const userRole = useAuth((s) => s.userRole); // Assuming you store role in your auth hook
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      setLocation(returnTo ? `/login?redirect=${encodeURIComponent(returnTo)}` : "/login");
      return;
    }

    // If page is premium and user is only 'registered', block them
    if (requireEnrolled && userRole !== 'enrolled') {
      setLocation("/"); // Kick them back to home
    }
  }, [isLoggedIn, userRole, requireEnrolled, returnTo, setLocation]);

  if (!isLoggedIn) return null;
  if (requireEnrolled && userRole !== 'enrolled') return null;

  return <Component />;
}
