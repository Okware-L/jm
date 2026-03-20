"use client";

import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

type ApprovalStatus = "pending" | "approved" | "rejected" | "more_info";

interface CompanyApplication {
  id: string;
  companyName: string;
  registrationNumber: string;
  industry: string;
  email: string;
  phone?: string;
  website?: string;
  description?: string;
  documentsUploaded?: number;
  documentsRequired?: number;
  status: ApprovalStatus;
  submittedAt: Timestamp | null;
  rejectionReason?: string;
  notes?: string;
}

const STATUS_STYLES: Record<ApprovalStatus, { label: string; classes: string }> = {
  pending:   { label: "Pending Review", classes: "border-amber-300 text-amber-700 bg-amber-50" },
  approved:  { label: "Approved",       classes: "border-[#2c5aa0]/40 text-[#2c5aa0] bg-[#2c5aa0]/5" },
  rejected:  { label: "Rejected",       classes: "border-red-300 text-red-700 bg-red-50" },
  more_info: { label: "Info Requested", classes: "border-slate-300 text-slate-600 bg-slate-50" },
};

const REJECTION_REASONS = [
  "Missing required documents",
  "Invalid business registration",
  "Incomplete information",
  "Failed verification",
  "Sanctions list match",
  "Other",
];

export default function CompanyApprovals() {
  const db = getFirestore();
  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ApprovalStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{
    id: string;
    type: "reject" | "more_info";
  } | null>(null);
  const [actionReason, setActionReason] = useState("");
  const [actionNotes, setActionNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "company_applications"),
      orderBy("submittedAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setApplications(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as CompanyApplication))
      );
      setLoading(false);
    });
    return () => unsub();
  }, [db]);

  const counts = {
    all:       applications.length,
    pending:   applications.filter((a) => a.status === "pending").length,
    approved:  applications.filter((a) => a.status === "approved").length,
    rejected:  applications.filter((a) => a.status === "rejected").length,
    more_info: applications.filter((a) => a.status === "more_info").length,
  };

  const filtered = filter === "all" ? applications : applications.filter((a) => a.status === filter);

  const updateStatus = async (id: string, status: ApprovalStatus, extra?: object) => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "company_applications", id), {
        status,
        updatedAt: Timestamp.now(),
        ...extra,
      });
    } finally {
      setSaving(false);
      setActionModal(null);
      setActionReason("");
      setActionNotes("");
    }
  };

  const handleModalSubmit = () => {
    if (!actionModal) return;
    const extra =
      actionModal.type === "reject"
        ? { rejectionReason: actionReason, notes: actionNotes }
        : { infoRequest: actionNotes };
    updateStatus(actionModal.id, actionModal.type === "reject" ? "rejected" : "more_info", extra);
  };

  const formatDate = (ts: Timestamp | null) => {
    if (!ts) return "—";
    return ts.toDate().toLocaleDateString("en-KE", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 border border-slate-200 bg-slate-50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
          Company Approvals
          <span className="inline-block ml-3 h-px w-12 bg-slate-200 align-middle" />
        </p>
        <h2 className="font-['Cormorant'] font-light text-3xl text-slate-900 tracking-tight">
          Registration Applications
        </h2>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
        {(["pending", "approved", "rejected", "more_info"] as ApprovalStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(filter === s ? "all" : s)}
            className={`bg-white px-5 py-4 text-left transition-colors hover:bg-slate-50 ${filter === s ? "bg-slate-50" : ""}`}
          >
            <p className={`text-2xl font-['Cormorant'] font-light ${s === "approved" ? "text-[#2c5aa0]" : s === "rejected" ? "text-red-600" : s === "pending" ? "text-amber-600" : "text-slate-600"}`}>
              {counts[s]}
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">
              {STATUS_STYLES[s].label}
            </p>
          </button>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-6 border-b border-slate-200">
        {(["all", "pending", "approved", "rejected", "more_info"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[11px] uppercase tracking-[0.14em] pb-3 transition-colors border-b-2 -mb-px ${
              filter === f
                ? "border-[#2c5aa0] text-[#2c5aa0]"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {f === "all" ? `All (${counts.all})` : `${STATUS_STYLES[f].label} (${counts[f]})`}
          </button>
        ))}
      </div>

      {/* Applications list */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center border border-slate-200">
          <p className="font-['Cormorant'] font-light text-2xl text-slate-400">No applications found</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300 mt-2">
            Adjust filters to see more
          </p>
        </div>
      ) : (
        <div className="space-y-px">
          {filtered.map((app) => (
            <div key={app.id} className="border border-slate-200 bg-white">
              {/* Row */}
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpanded(expanded === app.id ? null : app.id)}
              >
                <div className="flex items-center gap-6 min-w-0">
                  <div className="min-w-0">
                    <p className="font-['Cormorant'] text-lg font-light text-slate-900 leading-tight">
                      {app.companyName || "—"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {app.industry || "No industry"} · {app.registrationNumber || "No reg. no."}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className={`text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 border ${STATUS_STYLES[app.status]?.classes}`}>
                    {STATUS_STYLES[app.status]?.label}
                  </span>
                  <p className="text-[11px] text-slate-400 hidden md:block">{formatDate(app.submittedAt)}</p>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${expanded === app.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === app.id && (
                <div className="border-t border-slate-100 px-6 py-5 bg-slate-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {[
                      ["Email", app.email],
                      ["Phone", app.phone || "—"],
                      ["Website", app.website || "—"],
                      ["Documents", app.documentsUploaded !== undefined ? `${app.documentsUploaded} / ${app.documentsRequired ?? "?"}` : "—"],
                      ["Submitted", formatDate(app.submittedAt)],
                      ["Status", STATUS_STYLES[app.status]?.label],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">{label}</p>
                        <p className="text-sm text-slate-700 font-['DM_Sans']">{value}</p>
                      </div>
                    ))}
                  </div>

                  {app.description && (
                    <div className="mb-5">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">Description</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{app.description}</p>
                    </div>
                  )}

                  {app.rejectionReason && (
                    <div className="mb-5 p-3 border border-red-200 bg-red-50">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-red-400 mb-1">Rejection Reason</p>
                      <p className="text-sm text-red-700">{app.rejectionReason}</p>
                      {app.notes && <p className="text-xs text-red-500 mt-1">{app.notes}</p>}
                    </div>
                  )}

                  {/* Action buttons */}
                  {app.status === "pending" && (
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                      <button
                        onClick={() => updateStatus(app.id, "approved")}
                        disabled={saving}
                        className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300 disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setActionModal({ id: app.id, type: "more_info" })}
                        className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-slate-300 text-slate-600 hover:bg-slate-100 transition-all duration-300"
                      >
                        Request Info
                      </button>
                      <button
                        onClick={() => setActionModal({ id: app.id, type: "reject" })}
                        className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-red-300 text-red-600 hover:bg-red-50 transition-all duration-300"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {app.status === "approved" && (
                    <div className="pt-4 border-t border-slate-200">
                      <button
                        onClick={() => updateStatus(app.id, "rejected")}
                        className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-red-300 text-red-600 hover:bg-red-50 transition-all duration-300"
                      >
                        Revoke Approval
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 w-full max-w-lg mx-4">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-['Cormorant'] font-light text-xl text-slate-900">
                {actionModal.type === "reject" ? "Reject Application" : "Request More Information"}
              </h3>
              <button onClick={() => setActionModal(null)} className="text-slate-400 hover:text-slate-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-5">
              {actionModal.type === "reject" && (
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-3">
                    Reason for Rejection
                  </label>
                  <div className="space-y-2">
                    {REJECTION_REASONS.map((r) => (
                      <label key={r} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${actionReason === r ? "border-[#2c5aa0] bg-[#2c5aa0]" : "border-slate-300 group-hover:border-slate-400"}`}
                          onClick={() => setActionReason(r)}>
                          {actionReason === r && (
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth={1.5} strokeLinecap="round" fill="none" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-slate-600">{r}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">
                  {actionModal.type === "reject" ? "Additional Notes (optional)" : "Specify what information is needed"}
                </label>
                <textarea
                  rows={3}
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  className="w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 py-2 outline-none resize-none transition-colors duration-300"
                  placeholder="Add context..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => setActionModal(null)} className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                disabled={saving || (actionModal.type === "reject" && !actionReason)}
                className={`px-5 py-2 text-[11px] uppercase tracking-[0.18em] border transition-all duration-300 disabled:opacity-40 ${
                  actionModal.type === "reject"
                    ? "border-red-300 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600"
                    : "border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white"
                }`}
              >
                {saving ? "Saving…" : actionModal.type === "reject" ? "Confirm Rejection" : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}