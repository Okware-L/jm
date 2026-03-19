// app/register/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebseConfig";
import Link from "next/link";


const ROLES = [
  {
    key: "company",
    icon: "🏢",
    title: "Company",
    subtitle: "Register your business",
    description:
      "Access funding opportunities, build your team, manage clients and showcase your services in the industry directory.",
    bullets: ["Funding applications", "Team & worker management", "Industry directory listing"],
    href: "/register/company",
    locked: false,
  },
  {
    key: "client",
    icon: "👤",
    title: "Client",
    subtitle: "Access services",
    description:
      "Connect with verified companies and receive dedicated account management through the platform.",
    bullets: ["Dedicated account manager", "Secure document exchange", "Service tracking"],
    href: "/register/client",
    locked: false,
  },
  {
    key: "funding_recipient",
    icon: "💎",
    title: "Funding Recipient",
    subtitle: "Earn yield & fund growth",
    description:
      "Stake tokens in curated yield pools, earn daily rewards and track funding milestones on-chain.",
    bullets: ["Yield farming pools", "Milestone-based funding", "Immutable transaction history"],
    href: "/register/funding",
    locked: false,
  },
  {
    key: "worker",
    icon: "🔑",
    title: "Account Manager",
    subtitle: "Invite only",
    description:
      "Account Managers are invited directly by a company admin. If you have an invite link, click it to complete your registration.",
    bullets: ["Company-assigned role", "Client approvals & management", "Anonymous communication mode"],
    href: null,
    locked: true,
  },
];

export default function RegisterPage() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();


  // If already fully registered, redirect to dashboard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        if (snap.exists()) { router.replace("/dashboard"); return; }
      }
      setChecking(false);
    });
    return () => unsub();
  }, [auth, db, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-px bg-[#2c5aa0] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav strip */}
      <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.28em] text-slate-400 hover:text-slate-700 transition-colors"
        >
          jmqafri.org
        </Link>
        <Link
          href="/signin"
          className="text-[11px] uppercase tracking-[0.16em] text-slate-500 hover:text-[#2c5aa0] transition-colors"
        >
          Already registered? Sign in
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="max-w-xl mb-14">
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
            New Registration
            <span className="inline-block ml-3 h-px w-10 bg-slate-200 align-middle" />
          </p>
          <h1
            className="text-slate-900 leading-[1.05] tracking-[-0.03em] mb-4"
            style={{
              fontFamily: "'Cormorant', serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 300,
            }}
          >
            Join the<br />
            <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>Community Hub</em>
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Select your role below and complete the registration form. You&apos;ll create your account at the end of the form — no sign-in required upfront.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
          {ROLES.map((role) => (
            <div
              key={role.key}
              className={`bg-white p-8 flex flex-col transition-colors ${
                role.locked ? "opacity-60" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="text-2xl block mb-3">{role.icon}</span>
                  <p
                    className="text-slate-900 leading-tight tracking-[-0.02em]"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      fontSize: "1.6rem",
                      fontWeight: 300,
                    }}
                  >
                    {role.title}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-1">
                    {role.subtitle}
                  </p>
                </div>
                {role.locked && (
                  <span className="text-[9px] uppercase tracking-[0.18em] border border-slate-200 text-slate-400 px-2 py-1 shrink-0">
                    Invite only
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
                {role.description}
              </p>

              <ul className="space-y-1.5 mb-7">
                {role.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <svg
                      className="w-3 h-3 text-[#2c5aa0] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-slate-500">{b}</span>
                  </li>
                ))}
              </ul>

              {role.locked ? (
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">
                  Check your email for an invite link
                </p>
              ) : (
                <a
                  href={role.href!}
                  className="inline-block px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300 text-center"
                >
                  Register as {role.title}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-8">
          Registrations are reviewed and approved within 24–48 hours.
        </p>
      </div>
    </div>
  );
}