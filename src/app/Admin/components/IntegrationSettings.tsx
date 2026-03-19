"use client";

import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

type ConnStatus = "connected" | "disconnected" | "error" | "testing";

interface Integration {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  status: ConnStatus;
  apiKey?: string;
  apiEndpoint?: string;
  lastSync?: Timestamp | null;
  recordsSynced?: number;
  features?: string[];
  comingSoon?: string[];
  notes?: string;
}

const INTEGRATION_DEFAULTS: Omit<Integration, "id" | "status" | "lastSync">[] = [
  {
    name: "Healthcare",
    icon: "🏥",
    description: "Connect to Kenya Health Portal — patient records, appointments, prescriptions.",
    category: "Healthcare",
    apiEndpoint: "https://api.communityhub.com/healthcare/v1",
    features: ["Patient Records Access", "Appointment Scheduling", "Prescription Management"],
    comingSoon: ["Insurance Verification", "Lab Results Integration"],
  },
  {
    name: "Banking",
    icon: "🏦",
    description: "Open Banking API — payment processing, account verification, balance checking.",
    category: "Finance",
    apiEndpoint: "https://api.communityhub.com/banking/v1",
    features: ["Transaction Sync", "Balance Checking", "Payment Processing"],
    comingSoon: ["Direct Debit", "FX Conversion"],
  },
  {
    name: "Government",
    icon: "🏛",
    description: "Government Portal — ID verification, permit checks, business registration, tax status.",
    category: "Government",
    apiEndpoint: "https://api.communityhub.com/gov/v1",
    features: ["ID Verification", "Permit Check", "Business Registration"],
    comingSoon: ["Tax Clearance", "Court Records"],
  },
  {
    name: "Insurance",
    icon: "🛡",
    description: "Insurance API — policy management and claim verification.",
    category: "Finance",
    apiEndpoint: "https://api.communityhub.com/insurance/v1",
    features: ["Policy Management"],
    comingSoon: ["Claims Processing", "Premium Calculation"],
  },
  {
    name: "Logistics",
    icon: "🚚",
    description: "Shipping API — delivery tracking and order management.",
    category: "Operations",
    apiEndpoint: "https://api.communityhub.com/logistics/v1",
    features: ["Order Tracking"],
    comingSoon: ["Route Optimisation", "Last-Mile Delivery"],
  },
  {
    name: "Education",
    icon: "🎓",
    description: "Academic API — credential verification and certificate management.",
    category: "Education",
    apiEndpoint: "https://api.communityhub.com/education/v1",
    features: ["Credential Verification"],
    comingSoon: ["Certificate Issuance", "Course Enrolment"],
  },
];

export default function IntegrationSettings() {
  const db = getFirestore();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editKey, setEditKey] = useState<{ id: string; key: string } | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [testingId, setTestingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Seed defaults if empty
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "integrations"), async (snap) => {
      if (snap.empty) {
        for (const d of INTEGRATION_DEFAULTS) {
          await setDoc(doc(db, "integrations", d.name.toLowerCase()), {
            ...d,
            status: "disconnected",
            lastSync: null,
            recordsSynced: 0,
            apiKey: "",
          });
        }
      }
      setIntegrations(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Integration)));
      setLoading(false);
    });
    return () => unsub();
  }, [db]);

  const toggleConnection = async (integration: Integration) => {
    const newStatus: ConnStatus =
      integration.status === "connected" ? "disconnected" : "connected";
    await updateDoc(doc(db, "integrations", integration.id), {
      status: newStatus,
      ...(newStatus === "connected" ? { lastSync: Timestamp.now() } : {}),
    });
  };

  const handleTestConnection = async (id: string) => {
    setTestingId(id);
    await updateDoc(doc(db, "integrations", id), { status: "testing" });
    // Simulate test
    setTimeout(async () => {
      await updateDoc(doc(db, "integrations", id), {
        status: "connected",
        lastSync: Timestamp.now(),
      });
      setTestingId(null);
    }, 2000);
  };

  const handleSaveKey = async () => {
    if (!editKey) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "integrations", editKey.id), { apiKey: keyInput });
      setEditKey(null);
      setKeyInput("");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async (id: string, notes: string) => {
    await updateDoc(doc(db, "integrations", id), { notes });
  };

  const formatDate = (ts: Timestamp | null | undefined) => {
    if (!ts) return "Never";
    return ts.toDate().toLocaleString("en-KE", {
      day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
    });
  };

  const connected = integrations.filter((i) => i.status === "connected").length;

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
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
          Integration Settings
          <span className="inline-block ml-3 h-px w-12 bg-slate-200 align-middle" />
        </p>
        <h2 className="font-['Cormorant'] font-light text-3xl text-slate-900 tracking-tight">
          Third-Party Integrations
        </h2>
      </div>

      {/* Status strip */}
      <div className="grid grid-cols-3 gap-px bg-slate-200 border border-slate-200">
        <div className="bg-white px-5 py-4">
          <p className="text-2xl font-['Cormorant'] font-light text-[#2c5aa0]">{connected}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">Connected</p>
        </div>
        <div className="bg-white px-5 py-4">
          <p className="text-2xl font-['Cormorant'] font-light text-slate-400">{integrations.length - connected}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">Available</p>
        </div>
        <div className="bg-white px-5 py-4">
          <p className="text-2xl font-['Cormorant'] font-light text-slate-700">{integrations.length}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">Total</p>
        </div>
      </div>

      {/* Integration cards */}
      <div className="space-y-px">
        {integrations.map((integration) => (
          <div key={integration.id} className="border border-slate-200 bg-white">
            {/* Card header row */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{integration.icon}</span>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-['Cormorant'] text-xl font-light text-slate-900">{integration.name}</p>
                    <span className={`text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 border ${
                      integration.status === "connected" ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                      : integration.status === "testing" ? "border-amber-300 text-amber-600 bg-amber-50"
                      : integration.status === "error" ? "border-red-300 text-red-600 bg-red-50"
                      : "border-slate-200 text-slate-400"
                    }`}>
                      {integration.status === "testing" ? "Testing…" : integration.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {integration.status === "connected" && (
                  <button
                    onClick={() => handleTestConnection(integration.id)}
                    disabled={testingId === integration.id}
                    className="text-[11px] uppercase tracking-[0.14em] text-slate-500 hover:text-[#2c5aa0] transition-colors disabled:opacity-40"
                  >
                    Test
                  </button>
                )}
                <button
                  onClick={() => toggleConnection(integration)}
                  className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] border transition-all duration-300 ${
                    integration.status === "connected"
                      ? "border-red-200 text-red-500 hover:bg-red-50"
                      : "border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white"
                  }`}
                >
                  {integration.status === "connected" ? "Disconnect" : "Connect"}
                </button>
                <button
                  onClick={() => setExpanded(expanded === integration.id ? null : integration.id)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className={`w-4 h-4 transition-transform ${expanded === integration.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Expanded panel */}
            {expanded === integration.id && (
              <div className="border-t border-slate-100 px-6 py-5 bg-slate-50 space-y-5">
                {/* Last sync + records */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">Last Sync</p>
                    <p className="text-sm text-slate-600">{formatDate(integration.lastSync)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">Records Synced</p>
                    <p className="text-sm text-slate-600">{(integration.recordsSynced || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">Category</p>
                    <p className="text-sm text-slate-600">{integration.category}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">Status</p>
                    <p className="text-sm text-slate-600 capitalize">{integration.status}</p>
                  </div>
                </div>

                {/* Features */}
                {integration.features && integration.features.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-2">Available Services</p>
                    <div className="space-y-1.5">
                      {integration.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-slate-600">{f}</span>
                        </div>
                      ))}
                      {integration.comingSoon?.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-slate-400">{f} <em className="not-italic text-[10px] uppercase tracking-[0.12em] text-slate-300">Coming soon</em></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* API Config */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">API Configuration</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">Endpoint</label>
                      <p className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-3 py-2">
                        {integration.apiEndpoint || "—"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">API Key</label>
                      <div className="flex gap-2">
                        <p className="flex-1 text-xs font-mono text-slate-500 bg-white border border-slate-200 px-3 py-2">
                          {integration.apiKey
                            ? `${integration.apiKey.slice(0, 8)}${"•".repeat(12)}`
                            : "Not configured"}
                        </p>
                        <button
                          onClick={() => { setEditKey({ id: integration.id, key: integration.apiKey || "" }); setKeyInput(integration.apiKey || ""); }}
                          className="px-3 py-1 text-[10px] uppercase tracking-[0.14em] border border-slate-200 text-slate-500 hover:border-[#2c5aa0] hover:text-[#2c5aa0] transition-all"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="pt-2">
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-2">Admin Notes</label>
                  <textarea
                    defaultValue={integration.notes || ""}
                    rows={2}
                    onBlur={(e) => handleSaveNotes(integration.id, e.target.value)}
                    className="w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-600 py-1 outline-none resize-none transition-colors duration-300"
                    placeholder="Internal notes about this integration…"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* API Key Edit Modal */}
      {editKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 w-full max-w-md mx-4">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-['Cormorant'] font-light text-xl text-slate-900">Update API Key</h3>
              <button onClick={() => setEditKey(null)} className="text-slate-400 hover:text-slate-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">API Key</label>
              <input
                type="text"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 font-mono pb-2 outline-none transition-colors duration-300"
                placeholder="Paste API key here…"
              />
              <p className="text-[10px] text-slate-400 mt-3">
                This key is stored in Firestore. Avoid sharing it externally.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => setEditKey(null)} className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                disabled={saving}
                className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300 disabled:opacity-40"
              >
                {saving ? "Saving…" : "Save Key"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}