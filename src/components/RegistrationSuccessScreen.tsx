"use client";

import React from "react";

export default function RegistrationSuccessScreen({
  name,
  role,
  href = "/dashboard",
}: {
  name: string;
  role: string;
  href?: string;
}) {
  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-6"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-md text-center">
        <div className="w-12 h-12 border border-[#2c5aa0] flex items-center justify-center mx-auto mb-8">
          <svg className="w-5 h-5 text-[#2c5aa0]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-4">Account Ready</p>
        <h2
          className="text-slate-900 mb-4 leading-tight tracking-[-0.02em]"
          style={{ fontFamily: "'Cormorant', serif", fontSize: "2.2rem", fontWeight: 300 }}
        >
          Thank you,<br />
          <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>{name}</em>
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          Your <strong>{role}</strong> account has been created successfully. You can continue straight to your dashboard.
        </p>
        <div className="border border-slate-200 px-5 py-4 mb-8 text-left">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-3">What happens next</p>
          {[
            "Your role has been saved to your profile",
            "You can sign in with the same account any time",
            "Your dashboard is available immediately",
          ].map((step, index) => (
            <div key={step} className="flex items-start gap-3 mt-2.5">
              <span className="text-[10px] text-[#2c5aa0] mt-0.5 font-mono">0{index + 1}</span>
              <span className="text-sm text-slate-600">{step}</span>
            </div>
          ))}
        </div>
        <a
          href={href}
          className="inline-block px-7 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
