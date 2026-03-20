// app/admin/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// ── Existing components ───────────────────────────────────────────────────────
import Create from "../../components/createJob";
import Createdtender from "../../components/createTender";
import Footer from "../../components/Footer";
import ContactFormSubmissions from "./components/ContactFormSubmissions";
import JobSubmissions from "./components/JobSubmissions";
import TenderSubmissions from "./components/TenderSubmissions";
import AcquisitionsSubmissions from "./components/AcquisitionsSubmissions";
import Analytics from "./components/Analytics";
import UserManagement from "./components/UserManagement";
import BlogPublishing from "./components/BlogPublishing";
import PartnerApplications from "./components/PartnerApplications";
import AirdropSubmissions from "./components/AirdropSubmissions";

// ── New Community Hub components ─────────────────────────────────────────────
import CompanyApprovals from "./components/CompanyApprovals";
import IndustryManagement from "./components/IndustryManagement";
import BlockchainMonitoring from "./components/BlockchainMonitoring";
import IntegrationSettings from "./components/IntegrationSettings";
import ApprovalsQueue from "./components/ApprovalsQueue";

import { ThirdwebProvider } from "thirdweb/react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

// ── Live pending count hook ───────────────────────────────────────────────────
function usePendingCount() {
  const [count, setCount] = useState(0);
  const db = getFirestore();

  useEffect(() => {
    const counts = { company: 0, client: 0, funding: 0, worker: 0 };
    const merge = () => setCount(Object.values(counts).reduce((a, b) => a + b, 0));

    const unsubs = [
      onSnapshot(query(collection(db, "company_applications"),  where("status", "==", "pending")), (s) => { counts.company  = s.size; merge(); }),
      onSnapshot(query(collection(db, "client_applications"),   where("status", "==", "pending")), (s) => { counts.client   = s.size; merge(); }),
      onSnapshot(query(collection(db, "funding_applications"),  where("status", "==", "pending")), (s) => { counts.funding  = s.size; merge(); }),
      onSnapshot(query(collection(db, "users"), where("status", "==", "pending"), where("role", "==", "worker")), (s) => { counts.worker = s.size; merge(); }),
    ];
    return () => unsubs.forEach((u) => u());
  }, [db]);

  return count;
}

const allowedEmails = [
  "lewisokware@gmail.com",
  "claireatienowork@gmail.com",
  "atienoclaire17@gmail.com",
];

// ── Tab definitions ───────────────────────────────────────────────────────────
type TabGroup = {
  label: string;
  tabs: { key: string; label: string; badge?: string; liveCount?: boolean }[];
};

const TAB_GROUPS: TabGroup[] = [
  {
    label: "Overview",
    tabs: [{ key: "dashboard", label: "Dashboard" }],
  },
  {
    label: "Content",
    tabs: [
      { key: "createJob", label: "Create Job" },
      { key: "createTender", label: "Create Tender" },
      { key: "blogPublishing", label: "Blog" },
    ],
  },
  {
    label: "Submissions",
    tabs: [
      { key: "contactSubmissions", label: "Contact" },
      { key: "jobSubmissions", label: "Jobs" },
      { key: "tenderSubmissions", label: "Tenders" },
      { key: "acquisitionsSubmissions", label: "Acquisitions" },
      { key: "airdropSubmissions", label: "Airdrop" },
      { key: "partnerApplications", label: "Partners" },
    ],
  },
  {
    label: "Community Hub",
    tabs: [
      { key: "approvalsQueue",     label: "Approvals",         liveCount: true },
      { key: "companyApprovals",   label: "Company Approvals", badge: "New" },
      { key: "industryManagement", label: "Industries",        badge: "New" },
      { key: "blockchainMonitoring", label: "Blockchain",      badge: "New" },
      { key: "integrationSettings",  label: "Integrations",   badge: "New" },
    ],
  },
  {
    label: "Platform",
    tabs: [
      { key: "analytics", label: "Analytics" },
      { key: "userManagement", label: "Users" },
    ],
  },
];

// ── Component router ──────────────────────────────────────────────────────────
function ActiveComponent({ tab }: { tab: string }) {
  switch (tab) {
    case "createJob":              return <Create />;
    case "createTender":           return <Createdtender />;
    case "contactSubmissions":     return <ContactFormSubmissions />;
    case "jobSubmissions":         return <JobSubmissions />;
    case "tenderSubmissions":      return <TenderSubmissions />;
    case "acquisitionsSubmissions":return <AcquisitionsSubmissions />;
    case "analytics":              return <Analytics />;
    case "userManagement":         return <UserManagement />;
    case "blogPublishing":         return <BlogPublishing />;
    case "airdropSubmissions":     return <AirdropSubmissions />;
    case "partnerApplications":    return <PartnerApplications />;
    case "approvalsQueue":         return <ApprovalsQueue />;
    case "companyApprovals":       return <CompanyApprovals />;
    case "industryManagement":     return <IndustryManagement />;
    case "blockchainMonitoring":   return <BlockchainMonitoring />;
    case "integrationSettings":    return <IntegrationSettings />;
    default:                       return <Dashboard />;
  }
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pendingCount = usePendingCount();
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || !allowedEmails.includes(user.email!)) {
        router.push("/signin");
      } else {
        setUserEmail(user.email!);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="space-y-3 text-center">
          <div className="w-8 h-px bg-[#2c5aa0] mx-auto animate-pulse" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Loading</p>
        </div>
      </div>
    );
  }

  const activeGroupLabel =
    TAB_GROUPS.find((g) => g.tabs.some((t) => t.key === activeTab))?.label ?? "Overview";

  return (
    <ThirdwebProvider>
      <div className="min-h-screen bg-slate-50 flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200
          flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}>
          {/* Logo area */}
          <div className="px-6 py-6 border-b border-slate-200">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-1">jmqafri.org</p>
            <h1 className="font-['Cormorant'] font-light text-xl text-slate-900 tracking-tight leading-tight">
              Admin<br /><em className="not-italic text-[#2c5aa0]">Dashboard</em>
            </h1>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b border-slate-100">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-0.5">Signed in as</p>
            <p className="text-xs text-slate-600 truncate">{userEmail}</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4">
            {TAB_GROUPS.map((group) => (
              <div key={group.label} className="mb-4">
                <p className="px-6 text-[9px] uppercase tracking-[0.28em] text-slate-300 mb-1">
                  {group.label}
                </p>
                {group.tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
                    className={`
                      w-full flex items-center justify-between px-6 py-2.5 text-left
                      text-[12px] transition-colors duration-200
                      ${activeTab === tab.key
                        ? "text-[#2c5aa0] bg-[#2c5aa0]/5 border-r-2 border-[#2c5aa0]"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}
                    `}
                  >
                    <span>{tab.label}</span>
                    {/* Live pending count badge */}
                    {tab.liveCount && pendingCount > 0 && (
                      <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-amber-400 text-white text-[9px] font-medium">
                        {pendingCount > 99 ? "99+" : pendingCount}
                      </span>
                    )}
                    {/* Static "New" badge */}
                    {tab.badge && !tab.liveCount && (
                      <span className="text-[8px] uppercase tracking-[0.16em] border border-[#2c5aa0]/40 text-[#2c5aa0] px-1.5 py-0.5">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {/* Sign out */}
          <div className="px-6 py-5 border-t border-slate-200">
            <button
              onClick={handleSignOut}
              className="w-full text-[11px] uppercase tracking-[0.18em] border border-slate-200 text-slate-500 py-2.5 hover:border-red-200 hover:text-red-500 transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </aside>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-900/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-4">
              {/* Hamburger (mobile) */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-500 hover:text-slate-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
                <span className="text-slate-400">Admin</span>
                <span className="text-slate-200">/</span>
                <span className="text-slate-400">{activeGroupLabel}</span>
                <span className="text-slate-200">/</span>
                <span className="text-slate-700">
                  {TAB_GROUPS.flatMap((g) => g.tabs).find((t) => t.key === activeTab)?.label ?? "Dashboard"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {pendingCount > 0 && (
                <button
                  onClick={() => setActiveTab("approvalsQueue")}
                  className="flex items-center gap-2 px-3 py-1.5 border border-amber-300 bg-amber-50 hover:bg-amber-100 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.14em] text-amber-700">
                    {pendingCount} pending
                  </span>
                </button>
              )}
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400 hidden sm:block">Live</span>
            </div>
          </header>

          {/* Content area */}
          <main className="flex-1 p-6 md:p-10">
            <ActiveComponent tab={activeTab} />
          </main>

          <Footer />
        </div>
      </div>
    </ThirdwebProvider>
  );
}

// ── Dashboard overview ────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="border-b border-slate-200 pb-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
          Overview
          <span className="inline-block ml-3 h-px w-12 bg-slate-200 align-middle" />
        </p>
        <h2 className="font-['Cormorant'] font-light text-4xl text-slate-900 tracking-tight">
          Platform <em className="not-italic text-[#2c5aa0]">Health</em>
        </h2>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
        {[
          { label: "Total Users",       value: "—",  accent: false },
          { label: "Active Jobs",        value: "36", accent: true  },
          { label: "Open Tenders",       value: "12", accent: false },
          { label: "New Submissions",    value: "—",  accent: false },
          { label: "Revenue",            value: "—",  accent: false },
          { label: "Platform Uptime",    value: "—",  accent: false },
        ].map(({ label, value, accent }) => (
          <div key={label} className="bg-white px-6 py-6 hover:bg-slate-50 transition-colors">
            <p className={`text-3xl font-['Cormorant'] font-light ${accent ? "text-[#2c5aa0]" : "text-slate-700"}`}>
              {value}
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Community Hub quick links */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-5">
          Community Hub Modules
          <span className="inline-block ml-3 h-px w-12 bg-slate-200 align-middle" />
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
          {[
            {
              label: "Company Approvals",
              desc: "Review and approve company registration applications with document verification.",
              icon: "🏢",
              key: "companyApprovals",
            },
            {
              label: "Industry Management",
              desc: "Configure and manage industry categories used across the platform directory.",
              icon: "🏭",
              key: "industryManagement",
            },
            {
              label: "Blockchain Monitoring",
              desc: "Track on-chain transactions, yield pool performance and smart contract activity.",
              icon: "🔗",
              key: "blockchainMonitoring",
            },
            {
              label: "Integration Settings",
              desc: "Connect and configure third-party APIs — healthcare, banking, government and more.",
              icon: "⚙️",
              key: "integrationSettings",
            },
          ].map((item) => (
            <div key={item.key} className="bg-white px-6 py-5 hover:bg-slate-50 transition-colors group">
              <div className="flex items-start gap-4">
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-['Cormorant'] text-lg font-light text-slate-900">{item.label}</p>
                    <span className="text-[8px] uppercase tracking-[0.16em] border border-[#2c5aa0]/40 text-[#2c5aa0] px-1.5 py-0.5">New</span>
                  </div>
                  <p className="text-[12px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}