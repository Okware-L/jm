"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "../../lib/auth";
import { roleToRoute } from "../../lib/Ensureuserdoc";

export default function DashboardPage() {
  const { state, profile } = useRequireAuth();
  const router = useRouter();

  useEffect(() => {
    if (state === "loading" || !profile) return;
    router.replace(roleToRoute(profile.role ?? undefined, "/signin"));
  }, [profile, router, state]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-px bg-[#2c5aa0] mx-auto animate-pulse" />
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Opening your workspace</p>
      </div>
    </div>
  );
}
