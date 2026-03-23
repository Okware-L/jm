// app/dashboard/page.tsx
"use client";

import React from "react";
import { signOut } from "firebase/auth";
import { useRequireAuth } from "../../lib/auth";
import type { UserProfile } from "../../lib/auth";
import { auth } from "../../../firebseConfig";

const handleSignOut = async () => {
  await signOut(auth);
  window.location.href = "/signin";
};

// ── Role dashboards ───────────────────────────────────────────────────────────
// These are scaffold components — replace with full implementations as you build
// each portal out. Each receives the full UserProfile for personalisation.

function CompanyDashboard({ profile }: { profile: UserProfile }) {
  return (
    <RoleDashboardShell
      title="Company Dashboard"
      subtitle={profile.companyName || profile.displayName}
      role="Company"
      accent="#2c5aa0"
      icon="🏢"
      stats={[
        { label: "Active Clients",    value: "—" },
        { label: "Workers",           value: "—" },
        { label: "Funding Goal",      value: "—" },
        { label: "Documents",         value: "—" },
      ]}
      sections={[
        { title: "Pending Approvals",  empty: "No pending approvals" },
        { title: "Recent Messages",    empty: "No messages yet" },
        { title: "Document Requests",  empty: "No document requests" },
      ]}
    />
  );
}

function WorkerDashboard({ profile }: { profile: UserProfile }) {
  return (
    <RoleDashboardShell
      title="Account Manager Dashboard"
      subtitle={profile.companyName ? `${profile.displayName} · ${profile.companyName}` : profile.displayName}
      role="Account Manager"
      accent="#2c5aa0"
      icon="🔑"
      stats={[
        { label: "Assigned Clients", value: "—" },
        { label: "Pending Tasks",    value: "—" },
        { label: "Documents",        value: "—" },
        { label: "Messages",         value: "—" },
      ]}
      sections={[
        { title: "Assigned Clients",  empty: "No clients assigned yet" },
        { title: "Pending Tasks",     empty: "All clear — no pending tasks" },
        { title: "Due Diligence",     empty: "No active due diligence" },
      ]}
      anonymityToggle
    />
  );
}

function ClientDashboard({ profile }: { profile: UserProfile }) {
  return (
    <RoleDashboardShell
      title="Client Portal"
      subtitle={profile.displayName}
      role="Client"
      accent="#2c5aa0"
      icon="👤"
      stats={[
        { label: "Account Manager", value: "Assigned" },
        { label: "Documents",       value: "—" },
        { label: "Messages",        value: "—" },
        { label: "Services",        value: "—" },
      ]}
      sections={[
        { title: "Your Account Manager", empty: "Being assigned — check back soon" },
        { title: "Recent Conversations", empty: "No messages yet" },
        { title: "My Documents",         empty: "No documents uploaded yet" },
      ]}
    />
  );
}

function FundingDashboard({ profile }: { profile: UserProfile }) {
  return (
    <RoleDashboardShell
      title="Funding Dashboard"
      subtitle={profile.displayName}
      role="Funding Recipient"
      accent="#2c5aa0"
      icon="💎"
      stats={[
        { label: "Total Balance",  value: "$0.00" },
        { label: "Staked",        value: "$0.00" },
        { label: "Available",     value: "$0.00" },
        { label: "Total Earned",  value: "$0.00" },
      ]}
      sections={[
        { title: "Yield Pools",          empty: "No active stakes — explore pools to start earning" },
        { title: "Recent Transactions",  empty: "No transactions yet" },
        { title: "Funding Milestones",   empty: "No active funding milestones" },
      ]}
      walletPrompt
    />
  );
}

// ── Main dashboard page ───────────────────────────────────────────────────────
export default function DashboardPage() {
  const { state, profile } = useRequireAuth();

  // Loading
  if (state === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-px bg-[#2c5aa0] mx-auto animate-pulse" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Loading your dashboard</p>
        </div>
      </div>
    );
  }

  // Pending approval
  if (state === "pending") {
    return <PendingScreen profile={profile} />;
  }

  // Rejected
  if (state === "rejected") {
    return <RejectedScreen profile={profile} />;
  }

  // Suspended
  if (state === "suspended") {
    return <SuspendedScreen />;
  }

  // Active/approved — route to role dashboard
  if ((state === "approved" || state === "active") && profile) {
    switch (profile.role) {
      case "company":           return <CompanyDashboard profile={profile} />;
      case "worker":            return <WorkerDashboard profile={profile} />;
      case "client":            return <ClientDashboard profile={profile} />;
      case "funding_recipient": return <FundingDashboard profile={profile} />;
      default:                  return <UnknownRoleScreen />;
    }
  }

  return null;
}

// ── State screens ─────────────────────────────────────────────────────────────

function PendingScreen({ profile }: { profile: UserProfile | null }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-md text-center">
        <div className="w-12 h-12 border border-amber-300 flex items-center justify-center mx-auto mb-8">
          <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-4">Application Under Review</p>
        <h2
          className="text-slate-900 mb-4 leading-tight tracking-[-0.02em]"
          style={{ fontFamily: "'Cormorant', serif", fontSize: "2.2rem", fontWeight: 300 }}
        >
          Hang tight,<br />
          <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>{profile?.displayName?.split(" ")[0] || "there"}</em>
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          Your <strong>{profile?.role?.replace("_", " ")}</strong> application is being reviewed by our team. This typically takes 24–48 hours.
        </p>
        <div className="border border-slate-200 px-5 py-4 mb-8 text-left">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-2">What to expect</p>
          {[
            "A worker will verify your submitted details",
            "You'll receive an email notification on approval",
            "Your dashboard will unlock immediately after",
          ].map((s, i) => (
            <div key={s} className="flex items-start gap-3 mt-2.5">
              <span className="text-[10px] text-[#2c5aa0] mt-0.5 font-mono">0{i + 1}</span>
              <span className="text-sm text-slate-600">{s}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleSignOut}
          className="text-[11px] uppercase tracking-[0.16em] text-slate-400 hover:text-slate-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function RejectedScreen({ }: { profile: UserProfile | null }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-md text-center">
        <div className="w-12 h-12 border border-red-200 flex items-center justify-center mx-auto mb-8">
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-4">Application Not Approved</p>
        <h2
          className="text-slate-900 mb-4 leading-tight"
          style={{ fontFamily: "'Cormorant', serif", fontSize: "2.2rem", fontWeight: 300 }}
        >
          We couldn&apos;t approve<br />
          <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>your application</em>
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Your application was reviewed but could not be approved at this time. Please check your email for details and the steps needed to reapply.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/register" className="px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300">
            Reapply
          </a>
          <a href="mailto:support@jmqafri.org" className="px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all duration-300">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

function SuspendedScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-sm text-center">
        <div className="w-12 h-12 border border-slate-200 flex items-center justify-center mx-auto mb-8">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-4">Account Suspended</p>
        <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "2rem", fontWeight: 300 }} className="text-slate-900 mb-4">
          Your account has been suspended
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Please contact our support team to resolve this.
        </p>
        <a href="mailto:support@jmqafri.org" className="inline-block px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300">
          Contact Support
        </a>
      </div>
    </div>
  );
}

function UnknownRoleScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-sm text-center">
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">Configuration Error</p>
        <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "2rem", fontWeight: 300 }} className="text-slate-900 mb-4">
          Unknown role
        </h2>
        <p className="text-sm text-slate-500 mb-6">Your account has no recognised role. Contact support.</p>
        <a href="mailto:support@jmqafri.org" className="inline-block px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300">
          Contact Support
        </a>
      </div>
    </div>
  );
}

// ── Shared role dashboard shell ───────────────────────────────────────────────

function RoleDashboardShell({
  title, subtitle, role, icon, stats, sections, anonymityToggle, walletPrompt,
}: {
  title: string;
  subtitle: string;
  role: string;
  accent: string;
  icon: string;
  stats: { label: string; value: string }[];
  sections: { title: string; empty: string }[];
  anonymityToggle?: boolean;
  walletPrompt?: boolean;
}) {
  const [anon, setAnon] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{role}</p>
            <p className="text-sm text-slate-700 font-medium leading-none mt-0.5" style={{ fontFamily: "'Cormorant', serif", fontSize: "1rem" }}>
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {anonymityToggle && (
            <button
              onClick={() => setAnon((a) => !a)}
              className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] px-3 py-1.5 border transition-all ${anon ? "border-[#2c5aa0] text-[#2c5aa0] bg-[#2c5aa0]/5" : "border-slate-200 text-slate-400"}`}
            >
              <span>🕵</span> {anon ? "Anon: On" : "Anon: Off"}
            </button>
          )}
          <button
            onClick={handleSignOut}
            className="text-[11px] uppercase tracking-[0.14em] text-slate-400 hover:text-slate-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Page heading */}
        <div className="border-b border-slate-200 pb-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
            {title}
            <span className="inline-block ml-3 h-px w-10 bg-slate-200 align-middle" />
          </p>
          <h1
            className="text-slate-900 leading-tight tracking-[-0.03em]"
            style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300 }}
          >
            Welcome back,{" "}
            <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>{subtitle.split(" ")[0]}</em>
          </h1>
        </div>

        {/* Wallet prompt */}
        {walletPrompt && (
          <div className="border border-[#2c5aa0]/20 bg-[#2c5aa0]/5 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>💼</span>
              <p className="text-sm text-[#2c5aa0]">Connect your wallet to start staking and earning yield.</p>
            </div>
            <button className="px-5 py-2 text-[11px] uppercase tracking-[0.16em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300 shrink-0">
              Connect Wallet
            </button>
          </div>
        )}

        {/* Anonymity banner */}
        {anonymityToggle && anon && (
          <div className="border border-slate-200 bg-slate-900 px-5 py-3 flex items-center gap-3">
            <span>🕵</span>
            <p className="text-sm text-white">Anonymity mode is <strong>active</strong> — clients see you as &quot;Account Manager&quot;</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
          {stats.map(({ label, value }) => (
            <div key={label} className="bg-white px-5 py-5">
              <p className="text-2xl font-['Cormorant'] font-light text-[#2c5aa0]" style={{ fontFamily: "'Cormorant', serif", fontWeight: 300 }}>
                {value}
              </p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {sections.map(({ title: sTitle, empty }) => (
            <div key={sTitle} className="bg-white px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-4">{sTitle}</p>
              <div className="py-6 text-center border border-dashed border-slate-200">
                <p className="text-xs text-slate-400">{empty}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
