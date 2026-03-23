"use client";

import React, { useState } from "react";
import { createUserProfile } from "../../../lib/auth";
import AuthPanel from "../../../components/AuthPanel";
import RegistrationSuccessScreen from "../../../components/RegistrationSuccessScreen";

const INPUT =
  "w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 pb-2 outline-none transition-colors duration-300 appearance-none";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
  jobTitle: string;
  bio: string;
}

const EMPTY: FormData = {
  firstName: "",
  lastName: "",
  phone: "",
  city: "",
  country: "Kenya",
  jobTitle: "",
  bio: "",
};

export default function WorkerRegisterPage() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Required";
    if (!form.lastName.trim()) nextErrors.lastName = "Required";
    if (!form.phone.trim()) nextErrors.phone = "Required";
    if (!form.city.trim()) nextErrors.city = "Required";
    if (!form.jobTitle.trim()) nextErrors.jobTitle = "Required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleAuth = async (uid: string, email: string) => {
    if (!validate()) {
      throw new Error("Please fix the form errors above.");
    }

    setSubmitting(true);
    try {
      await createUserProfile(uid, {
        email,
        displayName: `${form.firstName} ${form.lastName}`,
        role: "worker",
        status: "approved",
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <RegistrationSuccessScreen name={`${form.firstName} ${form.lastName}`} role="Account Manager" />;
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <a
          href="/register"
          className="text-[10px] uppercase tracking-[0.22em] text-slate-400 hover:text-slate-700 flex items-center gap-2 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </a>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Worker Registration</p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
            Account Manager
            <span className="inline-block ml-3 h-px w-8 bg-slate-200 align-middle" />
          </p>
          <h1
            className="text-slate-900 leading-tight tracking-[-0.02em] mb-3"
            style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
          >
            Create your<br />
            <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>worker account</em>
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Register directly as a worker and your account will be created with worker access immediately.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <Field label="First Name" error={errors.firstName}>
              <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={INPUT} placeholder="Jane" />
            </Field>
            <Field label="Last Name" error={errors.lastName}>
              <input type="text" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className={INPUT} placeholder="Doe" />
            </Field>
          </div>

          <Field label="Phone Number" error={errors.phone}>
            <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={INPUT} placeholder="+254 7XX XXX XXX" />
          </Field>

          <div className="grid grid-cols-2 gap-5">
            <Field label="City" error={errors.city}>
              <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} className={INPUT} placeholder="Nairobi" />
            </Field>
            <Field label="Country">
              <input type="text" value={form.country} onChange={(e) => set("country", e.target.value)} className={INPUT} />
            </Field>
          </div>

          <Field label="Job Title" error={errors.jobTitle}>
            <input type="text" value={form.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} className={INPUT} placeholder="Account Manager" />
          </Field>

          <Field label="Short Bio (optional)">
            <textarea rows={3} value={form.bio} onChange={(e) => set("bio", e.target.value)} className={`${INPUT} resize-none`} placeholder="A short introduction about your experience..." />
          </Field>

          <AuthPanel
            displayName={`${form.firstName} ${form.lastName}`.trim() || "Worker"}
            onAuth={handleAuth}
            submitting={submitting}
            submitLabel="Create Worker Account"
          />
        </div>
      </div>
    </div>
  );
}
