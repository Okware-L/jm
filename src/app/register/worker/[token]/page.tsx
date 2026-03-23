"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyWorkerInvitePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/register/worker");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-px bg-[#2c5aa0] mx-auto animate-pulse" />
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
          Redirecting to worker registration
        </p>
      </div>
    </div>
  );
}
