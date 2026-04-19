// app/admin/components/AdminShell.tsx
"use client";

import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import type { UserProfile } from "@/lib/auth";

// ── Lazy-loaded admin components (existing + new) ─────────────────────────────
const UserManagement        = lazy(() => import("@/app/admin/components/UserManagement"));
const PartnerApplications   = lazy(() => import("@/app/admin/components/PartnerApplications"));
const JobSubmissions        = lazy(() => import("@/app/admin/components/JobSubmissions"));
const BlogPublishing        = lazy(() => import("@/app/admin/components/BlogPublishing"));
const IndustryManagement    = lazy(() => import("@/app/admin/components/IndustryManagement"));
const RichTextEditor        = lazy(() => import("@/app/admin/components/RichTextEditor"));
const AcquisitionsSubmissions = lazy(() => import("@/app/admin/components/AcquisitionsSubmissions"));
const AirdropSubmissions    = lazy(() => import("@/app/admin/components/AirdropSubmissions"));
const TenderSubmissions     = lazy(() => import("@/app/admin/components/TenderSubmissions"));
const BlockchainMonitoring  = lazy(() => import("@/app/admin/components/BlockchainMonitoring"));
const Analytics             = lazy(() => import("@/app/admin/components/Analytics"));
const ContactFormSubmissions = lazy(() => import("@/app/admin/components/ContactFormSubmissions"));
const IntegrationSettings   = lazy(() => import("@/app/admin/components/IntegrationSettings"));

// ── NEW ADMIN COMPONENTS (from spec) ─────────────────────────────────────────
const RegistrationQueue     = lazy(() => import("@/app/admin/components/RegistrationQueue"));
const CompanyApprovals      = lazy(() => import("@/app/admin/components/CompanyApprovals"));
const DueDiligenceOversight = lazy(() => import("@/app/admin/components/DueDiligenceOversight"));
const YieldPoolManagement   = lazy(() => import("@/app/admin/components/YieldPoolManagement"));
const DocumentOversight     = lazy(() => import("@/app/admin/components/DocumentOversight"));
const ErrorMonitoring       = lazy(() => import("@/app/admin/components/ErrorMonitoring"));
//const PlatformHealth        = lazy(() => import("@/app/admin/components/PlatformHealth"));
const AuditTrail            = lazy(() => import("@/app/admin/components/AuditTrail"));
//const AnonymousOversight    = lazy(() => import("@/app/admin/components/AnonymousOversight"));
//const Escalations           = lazy(() => import("@/app/admin/components/Escalations"));

// ── Types ─────────────────────────────────────────────────────────────────────
interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

// ── Sidebar nav config (restructured per spec) ───────────────────────────────
const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "◈" },
      { id: "platform-health", label: "Platform Health", icon: "⬟" },
    ],
  },
  {
    label: "Approvals",
    items: [
      { id: "registration-queue", label: "Registration Queue", icon: "◉", badge: 12 },
      { id: "company-approvals", label: "Company Approvals", icon: "⊞", badge: 5 },
      { id: "due-diligence", label: "Due Diligence Cases", icon: "◧", badge: 3 },
      { id: "escalations", label: "Escalations", icon: "⚠", badge: 2 },
    ],
  },
  {
    label: "Users",
    items: [
      { id: "user-management", label: "User Management", icon: "⊙" },
      { id: "worker-management", label: "Worker Management", icon: "◎" },
      { id: "partner-applications", label: "Partner Applications", icon: "◔" },
      { id: "job-submissions", label: "Job Submissions", icon: "⊟" },
    ],
  },
  {
    label: "Content",
    items: [
      { id: "blog-publishing", label: "Blog Publishing", icon: "◧" },
      { id: "industry-management", label: "Industry Management", icon: "⊟" },
      { id: "rich-text-editor", label: "Rich Text Editor", icon: "◫" },
    ],
  },
  {
    label: "Finance",
    items: [
      { id: "acquisitions", label: "Acquisitions", icon: "◈" },
      { id: "airdrop", label: "Airdrop", icon: "⊛" },
      { id: "tenders", label: "Tender Submissions", icon: "◉" },
      { id: "yield-pools", label: "Yield Pool Management", icon: "◊", badge: 1 },
    ],
  },
  {
    label: "Platform",
    items: [
      { id: "document-oversight", label: "Document Oversight", icon: "◷", badge: 7 },
      { id: "audit-trail", label: "Audit Trail", icon: "◲" },
      { id: "anonymous-oversight", label: "Anonymous Communication", icon: "◍" },
      { id: "blockchain", label: "Blockchain Monitor", icon: "⬡" },
      { id: "error-monitoring", label: "Error Monitoring", icon: "◬", badge: 3 },
      { id: "analytics", label: "Analytics", icon: "◱" },
      { id: "contact-forms", label: "Contact Forms", icon: "◳" },
      { id: "integrations", label: "Integration Settings", icon: "⊕" },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

// ── Dashboard overview (with blockchain KPIs) ─────────────────────────────────
function AdminDashboard({ profile }: { profile: UserProfile }) {
  // Mock blockchain metrics - in production, fetch from API
  const blockchainStats = {
    tvl: "$847,231",
    activeStakers: 47,
    dailyYield: "$1,247",
    pendingApprovals: 17,
    activeWorkers: 12,
    totalCompanies: 34,
    totalClients: 892,
    fundingRecipients: 28,
  };

  const stats = [
    { label: "Companies", value: blockchainStats.totalCompanies, sub: "+8 this month" },
    { label: "Clients", value: blockchainStats.totalClients, sub: "+124 this month" },
    { label: "Workers", value: blockchainStats.activeWorkers, sub: "5 pending approval" },
    { label: "Funding Recipients", value: blockchainStats.fundingRecipients, sub: "+12 this month" },
    { label: "Total Value Locked", value: blockchainStats.tvl, sub: `${blockchainStats.activeStakers} active stakers` },
    { label: "Daily Yield", value: blockchainStats.dailyYield, sub: "7.2% APY average" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome bar */}
      <div className="border-b border-slate-100 pb-6">
        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400 mb-2">
          Superadmin Console · Blockchain Platform
        </p>
        <h1
          className="text-4xl font-light text-slate-900"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          Welcome back, {profile.displayName.split(" ")[0]}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Full platform oversight across blockchain operations, approvals, users, and infrastructure.
        </p>
      </div>

      {/* Blockchain KPI strip */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white border-l-4 border-[#2c5aa0] border-t border-r border-b border-slate-200 px-5 py-5 hover:shadow-md transition-all"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{s.label}</p>
            <p
              className="text-3xl font-light text-slate-900 mt-3"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              {s.value}
            </p>
            <p className="text-xs text-slate-400 mt-2">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Approval alerts */}
      <div className="bg-amber-50 border border-amber-200 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="text-amber-600 text-sm">⚠</span>
          <div>
            <p className="text-sm font-medium text-amber-800">Pending Actions</p>
            <p className="text-xs text-amber-700 mt-1">
              {blockchainStats.pendingApprovals} registrations awaiting approval · 
              3 due diligence cases in review · 
              7 documents pending signature
            </p>
          </div>
        </div>
      </div>

      {/* Module index */}
      <div className="bg-white border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2
            className="text-2xl font-light text-slate-900"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Governance Modules
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Complete platform administration with blockchain oversight.
          </p>
        </div>
        <div className="divide-y divide-slate-100">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 text-slate-600"
                  >
                    <span className="text-[#2c5aa0]">{item.icon}</span>
                    {item.label}
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-[9px] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── View router (with all new components) ─────────────────────────────────────
function AdminViewContent({ view, profile }: { view: string; profile: UserProfile }) {
  const fallback = (
    <div className="flex items-center justify-center py-24">
      <div className="text-center space-y-3">
        <div className="w-6 h-px bg-[#2c5aa0] mx-auto animate-pulse" />
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Loading module</p>
      </div>
    </div>
  );

  if (view === "dashboard") return <AdminDashboard profile={profile} />;

  return (
    <Suspense fallback={fallback}>
      {/* Existing modules */}
      {view === "user-management"       && <UserManagement />}
      {view === "partner-applications"  && <PartnerApplications />}
      {view === "job-submissions"       && <JobSubmissions />}
      {view === "blog-publishing"       && <BlogPublishing />}
      {view === "industry-management"   && <IndustryManagement />}
      {view === "rich-text-editor"      && <RichTextEditor onChange={() => {}} />}
      {view === "acquisitions"          && <AcquisitionsSubmissions />}
      {view === "airdrop"               && <AirdropSubmissions />}
      {view === "tenders"               && <TenderSubmissions />}
      {view === "blockchain"            && <BlockchainMonitoring />}
      {view === "analytics"             && <Analytics />}
      {view === "contact-forms"         && <ContactFormSubmissions />}
      {view === "integrations"          && <IntegrationSettings />}
      
      {/* New modules from spec */}
      {view === "registration-queue"    && <RegistrationQueue />}
      {view === "company-approvals"     && <CompanyApprovals />}
      {view === "due-diligence"         && <DueDiligenceOversight />}
      {/* {view === "escalations"          && <Escalations />} */}
      {view === "worker-management"     && <UserManagement workerView />}
      {view === "yield-pools"           && <YieldPoolManagement />}
      {view === "document-oversight"    && <DocumentOversight />}
      {view === "audit-trail"           && <AuditTrail />}
      {/* {view === "anonymous-oversight"   && <AnonymousOversight />} */}
      {view === "error-monitoring"      && <ErrorMonitoring />}
      {/* {view === "platform-health"       && <PlatformHealth />} */}
    </Suspense>
  );
}

// ── Mobile menu toggle ────────────────────────────────────────────────────────
function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-[#0f172a] border border-slate-700"
      aria-label="Toggle menu"
    >
      <span
        className={`block w-5 h-px bg-slate-300 transition-transform duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`}
      />
      <span
        className={`block w-5 h-px bg-slate-300 transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`block w-5 h-px bg-slate-300 transition-transform duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
      />
    </button>
  );
}

// ── Main shell ────────────────────────────────────────────────────────────────
export default function AdminShell({ profile }: { profile: UserProfile }) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const { signOut }  = useClerk();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeView = searchParams.get("view") ?? "dashboard";
  const activeItem = ALL_ITEMS.find((i) => i.id === activeView) ?? ALL_ITEMS[0];

  const navigate = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("view", id);
      router.push(`${pathname}?${params.toString()}`);
      setMobileOpen(false);
    },
    [pathname, router, searchParams]
  );

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 bg-[#2c5aa0] flex items-center justify-center rounded-sm">
            <span className="text-white text-xs font-bold tracking-wider">JM</span>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-slate-500">Community Hub</p>
            <p className="text-sm font-medium text-white">JM-Qafri Platform</p>
          </div>
        </div>

        {/* Admin identity */}
        <div className="flex items-center gap-3 px-3 py-3 bg-slate-800/60 border border-slate-700/50">
          <div className="w-8 h-8 rounded-full bg-[#2c5aa0]/30 border border-[#2c5aa0]/40 flex items-center justify-center">
            <span className="text-[#2c5aa0] text-xs font-semibold">
              {profile.displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-200 truncate">{profile.displayName}</p>
            <p className="text-[10px] text-slate-500 truncate">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 space-y-6 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-[9px] uppercase tracking-[0.3em] text-slate-600 px-2 mb-2">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = item.id === activeView;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150 text-left relative ${
                      isActive
                        ? "bg-[#2c5aa0] text-white"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                  >
                    <span className={`text-base leading-none shrink-0 ${isActive ? "text-white" : "text-slate-600"}`}>
                      {item.icon}
                    </span>
                    <span className="truncate flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                        isActive 
                          ? "bg-white/20 text-white" 
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="ml-auto w-1 h-4 bg-white/40 rounded-full shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-800 space-y-2">
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
            Superadmin · Blockchain Live
          </span>
        </div>
        <button
          onClick={() => signOut({ redirectUrl: "/signin" })}
          className="w-full px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-slate-500 border border-slate-800 hover:border-slate-600 hover:text-slate-300 transition-colors text-left"
        >
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <HamburgerButton open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:flex lg:w-64 xl:w-72 bg-[#0f172a] flex-col fixed inset-y-0 left-0 z-30">
          {sidebarContent}
        </aside>

        {/* Sidebar — mobile drawer */}
        <aside
          className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#0f172a] flex flex-col transform transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:pl-64 xl:pl-72 min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 pl-10 lg:pl-0">
              <span className="text-slate-400 text-sm">{activeItem.icon}</span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                  Admin Console · Blockchain Platform
                </p>
                <h1
                  className="text-xl font-light text-slate-900 leading-tight"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  {activeItem.label}
                </h1>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
              <span>JM-Qafri Hub</span>
              <span>/</span>
              <span className="text-slate-600">Admin</span>
              <span>/</span>
              <span className="text-[#2c5aa0]">{activeItem.label}</span>
            </div>
          </header>

          {/* Page content */}
          <div className="px-6 py-8 max-w-screen-2xl">
            <AdminViewContent view={activeView} profile={profile} />
          </div>
        </main>
      </div>
    </div>
  );
}