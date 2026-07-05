import { Redirect } from "wouter";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminProtectedRoute({ component: Component }: { component: React.ComponentType<any> }) {
  // Check if admin is logged in (using your specific admin hook)
  const isAdminLoggedIn = useAdminAuth((s) => !!s.adminToken); 

  if (!isAdminLoggedIn) {
    // If not logged in as admin, redirect to admin login
    return <Redirect to="/admin/login" />;
  }

  return <Component />;
}