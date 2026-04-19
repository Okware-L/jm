"use client";

import { Suspense } from "react";
import AdminShell from "./components/AdminShell";
import { useRequireRole } from "@/lib/auth";
import type { UserProfile } from "@/lib/auth";

export default function AdminPage() {
  const { state, profile } = useRequireRole(["superadmin"]);

  if (state === "loading" || !profile) {
    return <LoadingScreen label="Authenticating superadmin session" />;
  }

  return (
    <Suspense fallback={<LoadingScreen label="Opening admin console" />}>
      <AdminShell profile={profile} />
    </Suspense>
  );
}

function LoadingScreen({ label }: { label: string }) {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Animated mark */}
        <div className="relative w-10 h-10 mx-auto">
          <div className="absolute inset-0 border border-[#2c5aa0]/30 animate-ping" />
          <div className="absolute inset-2 bg-[#2c5aa0]/20 border border-[#2c5aa0]/50" />
        </div>
        <div className="space-y-1.5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{label}</p>
          <p
            className="text-2xl font-light text-slate-300"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            JM-Qafri
          </p>
        </div>
      </div>
    </div>
  );
}