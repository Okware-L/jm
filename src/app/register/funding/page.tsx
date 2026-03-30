// app/register/funding/page.tsx
"use client";

import React, { useState } from "react";
import AuthPanel from "../../../components/AuthPanel";
import RegistrationSuccessScreen from "../../../components/RegistrationSuccessScreen";
import { createFundingRecipientAccount } from "../../../lib/platform";


const INPUT =
  "w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 pb-2 outline-none transition-colors duration-300 appearance-none";

function Field({
  label, error, hint, children,
}: {
  label: string; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">{label}</label>
      {children}
      {hint && !error && <p className="text-[10px] text-slate-400 mt-1">{hint}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const YIELD_PREFERENCES = [
  "Conservative (5–8% APY)",
  "Balanced (8–12% APY)",
  "Growth (12–18% APY)",
  "Aggressive (18%+ APY)",
];

const FUNDING_SECTORS = [
  "Healthcare Innovation", "Tech Startups", "Agriculture",
  "Community Growth", "Education", "Renewable Energy", "Any Sector",
];

const STEPS = ["Personal Details", "Investment Profile", "KYC & Identity"];

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
  idType: string;
  idNumber: string;
  investmentBackground: string;
  yieldPreference: string;
  fundingSectors: string[];
  initialStakeAmount: string;
  sourceOfFunds: string;
  agreeTerms: boolean;
  agreeKyc: boolean;
}

const EMPTY: FormData = {
  firstName: "", lastName: "", phone: "", city: "", country: "Kenya",
  idType: "", idNumber: "", investmentBackground: "", yieldPreference: "",
  fundingSectors: [], initialStakeAmount: "", sourceOfFunds: "",
  agreeTerms: false, agreeKyc: false,
};

export default function FundingRegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const set = (key: keyof FormData, value: string | boolean | string[]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleSector = (s: string) =>
    setForm((f) => ({
      ...f,
      fundingSectors: f.fundingSectors.includes(s)
        ? f.fundingSectors.filter((x) => x !== s)
        : [...f.fundingSectors, s],
    }));

  const validateStep = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim())  e.lastName  = "Required";
      if (!form.phone.trim())     e.phone     = "Required";
      if (!form.city.trim())      e.city      = "Required";
    }
    if (step === 1) {
      if (!form.yieldPreference)      e.yieldPreference = "Required";
      if (!form.sourceOfFunds.trim()) e.sourceOfFunds   = "Required";
    }
    if (step === 2) {
      if (!form.idType)          e.idType   = "Required";
      if (!form.idNumber.trim()) e.idNumber = "Required";
      if (!form.agreeTerms)      e.agreeTerms = "Required";
      if (!form.agreeKyc)        e.agreeKyc   = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => s + 1); };
  const back = () => setStep((s) => s - 1);

  const handleAuth = async (uid: string, email: string) => {
    if (!validateStep()) throw new Error("Please fix the form errors above.");
    setSubmitting(true);
    try {
      await createFundingRecipientAccount({
        uid,
        email,
        displayName: `${form.firstName} ${form.lastName}`,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        city: form.city,
        country: form.country,
        idType: form.idType,
        idNumber: form.idNumber,
        investmentBackground: form.investmentBackground,
        yieldPreference: form.yieldPreference,
        fundingSectors: form.fundingSectors,
        initialStakeAmount: form.initialStakeAmount,
        sourceOfFunds: form.sourceOfFunds,
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <RegistrationSuccessScreen name={`${form.firstName} ${form.lastName}`} role="Funding Recipient" href="/funding" />;
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
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Funding Recipient Registration</p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
            Funding Recipient
            <span className="inline-block ml-3 h-px w-8 bg-slate-200 align-middle" />
          </p>
          <h1
            className="text-slate-900 leading-tight tracking-[-0.02em] mb-3"
            style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
          >
            Start earning<br />
            <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>yield</em>
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 flex items-center justify-center text-[10px] border transition-colors ${
                    i < step ? "bg-[#2c5aa0] border-[#2c5aa0] text-white"
                    : i === step ? "border-[#2c5aa0] text-[#2c5aa0]"
                    : "border-slate-200 text-slate-300"
                  }`}
                >
                  {i < step ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : i + 1}
                </div>
                <span className={`text-[10px] uppercase tracking-[0.12em] hidden sm:block ${i === step ? "text-slate-700" : "text-slate-300"}`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${i < step ? "bg-[#2c5aa0]" : "bg-slate-200"}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 0 — Personal */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <Field label="First Name" error={errors.firstName}>
                <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={INPUT} placeholder="John" />
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
          </div>
        )}

        {/* Step 1 — Investment profile */}
        {step === 1 && (
          <div className="space-y-6">
            <Field label="Yield Preference" error={errors.yieldPreference}>
              <div className="grid grid-cols-1 gap-2 mt-1">
                {YIELD_PREFERENCES.map((p) => (
                  <label
                    key={p}
                    className="flex items-center gap-3 cursor-pointer border border-slate-100 px-3 py-2.5 hover:border-slate-200 transition-colors"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                        form.yieldPreference === p ? "border-[#2c5aa0] bg-[#2c5aa0]" : "border-slate-200"
                      }`}
                      onClick={() => set("yieldPreference", p)}
                    >
                      {form.yieldPreference === p && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-slate-600">{p}</span>
                  </label>
                ))}
              </div>
            </Field>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
                Preferred Funding Sectors
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FUNDING_SECTORS.map((s) => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer py-1">
                    <div
                      className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                        form.fundingSectors.includes(s) ? "border-[#2c5aa0] bg-[#2c5aa0]" : "border-slate-200"
                      }`}
                      onClick={() => toggleSector(s)}
                    >
                      {form.fundingSectors.includes(s) && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-slate-600">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <Field
              label="Estimated Initial Stake (USD)"
              hint="Optional — you can decide in your dashboard"
            >
              <input type="text" value={form.initialStakeAmount} onChange={(e) => set("initialStakeAmount", e.target.value)}
                className={INPUT} placeholder="e.g. 5000" />
            </Field>

            <Field label="Source of Funds" error={errors.sourceOfFunds}>
              <select value={form.sourceOfFunds} onChange={(e) => set("sourceOfFunds", e.target.value)} className={INPUT}>
                <option value="">Select…</option>
                {["Employment Income", "Business Revenue", "Savings", "Investment Returns", "Inheritance", "Other"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>

            <Field label="Investment Background">
              <select value={form.investmentBackground} onChange={(e) => set("investmentBackground", e.target.value)} className={INPUT}>
                <option value="">Select…</option>
                {["No prior experience", "Some crypto/DeFi experience", "Experienced DeFi user", "Professional investor"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {/* Step 2 — KYC + account creation */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border border-[#2c5aa0]/20 bg-[#2c5aa0]/5 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#2c5aa0] mb-1">KYC Required</p>
              <p className="text-sm text-[#2c5aa0]/80">
                As a funding recipient you must complete identity verification in compliance with AML regulations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Field label="ID Type" error={errors.idType}>
                <select value={form.idType} onChange={(e) => set("idType", e.target.value)} className={INPUT}>
                  <option value="">Select…</option>
                  {["National ID", "Passport", "Driver's Licence"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="ID Number" error={errors.idNumber}>
                <input type="text" value={form.idNumber} onChange={(e) => set("idNumber", e.target.value)}
                  className={INPUT} placeholder="ID number" />
              </Field>
            </div>

            {/* Mini review */}
            <div className="border border-slate-200 divide-y divide-slate-100">
              {[
                ["Name", `${form.firstName} ${form.lastName}`],
                ["City", form.city],
                ["Yield Preference", form.yieldPreference || "—"],
                ["Source of Funds", form.sourceOfFunds || "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between px-4 py-2.5">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{label}</span>
                  <span className="text-sm text-slate-600">{value}</span>
                </div>
              ))}
            </div>

            {/* Consent checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  className={`w-4 h-4 border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
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
                  <a href="/terms" className="text-[#2c5aa0] hover:underline">terms of service</a>{" "}
                  and understand the risks associated with yield farming.
                </span>
              </label>
              {errors.agreeTerms && <p className="text-xs text-red-500">{errors.agreeTerms}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  className={`w-4 h-4 border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    form.agreeKyc ? "border-[#2c5aa0] bg-[#2c5aa0]" : "border-slate-300"
                  }`}
                  onClick={() => set("agreeKyc", !form.agreeKyc)}
                >
                  {form.agreeKyc && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-600">
                  I consent to identity verification (KYC/AML) as required by the platform.
                </span>
              </label>
              {errors.agreeKyc && <p className="text-xs text-red-500">{errors.agreeKyc}</p>}
            </div>

            {/* Auth panel — inline at bottom of final step */}
            <AuthPanel
              displayName={`${form.firstName} ${form.lastName}`.trim() || "Funding Recipient"}
              onAuth={handleAuth}
              submitting={submitting}
              submitLabel="Create Funding Account"
              roleLabel="funding workspace"
            />
          </div>
        )}

        {/* Step navigation (steps 0 and 1 only — step 2 submit is inside AuthPanel) */}
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
            ) : <div />}
            <button
              onClick={next}
              className="px-7 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300"
            >
              Continue
            </button>
          </div>
        )}
        {step === STEPS.length - 1 && (
          <div className="pt-2">
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
