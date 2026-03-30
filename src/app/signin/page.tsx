"use client";

import React, { useState } from "react";
import { SignIn } from "@clerk/nextjs";
import AdminSignInModal from "./components/AdminSignInModal";

export default function SignInPage() {
  const [showAdminModal, setShowAdminModal] = useState(false);

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px),
              repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)`,
          }}
        />
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500 mb-8">jmqafri.org</p>
          <h1
            className="text-white leading-[1.05] tracking-[-0.03em]"
            style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 300 }}
          >
            JM-Qafri
            <br />
            <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>Community Hub</em>
          </h1>
        </div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">Connect · Fund · Grow</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <p className="lg:hidden text-[10px] uppercase tracking-[0.28em] text-slate-400 mb-8">jmqafri.org</p>
          <SignIn
            routing="hash"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/register"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border border-slate-200 rounded-none w-full",
                headerTitle: "text-slate-900",
                headerSubtitle: "text-slate-500",
                socialButtonsBlockButton: "rounded-none border-slate-200 shadow-none",
                formButtonPrimary: "rounded-none bg-[#2c5aa0] hover:bg-[#1e3f73]",
                footerActionLink: "text-[#2c5aa0]",
              },
            }}
          />

          <div className="mt-6 border border-slate-200 bg-slate-50 px-5 py-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">Restricted Access</p>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Superadmin users should use the dedicated admin sign-in path so the extra server-side checks run before Clerk completes the session.
            </p>
            <button
              type="button"
              onClick={() => setShowAdminModal(true)}
              className="inline-flex items-center justify-center border border-slate-900 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
            >
              Admin Sign In
            </button>
          </div>
        </div>
      </div>

      {showAdminModal && <AdminSignInModal onClose={() => setShowAdminModal(false)} />}
    </div>
  );
}
