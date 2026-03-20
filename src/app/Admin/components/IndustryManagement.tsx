"use client";

import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

interface Industry {
  id: string;
  name: string;
  category: string;
  companyCount: number;
  description?: string;
  active: boolean;
  createdAt: Timestamp | null;
}

const PRESET_CATEGORIES = [
  "Primary Sector",
  "Secondary Sector",
  "Tertiary Sector",
  "Technology",
  "Services",
  "Finance",
  "Other",
];

const DEFAULT_INDUSTRIES = [
  "Agriculture", "Healthcare", "Technology", "Finance",
  "Construction", "Education", "Manufacturing", "Retail",
  "Transportation", "Energy", "Hospitality", "Creative",
];

export default function IndustryManagement() {
  const db = getFirestore();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState<Industry | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category: PRESET_CATEGORIES[0], description: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "industries"), orderBy("name", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setIndustries(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Industry)));
      setLoading(false);
    });
    return () => unsub();
  }, [db]);

  const filtered = industries.filter(
    (i) =>
      i.name?.toLowerCase().includes(search.toLowerCase()) ||
      i.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "industries"), {
        name: form.name.trim(),
        category: form.category,
        description: form.description,
        companyCount: 0,
        active: true,
        createdAt: Timestamp.now(),
      });
      setForm({ name: "", category: PRESET_CATEGORIES[0], description: "" });
      setAddModal(false);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editModal) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "industries", editModal.id), {
        name: form.name.trim(),
        category: form.category,
        description: form.description,
        updatedAt: Timestamp.now(),
      });
      setEditModal(null);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (industry: Industry) => {
    await updateDoc(doc(db, "industries", industry.id), { active: !industry.active });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "industries", id));
    setDeleteConfirm(null);
  };

  const openEdit = (industry: Industry) => {
    setForm({ name: industry.name, category: industry.category || PRESET_CATEGORIES[0], description: industry.description || "" });
    setEditModal(industry);
  };

  const openAdd = () => {
    setForm({ name: "", category: PRESET_CATEGORIES[0], description: "" });
    setAddModal(true);
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-14 border border-slate-200 bg-slate-50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
            Industry Management
            <span className="inline-block ml-3 h-px w-12 bg-slate-200 align-middle" />
          </p>
          <h2 className="font-['Cormorant'] font-light text-3xl text-slate-900 tracking-tight">
            Industry Categories
          </h2>
        </div>
        <button
          onClick={openAdd}
          className="px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300"
        >
          + Add Industry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-px bg-slate-200 border border-slate-200">
        <div className="bg-white px-5 py-4">
          <p className="text-2xl font-['Cormorant'] font-light text-[#2c5aa0]">{industries.length}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">Total Industries</p>
        </div>
        <div className="bg-white px-5 py-4">
          <p className="text-2xl font-['Cormorant'] font-light text-slate-700">{industries.filter((i) => i.active).length}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">Active</p>
        </div>
        <div className="bg-white px-5 py-4">
          <p className="text-2xl font-['Cormorant'] font-light text-slate-400">{industries.reduce((acc, i) => acc + (i.companyCount || 0), 0)}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">Total Companies</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search industries…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-6 pb-2 border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 outline-none transition-colors duration-300"
        />
      </div>

      {/* Seed prompt if empty */}
      {industries.length === 0 && (
        <div className="border border-dashed border-slate-200 p-8 text-center">
          <p className="font-['Cormorant'] font-light text-xl text-slate-400 mb-3">No industries configured</p>
          <p className="text-[11px] text-slate-400 mb-5">Seed with default categories to get started</p>
          <button
            onClick={async () => {
              setSaving(true);
              for (const name of DEFAULT_INDUSTRIES) {
                await addDoc(collection(db, "industries"), {
                  name,
                  category: "Other",
                  companyCount: 0,
                  active: true,
                  createdAt: Timestamp.now(),
                });
              }
              setSaving(false);
            }}
            disabled={saving}
            className="px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all duration-300 disabled:opacity-40"
          >
            {saving ? "Seeding…" : "Seed Default Industries"}
          </button>
        </div>
      )}

      {/* Table */}
      {filtered.length > 0 && (
        <div className="border border-slate-200">
          <div className="grid grid-cols-12 px-5 py-3 bg-slate-50 border-b border-slate-200">
            {["Industry Name", "Category", "Companies", "Status", "Actions"].map((h, i) => (
              <div
                key={h}
                className={`text-[10px] uppercase tracking-[0.18em] text-slate-400 ${
                  i === 0 ? "col-span-3" : i === 1 ? "col-span-3" : i === 2 ? "col-span-2" : i === 3 ? "col-span-2" : "col-span-2 text-right"
                }`}
              >
                {h}
              </div>
            ))}
          </div>
          {filtered.map((industry, idx) => (
            <div
              key={industry.id}
              className={`grid grid-cols-12 px-5 py-4 items-center hover:bg-slate-50 transition-colors ${idx !== filtered.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <div className="col-span-3">
                <p className="font-['Cormorant'] text-lg font-light text-slate-900 leading-tight">{industry.name}</p>
                {industry.description && (
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{industry.description}</p>
                )}
              </div>
              <div className="col-span-3">
                <span className="text-[11px] uppercase tracking-[0.12em] text-slate-500 border border-slate-200 px-2 py-0.5">
                  {industry.category || "—"}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-xl font-['Cormorant'] font-light text-[#2c5aa0]">{industry.companyCount || 0}</span>
              </div>
              <div className="col-span-2">
                <button
                  onClick={() => handleToggleActive(industry)}
                  className={`text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 border transition-colors ${
                    industry.active
                      ? "border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                      : "border-slate-200 text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {industry.active ? "Active" : "Inactive"}
                </button>
              </div>
              <div className="col-span-2 flex justify-end gap-3">
                <button
                  onClick={() => openEdit(industry)}
                  className="text-[11px] uppercase tracking-[0.14em] text-[#2c5aa0] hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(industry.id)}
                  className="text-[11px] uppercase tracking-[0.14em] text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {(addModal || editModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 w-full max-w-md mx-4">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-['Cormorant'] font-light text-xl text-slate-900">
                {editModal ? "Edit Industry" : "Add Industry"}
              </h3>
              <button onClick={() => { setAddModal(false); setEditModal(null); }} className="text-slate-400 hover:text-slate-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">Industry Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 pb-2 outline-none transition-colors duration-300"
                  placeholder="e.g. Healthcare"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 pb-2 outline-none transition-colors duration-300"
                >
                  {PRESET_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">Description (optional)</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 pb-2 outline-none transition-colors duration-300"
                  placeholder="Brief description…"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => { setAddModal(false); setEditModal(null); }} className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button
                onClick={editModal ? handleUpdate : handleAdd}
                disabled={saving || !form.name.trim()}
                className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300 disabled:opacity-40"
              >
                {saving ? "Saving…" : editModal ? "Update" : "Add Industry"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 w-full max-w-sm mx-4 p-6">
            <h3 className="font-['Cormorant'] font-light text-xl text-slate-900 mb-3">Delete Industry?</h3>
            <p className="text-sm text-slate-500 mb-6">
              This will permanently remove the industry. Companies tagged to it will need to be re-categorised.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-red-300 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}