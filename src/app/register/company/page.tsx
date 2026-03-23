// app/register/company/page.tsx
"use client";

import React, { useState } from "react";
//import { useRouter } from "next/navigation";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { createUserProfile } from "../../../lib/auth";
import AuthPanel from "../../../components/AuthPanel";
import RegistrationSuccessScreen from "../../../components/RegistrationSuccessScreen";
import {  db } from "../../../../firebseConfig";


const INDUSTRIES = [
  "Agriculture", "Healthcare", "Technology", "Finance", "Construction",
  "Education", "Manufacturing", "Retail", "Transportation", "Energy",
  "Hospitality", "Creative", "Other",
];

const STEPS = ["Company Details", "Contact & Web", "Create Account"];

const INPUT =
  "w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 pb-2 outline-none transition-colors duration-300 appearance-none";

function Field({
  label, error, children,
}: {
  label: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

interface FormData {
  companyName: string;
  registrationNumber: string;
  industry: string;
  description: string;
  employees: string;
  founded: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  country: string;
  fundingNeeds: string;
  fundingAmount: string;
  agreeTerms: boolean;
}

const EMPTY: FormData = {
  companyName: "", registrationNumber: "", industry: "", description: "",
  employees: "", founded: "", phone: "", website: "", address: "",
  city: "", country: "Kenya", fundingNeeds: "", fundingAmount: "", agreeTerms: false,
};

export default function CompanyRegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
 
  

  const set = (key: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validateStep = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (step === 0) {
      if (!form.companyName.trim())        e.companyName = "Required";
      if (!form.registrationNumber.trim()) e.registrationNumber = "Required";
      if (!form.industry)                  e.industry = "Required";
      if (!form.description.trim())        e.description = "Required";
    }
    if (step === 1) {
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.city.trim())  e.city  = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => s + 1); };
  const back = () => setStep((s) => s - 1);

  // Called by AuthPanel once auth succeeds — receives uid + email
  const handleAuth = async (uid: string, email: string) => {
    setSubmitting(true);
    try {
      const companyRef = await addDoc(collection(db, "company_applications"), {
        companyName: form.companyName,
        registrationNumber: form.registrationNumber,
        industry: form.industry,
        description: form.description,
        employees: form.employees,
        founded: form.founded,
        email,
        phone: form.phone,
        website: form.website,
        address: form.address,
        city: form.city,
        country: form.country,
        fundingNeeds: form.fundingNeeds,
        fundingAmount: form.fundingAmount,
        status: "approved",
        ownerId: uid,
        documentsUploaded: 0,
        documentsRequired: 5,
        submittedAt: Timestamp.now(),
      });
      await createUserProfile(uid, {
        email,
        displayName: form.companyName,
        role: "company",
        status: "approved",
        companyId: companyRef.id,
        companyName: form.companyName,
        registrationNumber: form.registrationNumber,
        industry: form.industry,
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <RegistrationSuccessScreen name={form.companyName} role="Company" />;
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
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Company Registration</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 flex items-center justify-center text-[10px] border transition-colors ${
                    i < step
                      ? "bg-[#2c5aa0] border-[#2c5aa0] text-white"
                      : i === step
                      ? "border-[#2c5aa0] text-[#2c5aa0]"
                      : "border-slate-200 text-slate-300"
                  }`}
                >
                  {i < step ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-[10px] uppercase tracking-[0.14em] hidden sm:block ${
                    i === step ? "text-slate-700" : "text-slate-300"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${i < step ? "bg-[#2c5aa0]" : "bg-slate-200"}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step heading */}
        <div className="mb-8">
          <h2
            className="text-slate-900 leading-tight tracking-[-0.02em]"
            style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300 }}
          >
            {STEPS[step]}
          </h2>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 mt-1">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>

        {/* Step 0 — Company details */}
        {step === 0 && (
          <div className="space-y-6">
            <Field label="Company Name" error={errors.companyName}>
              <input type="text" value={form.companyName} onChange={(e) => set("companyName", e.target.value)}
                className={INPUT} placeholder="e.g. HealthPlus Ltd" />
            </Field>
            <Field label="Registration Number" error={errors.registrationNumber}>
              <input type="text" value={form.registrationNumber} onChange={(e) => set("registrationNumber", e.target.value)}
                className={INPUT} placeholder="e.g. KE-HC-12345" />
            </Field>
            <Field label="Industry" error={errors.industry}>
              <select value={form.industry} onChange={(e) => set("industry", e.target.value)} className={INPUT}>
                <option value="">Select industry…</option>
                {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Year Founded">
                <input type="text" value={form.founded} onChange={(e) => set("founded", e.target.value)}
                  className={INPUT} placeholder="e.g. 2018" />
              </Field>
              <Field label="Employees">
                <select value={form.employees} onChange={(e) => set("employees", e.target.value)} className={INPUT}>
                  <option value="">Select…</option>
                  {["1–5", "6–15", "16–50", "51–200", "200+"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Company Description" error={errors.description}>
              <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
                className={`${INPUT} resize-none`} placeholder="Briefly describe your company and services…" />
            </Field>
          </div>
        )}

        {/* Step 1 — Contact */}
        {step === 1 && (
          <div className="space-y-6">
            <Field label="Phone Number" error={errors.phone}>
              <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                className={INPUT} placeholder="+254 7XX XXX XXX" />
            </Field>
            <Field label="Website (optional)">
              <input type="url" value={form.website} onChange={(e) => set("website", e.target.value)}
                className={INPUT} placeholder="https://yourcompany.co.ke" />
            </Field>
            <Field label="Physical Address">
              <input type="text" value={form.address} onChange={(e) => set("address", e.target.value)}
                className={INPUT} placeholder="Street address" />
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
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-4">Funding (optional)</p>
              <div className="grid grid-cols-2 gap-5">
                <Field label="Funding Status">
                  <select value={form.fundingNeeds} onChange={(e) => set("fundingNeeds", e.target.value)} className={INPUT}>
                    <option value="">Select…</option>
                    {["Seeking Funding", "Funded", "Not Seeking"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Amount Sought (USD)">
                  <input type="text" value={form.fundingAmount} onChange={(e) => set("fundingAmount", e.target.value)}
                    className={INPUT} placeholder="e.g. 75000" />
                </Field>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Auth */}
        {step === 2 && (
          <div className="space-y-0">
            {/* Mini review */}
            <div className="border border-slate-200 divide-y divide-slate-100 mb-2">
              {[
                ["Company", form.companyName],
                ["Registration", form.registrationNumber],
                ["Industry", form.industry],
                ["City", form.city],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between px-4 py-2.5">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{label}</span>
                  <span className="text-sm text-slate-600">{value || "—"}</span>
                </div>
              ))}
            </div>
            <AuthPanel
              displayName={form.companyName}
              onAuth={handleAuth}
              submitting={submitting}
              submitLabel="Create Company Account"
            />
          </div>
        )}

        {/* Navigation */}
        {step < STEPS.length - 1 && (
          <div className="flex items-center justify-between pt-8 border-t border-slate-200 mt-8">
            {step > 0 ? (
              <button
                onClick={back}
                className="text-[11px] uppercase tracking-[0.18em] text-slate-400 hover:text-slate-700 flex items-center gap-2 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={next}
              className="px-7 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300"
            >
              Continue
            </button>
          </div>
        )}
        {step > 0 && step === STEPS.length - 1 && (
          <div className="pt-4">
            <button
              onClick={back}
              className="text-[11px] uppercase tracking-[0.18em] text-slate-400 hover:text-slate-700 flex items-center gap-2 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
