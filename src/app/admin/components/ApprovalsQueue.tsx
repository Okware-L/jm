"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

// ── Types ─────────────────────────────────────────────────────────────────────

type Role = "company" | "client" | "funding_recipient" | "worker";
type AppStatus = "pending" | "approved" | "rejected" | "more_info";

interface BaseApplication {
  id: string;
  role: Role;
  status: AppStatus;
  ownerId: string;
  email: string;
  submittedAt: Timestamp | null;
  rejectionReason?: string;
  infoRequest?: string;
}

interface CompanyApp extends BaseApplication {
  role: "company";
  companyName: string;
  registrationNumber: string;
  industry: string;
  description: string;
  employees: string;
  phone: string;
  city: string;
  country: string;
  website?: string;
  fundingNeeds?: string;
  fundingAmount?: string;
  documentsUploaded?: number;
  documentsRequired?: number;
}

interface ClientApp extends BaseApplication {
  role: "client";
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
  serviceNeeds: string[];
  description?: string;
}

interface FundingApp extends BaseApplication {
  role: "funding_recipient";
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
  yieldPreference: string;
  fundingSectors: string[];
  initialStakeAmount?: string;
  sourceOfFunds: string;
  investmentBackground?: string;
  idType: string;
  idNumber: string;
}

interface WorkerApp extends BaseApplication {
  role: "worker";
  displayName: string;
  companyName?: string;
  companyId?: string;
  phone?: string;
}

type AnyApplication = CompanyApp | ClientApp | FundingApp | WorkerApp;

// ── Constants ─────────────────────────────────────────────────────────────────

const ROLE_META: Record<Role, { label: string; icon: string; color: string; collection: string }> = {
  company:           { label: "Company",          icon: "🏢", color: "text-[#2c5aa0] border-[#2c5aa0]/30 bg-[#2c5aa0]/5",  collection: "company_applications" },
  client:            { label: "Client",           icon: "👤", color: "text-slate-700 border-slate-200 bg-slate-50",          collection: "client_applications" },
  funding_recipient: { label: "Funding Recipient",icon: "💎", color: "text-emerald-700 border-emerald-200 bg-emerald-50",    collection: "funding_applications" },
  worker:            { label: "Account Manager",  icon: "🔑", color: "text-amber-700 border-amber-200 bg-amber-50",          collection: "users" },
};

const REJECTION_REASONS = [
  "Missing required documents",
  "Invalid business registration",
  "Incomplete information",
  "Failed identity verification",
  "Sanctions / watchlist match",
  "Insufficient KYC documentation",
  "Other",
];

// ── Helper ────────────────────────────────────────────────────────────────────

const displayName = (app: AnyApplication): string => {
  if (app.role === "company") return (app as CompanyApp).companyName;
  if (app.role === "worker")  return (app as WorkerApp).displayName;
  const a = app as ClientApp | FundingApp;
  return `${a.firstName} ${a.lastName}`;
};

const formatDate = (ts: Timestamp | null | undefined): string => {
  if (!ts) return "—";
  const d = ts.toDate();
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60)   return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" });
};

// ── Main component ────────────────────────────────────────────────────────────

export default function ApprovalsQueue() {
  const db = getFirestore();

  const [applications, setApplications] = useState<AnyApplication[]>([]);
  const [loading, setLoading]           = useState(true);
  const [roleFilter, setRoleFilter]     = useState<Role | "all">("all");
  const [expanded, setExpanded]         = useState<string | null>(null);
  const [saving, setSaving]             = useState<string | null>(null); // id being saved

  // Reject / info-request modal state
  const [modal, setModal] = useState<{
    app: AnyApplication;
    type: "reject" | "more_info";
  } | null>(null);
  const [modalReason, setModalReason]   = useState("");
  const [modalNotes, setModalNotes]     = useState("");

  // ── Firestore listeners ───────────────────────────────────────────────────

  useEffect(() => {
    const unsubs: (() => void)[] = [];
    // Track per-source data so we can merge without losing other sources
    const sourceData: Record<string, AnyApplication[]> = {
      company: [], client: [], funding: [], worker: [],
    };

    const merge = () => {
      const all = [
        ...sourceData.company,
        ...sourceData.client,
        ...sourceData.funding,
        ...sourceData.worker,
      ].sort((a, b) => {
        const ta = a.submittedAt?.toMillis() ?? 0;
        const tb = b.submittedAt?.toMillis() ?? 0;
        return tb - ta; // newest first
      });
      setApplications(all);
      setLoading(false);
    };

    // Company applications
    unsubs.push(
      onSnapshot(
        query(collection(db, "company_applications"), where("status", "==", "pending")),
        (snap) => {
          sourceData.company = snap.docs.map((d) => ({ id: d.id, role: "company" as Role, ...d.data() } as CompanyApp));
          merge();
        }
      )
    );

    // Client applications
    unsubs.push(
      onSnapshot(
        query(collection(db, "client_applications"), where("status", "==", "pending")),
        (snap) => {
          sourceData.client = snap.docs.map((d) => ({ id: d.id, role: "client" as Role, ...d.data() } as ClientApp));
          merge();
        }
      )
    );

    // Funding applications
    unsubs.push(
      onSnapshot(
        query(collection(db, "funding_applications"), where("status", "==", "pending")),
        (snap) => {
          sourceData.funding = snap.docs.map((d) => ({ id: d.id, role: "funding_recipient" as Role, ...d.data() } as FundingApp));
          merge();
        }
      )
    );

    // Workers — read from users collection directly (no separate application doc)
    unsubs.push(
      onSnapshot(
        query(collection(db, "users"), where("status", "==", "pending"), where("role", "==", "worker")),
        (snap) => {
          sourceData.worker = snap.docs.map((d) => ({
            id: d.id,
            role: "worker" as Role,
            ownerId: d.id, // user IS the owner
            ...d.data(),
          } as WorkerApp));
          merge();
        }
      )
    );

    return () => unsubs.forEach((u) => u());
  }, [db]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const appCollection = (role: Role) => ROLE_META[role].collection;

  const approve = useCallback(async (app: AnyApplication) => {
    setSaving(app.id);
    try {
      const now = Timestamp.now();

      // Update application doc (not needed for workers — they have no separate doc)
      if (app.role !== "worker") {
        await updateDoc(doc(db, appCollection(app.role), app.id), {
          status: "approved",
          approvedAt: now,
        });
      }

      // Update user profile — this is what unlocks the dashboard
      if (app.ownerId) {
        await updateDoc(doc(db, "users", app.ownerId), {
          status: "approved",
          approvedAt: now,
          updatedAt: now,
        });
      }

      setExpanded(null);
    } finally {
      setSaving(null);
    }
  }, [db]);

  const openModal = (app: AnyApplication, type: "reject" | "more_info") => {
    setModal({ app, type });
    setModalReason("");
    setModalNotes("");
  };

  const submitModal = useCallback(async () => {
    if (!modal) return;
    const { app, type } = modal;
    setSaving(app.id);
    try {
      const now = Timestamp.now();
      const newStatus: AppStatus = type === "reject" ? "rejected" : "more_info";

      if (app.role !== "worker") {
        await updateDoc(doc(db, appCollection(app.role), app.id), {
          status: newStatus,
          ...(type === "reject"    ? { rejectionReason: modalReason, rejectionNotes: modalNotes } : {}),
          ...(type === "more_info" ? { infoRequest: modalNotes } : {}),
          updatedAt: now,
        });
      }

      if (app.ownerId) {
        await updateDoc(doc(db, "users", app.ownerId), {
          status: newStatus,
          updatedAt: now,
        });
      }

      setModal(null);
      setExpanded(null);
    } finally {
      setSaving(null);
    }
  }, [db, modal, modalReason, modalNotes]);

  // ── Derived state ─────────────────────────────────────────────────────────

  const counts: Record<Role | "all", number> = {
    all:               applications.length,
    company:           applications.filter((a) => a.role === "company").length,
    client:            applications.filter((a) => a.role === "client").length,
    funding_recipient: applications.filter((a) => a.role === "funding_recipient").length,
    worker:            applications.filter((a) => a.role === "worker").length,
  };

  const filtered =
    roleFilter === "all" ? applications : applications.filter((a) => a.role === roleFilter);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="border-b border-slate-200 pb-6 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
            Approvals Queue
            <span className="inline-block ml-3 h-px w-12 bg-slate-200 align-middle" />
          </p>
          <h2
            className="text-slate-900 leading-tight tracking-[-0.02em]"
            style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 300 }}
          >
            Pending{" "}
            <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>Registrations</em>
          </h2>
        </div>
        {counts.all > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 border border-amber-300 bg-amber-50">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.16em] text-amber-700">
              {counts.all} awaiting review
            </span>
          </div>
        )}
      </div>

      {/* ── Role stat strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
        {(["company", "client", "funding_recipient", "worker"] as Role[]).map((role) => {
          const meta = ROLE_META[role];
          const active = roleFilter === role;
          return (
            <button
              key={role}
              onClick={() => setRoleFilter(active ? "all" : role)}
              className={`bg-white px-5 py-4 text-left transition-colors hover:bg-slate-50 ${active ? "ring-1 ring-inset ring-[#2c5aa0]" : ""}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{meta.icon}</span>
                <p
                  className="text-2xl leading-none"
                  style={{ fontFamily: "'Cormorant', serif", fontWeight: 300, color: counts[role] > 0 ? "#2c5aa0" : "#94a3b8" }}
                >
                  {counts[role]}
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">{meta.label}</p>
            </button>
          );
        })}
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex gap-6 border-b border-slate-200">
        {([
          { key: "all",               label: `All (${counts.all})` },
          { key: "company",           label: `Companies (${counts.company})` },
          { key: "client",            label: `Clients (${counts.client})` },
          { key: "funding_recipient", label: `Funding (${counts.funding_recipient})` },
          { key: "worker",            label: `Workers (${counts.worker})` },
        ] as { key: Role | "all"; label: string }[]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setRoleFilter(key)}
            className={`text-[11px] uppercase tracking-[0.14em] pb-3 border-b-2 -mb-px transition-colors whitespace-nowrap ${
              roleFilter === key
                ? "border-[#2c5aa0] text-[#2c5aa0]"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 border border-slate-200 bg-slate-50 animate-pulse" />
          ))}
        </div>
      )}

      {/* ── Empty ── */}
      {!loading && filtered.length === 0 && (
        <div className="py-20 text-center border border-dashed border-slate-200">
          <div className="w-10 h-10 border border-slate-200 flex items-center justify-center mx-auto mb-4">
            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p
            className="text-slate-400 mb-1"
            style={{ fontFamily: "'Cormorant', serif", fontSize: "1.5rem", fontWeight: 300 }}
          >
            All clear
          </p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">
            No pending {roleFilter === "all" ? "registrations" : ROLE_META[roleFilter as Role]?.label.toLowerCase() + " applications"}
          </p>
        </div>
      )}

      {/* ── Application list ── */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-px">
          {filtered.map((app) => {
            const meta  = ROLE_META[app.role];
            const isExp = expanded === app.id;
            const isSav = saving === app.id;

            return (
              <div key={app.id} className="border border-slate-200 bg-white">

                {/* ── Row ── */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpanded(isExp ? null : app.id)}
                >
                  {/* Left */}
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Role badge */}
                    <span className={`shrink-0 text-[9px] uppercase tracking-[0.16em] px-2 py-1 border ${meta.color}`}>
                      {meta.icon} {meta.label}
                    </span>
                    {/* Name + email */}
                    <div className="min-w-0">
                      <p
                        className="text-slate-900 leading-tight"
                        style={{ fontFamily: "'Cormorant', serif", fontSize: "1.1rem", fontWeight: 300 }}
                      >
                        {displayName(app)}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">{app.email}</p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <p className="text-[11px] text-slate-400 hidden md:block">{formatDate(app.submittedAt)}</p>
                    {/* Quick approve button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); approve(app); }}
                      disabled={isSav}
                      className="px-4 py-1.5 text-[10px] uppercase tracking-[0.16em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300 disabled:opacity-40"
                    >
                      {isSav ? "…" : "Approve"}
                    </button>
                    {/* Chevron */}
                    <svg
                      className={`w-4 h-4 text-slate-300 transition-transform ${isExp ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* ── Expanded detail panel ── */}
                {isExp && (
                  <div className="border-t border-slate-100 bg-slate-50 px-5 py-5 space-y-5">

                    {/* ── Role-specific fields ── */}
                    <DetailGrid app={app} />

                    {/* ── Action buttons ── */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                      <button
                        onClick={() => approve(app)}
                        disabled={isSav}
                        className="px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1e3f73] transition-all duration-300 disabled:opacity-40"
                      >
                        {isSav ? "Saving…" : "✓ Approve"}
                      </button>
                      <button
                        onClick={() => openModal(app, "more_info")}
                        disabled={isSav}
                        className="px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-slate-300 text-slate-600 hover:bg-slate-100 transition-all duration-300 disabled:opacity-40"
                      >
                        Request Info
                      </button>
                      <button
                        onClick={() => openModal(app, "reject")}
                        disabled={isSav}
                        className="px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-red-200 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 disabled:opacity-40"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modal ── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg">
            {/* Modal header */}
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <h3
                className="text-slate-900 leading-tight"
                style={{ fontFamily: "'Cormorant', serif", fontSize: "1.4rem", fontWeight: 300 }}
              >
                {modal.type === "reject" ? "Reject Application" : "Request More Information"}
              </h3>
              <button
                onClick={() => setModal(null)}
                className="text-slate-300 hover:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Applicant reminder */}
            <div className="px-6 pt-5 pb-1 flex items-center gap-3">
              <span className="text-lg">{ROLE_META[modal.app.role].icon}</span>
              <div>
                <p className="text-sm text-slate-700 font-medium">{displayName(modal.app)}</p>
                <p className="text-[11px] text-slate-400">{modal.app.email}</p>
              </div>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Reason picker — reject only */}
              {modal.type === "reject" && (
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
                    Reason for Rejection
                  </label>
                  <div className="space-y-2">
                    {REJECTION_REASONS.map((r) => (
                      <label key={r} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={() => setModalReason(r)}
                          className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                            modalReason === r ? "border-[#2c5aa0] bg-[#2c5aa0]" : "border-slate-200 group-hover:border-slate-300"
                          }`}
                        >
                          {modalReason === r && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-slate-600">{r}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes / info request */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
                  {modal.type === "reject" ? "Additional Notes (optional)" : "Specify what is needed"}
                </label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder={
                    modal.type === "reject"
                      ? "Any further context for the applicant…"
                      : "e.g. Please upload a valid business registration certificate."
                  }
                  className="w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 py-1.5 outline-none resize-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setModal(null)}
                className="px-5 py-2 text-[11px] uppercase tracking-[0.16em] border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={submitModal}
                disabled={
                  !!saving || (modal.type === "reject" && !modalReason)
                }
                className={`px-5 py-2 text-[11px] uppercase tracking-[0.18em] border transition-all duration-300 disabled:opacity-40 ${
                  modal.type === "reject"
                    ? "border-red-300 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600"
                    : "border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white"
                }`}
              >
                {saving
                  ? "Saving…"
                  : modal.type === "reject"
                  ? "Confirm Rejection"
                  : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Detail grid — role-specific expanded fields ───────────────────────────────

function DetailGrid({ app }: { app: AnyApplication }) {
  if (app.role === "company") {
    const a = app as CompanyApp;
    return (
      <div className="space-y-4">
        <SectionLabel>Company Details</SectionLabel>
        <Grid>
          <Pair label="Company Name"     value={a.companyName} />
          <Pair label="Reg. Number"      value={a.registrationNumber} />
          <Pair label="Industry"         value={a.industry} />
          <Pair label="Employees"        value={a.employees || "—"} />
          <Pair label="Email"            value={a.email} />
          <Pair label="Phone"            value={a.phone} />
          <Pair label="Location"         value={`${a.city}, ${a.country}`} />
          <Pair label="Website"          value={a.website || "—"} />
          <Pair label="Funding Needs"    value={a.fundingNeeds || "Not specified"} />
          <Pair label="Amount Sought"    value={a.fundingAmount ? `$${a.fundingAmount}` : "—"} />
          <Pair label="Docs Uploaded"    value={`${a.documentsUploaded ?? 0} / ${a.documentsRequired ?? 5}`} />
          <Pair label="Submitted"        value={formatDate(a.submittedAt)} />
        </Grid>
        {a.description && (
          <>
            <SectionLabel>Description</SectionLabel>
            <p className="text-sm text-slate-600 leading-relaxed">{a.description}</p>
          </>
        )}
      </div>
    );
  }

  if (app.role === "client") {
    const a = app as ClientApp;
    return (
      <div className="space-y-4">
        <SectionLabel>Client Details</SectionLabel>
        <Grid>
          <Pair label="Full Name"     value={`${a.firstName} ${a.lastName}`} />
          <Pair label="Email"         value={a.email} />
          <Pair label="Phone"         value={a.phone} />
          <Pair label="Location"      value={`${a.city}, ${a.country}`} />
          <Pair label="Submitted"     value={formatDate(a.submittedAt)} />
        </Grid>
        {a.serviceNeeds?.length > 0 && (
          <>
            <SectionLabel>Services Needed</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {a.serviceNeeds.map((s) => (
                <span key={s} className="text-[10px] uppercase tracking-[0.12em] border border-slate-200 text-slate-500 px-2 py-1">
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
        {a.description && (
          <>
            <SectionLabel>Additional Context</SectionLabel>
            <p className="text-sm text-slate-600 leading-relaxed">{a.description}</p>
          </>
        )}
      </div>
    );
  }

  if (app.role === "funding_recipient") {
    const a = app as FundingApp;
    return (
      <div className="space-y-4">
        <SectionLabel>Personal & KYC Details</SectionLabel>
        <Grid>
          <Pair label="Full Name"           value={`${a.firstName} ${a.lastName}`} />
          <Pair label="Email"               value={a.email} />
          <Pair label="Phone"               value={a.phone} />
          <Pair label="Location"            value={`${a.city}, ${a.country}`} />
          <Pair label="ID Type"             value={a.idType} />
          <Pair label="ID Number"           value={a.idNumber} />
          <Pair label="Source of Funds"     value={a.sourceOfFunds} />
          <Pair label="Inv. Background"     value={a.investmentBackground || "—"} />
          <Pair label="Yield Preference"    value={a.yieldPreference} />
          <Pair label="Initial Stake"       value={a.initialStakeAmount ? `$${a.initialStakeAmount}` : "—"} />
          <Pair label="Submitted"           value={formatDate(a.submittedAt)} />
        </Grid>
        {a.fundingSectors?.length > 0 && (
          <>
            <SectionLabel>Preferred Sectors</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {a.fundingSectors.map((s) => (
                <span key={s} className="text-[10px] uppercase tracking-[0.12em] border border-emerald-200 text-emerald-700 bg-emerald-50 px-2 py-1">
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
        {/* KYC flag */}
        <div className="flex items-center gap-2 border border-[#2c5aa0]/20 bg-[#2c5aa0]/5 px-3 py-2">
          <svg className="w-3.5 h-3.5 text-[#2c5aa0] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <p className="text-[11px] text-[#2c5aa0]">
            Applicant consented to KYC/AML verification. Verify ID before approving.
          </p>
        </div>
      </div>
    );
  }

  if (app.role === "worker") {
    const a = app as WorkerApp;
    return (
      <div className="space-y-4">
        <SectionLabel>Account Manager Details</SectionLabel>
        <Grid>
          <Pair label="Full Name"    value={a.displayName} />
          <Pair label="Email"        value={a.email} />
          <Pair label="Phone"        value={a.phone || "—"} />
          <Pair label="Company"      value={a.companyName || "—"} />
          <Pair label="Joined"       value={formatDate(a.submittedAt)} />
        </Grid>
        <div className="flex items-center gap-2 border border-amber-200 bg-amber-50 px-3 py-2">
          <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
          <p className="text-[11px] text-amber-700">
            Joined via company invite link. Approval will grant immediate dashboard access.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

// ── Micro components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
      {children}
      <span className="flex-1 h-px bg-slate-200" />
    </p>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
      {children}
    </div>
  );
}

function Pair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-0.5">{label}</p>
      <p className="text-sm text-slate-700 break-words">{value}</p>
    </div>
  );
}