// app/register/client/page.tsx
"use client";

import React, { useState } from "react";
import { getFirestore, addDoc, collection, Timestamp } from "firebase/firestore";
import { createUserProfile } from "../../../lib/auth";
import AuthPanel from "../../../components/AuthPanel";
import { SuccessScreen } from "../company/page";
import {  db } from "../../../../firebseConfig";


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

const SERVICE_NEEDS = [
  "Funding Application Assistance",
  "Business Registration",
  "Legal & Compliance",
  "Financial Advisory",
  "Healthcare Services",
  "Technology Solutions",
  "Other",
];

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
  serviceNeeds: string[];
  description: string;
  agreeTerms: boolean;
}

const EMPTY: FormData = {
  firstName: "", lastName: "", phone: "", city: "", country: "Kenya",
  serviceNeeds: [], description: "", agreeTerms: false,
};

export default function ClientRegisterPage() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
 

  const set = (key: keyof FormData, value: string | boolean | string[]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      serviceNeeds: f.serviceNeeds.includes(s)
        ? f.serviceNeeds.filter((x) => x !== s)
        : [...f.serviceNeeds, s],
    }));

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.phone.trim())     e.phone     = "Required";
    if (!form.city.trim())      e.city      = "Required";
    if (!form.agreeTerms)       e.agreeTerms = "You must agree to the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAuth = async (uid: string, email: string) => {
    if (!validate()) throw new Error("Please fix the form errors above.");
    setSubmitting(true);
    try {
      await addDoc(collection(db, "client_applications"), {
        firstName: form.firstName,
        lastName: form.lastName,
        email,
        phone: form.phone,
        city: form.city,
        country: form.country,
        serviceNeeds: form.serviceNeeds,
        description: form.description,
        status: "pending",
        ownerId: uid,
        submittedAt: Timestamp.now(),
      });
      await createUserProfile(uid, {
        email,
        displayName: `${form.firstName} ${form.lastName}`,
        role: "client",
        status: "pending",
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessScreen name={`${form.firstName} ${form.lastName}`} role="Client" />;
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
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
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Client Registration</p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
            New Client
            <span className="inline-block ml-3 h-px w-8 bg-slate-200 align-middle" />
          </p>
          <h1
            className="text-slate-900 leading-tight tracking-[-0.02em] mb-3"
            style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
          >
            Tell us about<br />
            <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>yourself</em>
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Fill in your details below, then create your account at the end. You'll be assigned a dedicated account manager once approved.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <Field label="First Name" error={errors.firstName}>
              <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)}
                className={INPUT} placeholder="Jane" />
            </Field>
            <Field label="Last Name" error={errors.lastName}>
              <input type="text" value={form.lastName} onChange={(e) => set("lastName", e.target.value)}
                className={INPUT} placeholder="Doe" />
            </Field>
          </div>

          <Field label="Phone Number" error={errors.phone}>
            <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
              className={INPUT} placeholder="+254 7XX XXX XXX" />
          </Field>

          <div className="grid grid-cols-2 gap-5">
            <Field label="City" error={errors.city}>
              <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)}
                className={INPUT} placeholder="Nairobi" />
            </Field>
            <Field label="Country">
              <input type="text" value={form.country} onChange={(e) => set("country", e.target.value)}
                className={INPUT} />
            </Field>
          </div>

          {/* Service needs */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
              Services Needed (select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICE_NEEDS.map((s) => (
                <label key={s} className="flex items-center gap-3 cursor-pointer group py-1">
                  <div
                    className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                      form.serviceNeeds.includes(s)
                        ? "border-[#2c5aa0] bg-[#2c5aa0]"
                        : "border-slate-200 group-hover:border-slate-300"
                    }`}
                    onClick={() => toggleService(s)}
                  >
                    {form.serviceNeeds.includes(s) && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-slate-600">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <Field label="Additional Context (optional)">
            <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
              className={`${INPUT} resize-none`} placeholder="Describe what you need help with…" />
          </Field>

          {/* Terms */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <div
                className={`w-4 h-4 border mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
                  form.agreeTerms ? "border-[#2c5aa0] bg-[#2c5aa0]" : "border-slate-300"
                }`}
                onClick={() => set("agreeTerms", !form.agreeTerms)}
              >
                {form.agreeTerms && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-slate-600">
                I agree to the{" "}
                <a href="/terms" className="text-[#2c5aa0] hover:underline">terms of service</a> and{" "}
                <a href="/privacy" className="text-[#2c5aa0] hover:underline">privacy policy</a>.
              </span>
            </label>
            {errors.agreeTerms && <p className="text-xs text-red-500 mt-1">{errors.agreeTerms}</p>}
          </div>

          {/* Auth panel — inline at bottom */}
          <AuthPanel
            displayName={`${form.firstName} ${form.lastName}`.trim() || "Client"}
            onAuth={handleAuth}
            submitting={submitting}
            submitLabel="Submit Client Registration"
          />
        </div>
      </div>
    </div>
  );
}