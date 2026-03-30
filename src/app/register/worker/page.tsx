"use client";

export default function WorkerRegisterPage() {
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
            Worker accounts are<br />
            <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>company-managed</em>
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Account managers are provisioned and assigned by a company admin. Ask your company admin to create or activate your worker access inside the company workspace.
          </p>
        </div>

        <div className="border border-slate-200 bg-slate-50 px-6 py-6 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            This keeps worker access scoped to the correct company from day one and matches the platform operating model.
          </p>
          <a
            href="/signin"
            className="inline-block px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
