import type { ComponentType } from "react";
import { Redirect } from "wouter";
import { useContestAdminAuth } from "@/hooks/useContestAdminAuth";

export default function ContestAdminRoute({ component: Component }: { component: ComponentType }) {
  const isContestAdmin = useContestAdminAuth((state) => state.isContestAdmin);

  return isContestAdmin ? <Component /> : <Redirect to="/make-contest/login" />;
}
