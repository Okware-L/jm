// app/register/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebseConfig";
import Link from "next/link";


const ROLES = [
  {
    key: "company",
    title: "Company",
    subtitle: "Become company admin",
    description:
      "Register your organization and become the company admin responsible for your workspace, team, and client operations.",
    bullets: ["Company workspace ownership", "Worker and client management", "Industry directory presence"],
    href: "/register/company",
    locked: false,
  },
  {
    key: "client",
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
    title: "Account Manager",
    subtitle: "Company managed",
    description:
      "Workers are created and assigned by a company admin so access stays scoped to the correct company workspace.",
    bullets: ["Assigned by company admin", "Scoped company access", "No public self-registration"],
    href: "/register/worker",
    locked: true,
  },
];

export default function RegisterPage() {
  const [checking, setChecking] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const router = useRouter();
  const { isLoaded, isSignedIn, userId } = useAuth();


  // If already fully registered, redirect to dashboard
  useEffect(() => {
    async function check() {
      if (!isLoaded) return;

      if (isSignedIn && userId) {
        const snap = await getDoc(doc(db, "users", userId));
        if (snap.exists()) {
          setHasProfile(true);
          router.replace("/dashboard");
          return;
        }
      }

      setChecking(false);
    }

    void check();
  }, [isLoaded, isSignedIn, userId, router]);

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
          href={isSignedIn ? (hasProfile ? "/dashboard" : "/register") : "/sign-up"}
          className="text-[11px] uppercase tracking-[0.16em] text-slate-500 hover:text-[#2c5aa0] transition-colors"
        >
          {isSignedIn ? (hasProfile ? "Continue to dashboard" : "Complete registration") : "Create your account"}
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
            Select your role below and complete the registration form. Company registrants become company admins, while client and funding profiles are created directly.
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

              <a
                href={role.href!}
                className={`inline-block px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] border text-center transition-all duration-300 ${
                  role.locked
                    ? "border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                    : "border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white"
                }`}
              >
                {role.locked ? "Learn how workers are added" : `Register as ${role.title}`}
              </a>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-8">
          Superadmin access is managed separately and is not available through public registration.
        </p>
      </div>
    </div>
  );
}
