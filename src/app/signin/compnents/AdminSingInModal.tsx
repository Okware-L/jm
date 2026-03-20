// components/AdminSignInModal.tsx
//
// Admin sign-in modal.
// Credentials are validated entirely server-side via POST /api/admin/verify.
// No emails, passwords, or IPs are present in this file or the client bundle.

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../../firebseConfig"; // adjust path if needed

const INPUT =
  "w-full border-b border-slate-700 focus:border-white bg-transparent text-sm text-white pb-2 outline-none transition-colors duration-300 placeholder:text-slate-500";

interface Props {
  onClose: () => void;
}

type Stage = "credentials" | "verifying" | "blocked_ip" | "blocked_email";

const BLOCK_MESSAGES: Record<string, { title: string; body: string }> = {
  blocked_ip: {
    title: "Network Not Allowed",
    body: "Your current network is not on the admin access list. Connect from an authorised location and try again.",
  },
  blocked_email: {
    title: "Access Denied",
    body: "This email address is not registered as an admin account.",
  },
};

export default function AdminSignInModal({ onClose }: Props) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [stage, setStage]       = useState<Stage>("credentials");

  const overlayRef = useRef<HTMLDivElement>(null);
  const router     = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSignIn = async () => {
    setError("");
    if (!email.trim()) { setError("Email is required.");    return; }
    if (!password)     { setError("Password is required."); return; }

    setLoading(true);
    setStage("verifying");

    try {
      // ── Step 1: Server validates email + password + IP ──────────────────
      const res  = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json() as { ok: boolean; reason?: string };

      if (!data.ok) {
        if (data.reason === "ip") {
          setStage("blocked_ip");
        } else if (data.reason === "email") {
          setStage("blocked_email");
        } else if (data.reason === "password") {
          setStage("credentials");
          setError("Incorrect password.");
        } else if (data.reason === "config") {
          setStage("credentials");
          setError("Admin access is not configured. Contact your system administrator.");
        } else {
          setStage("credentials");
          setError("Access denied. Please try again.");
        }
        setLoading(false);
        return;
      }

      // ── Step 2: Server approved — sign into Firebase ────────────────────
      await signInWithEmailAndPassword(auth, email.trim(), password);

      // ── Step 3: Redirect ────────────────────────────────────────────────
      router.push("/admin");

    } catch (err: unknown) {
      await signOut(auth).catch(() => {});
      setStage("credentials");

      const msg = err instanceof Error ? err.message : "";
      if (
        msg.includes("user-not-found") ||
        msg.includes("wrong-password") ||
        msg.includes("invalid-credential")
      ) {
        setError("Firebase sign-in failed. Ensure this email has a Firebase Auth account.");
      } else if (msg.includes("too-many-requests")) {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("Sign-in failed. Please try again.");
      }
      setLoading(false);
    }
  };

  const isBlocked = stage === "blocked_ip" || stage === "blocked_email";
  const blockInfo = isBlocked ? BLOCK_MESSAGES[stage] : null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="relative w-full max-w-sm mx-4 bg-slate-900 border border-slate-700/60 shadow-2xl">

        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-500 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 py-8">

          {/* ── HARD BLOCK ───────────────────────────────────────────────── */}
          {isBlocked && blockInfo && (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-red-400 mb-3">{blockInfo.title}</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{blockInfo.body}</p>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-[11px] uppercase tracking-[0.18em] border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 transition-all duration-300"
              >
                Close
              </button>
            </div>
          )}

          {/* ── VERIFYING ────────────────────────────────────────────────── */}
          {stage === "verifying" && (
            <div className="text-center py-8">
              <div className="w-8 h-px bg-[#2c5aa0] mx-auto animate-pulse mb-6" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                Verifying credentials…
              </p>
            </div>
          )}

          {/* ── CREDENTIALS FORM ─────────────────────────────────────────── */}
          {stage === "credentials" && (
            <>
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-slate-500">
                    Restricted · jmqafri.org
                  </p>
                </div>
                <h2
                  className="text-white leading-tight tracking-[-0.02em]"
                  style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 300 }}
                >
                  Admin <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>Access</em>
                </h2>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  Authorised personnel only. All access is verified server-side.
                </p>
              </div>

              {error && (
                <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 mb-5">
                  <p className="text-[12px] text-red-400">{error}</p>
                </div>
              )}

              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.24em] text-slate-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                    className={INPUT}
                    placeholder="admin@example.com"
                    autoComplete="email"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.24em] text-slate-500 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                      className={INPUT}
                      placeholder="Admin password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-0 bottom-2 text-[9px] uppercase tracking-[0.14em] text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignIn}
                disabled={loading}
                className="w-full py-3 text-[11px] uppercase tracking-[0.2em] border border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1e3f73] hover:border-[#1e3f73] transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Verifying…" : "Sign In to Admin"}
              </button>

              <p className="text-center text-[9px] uppercase tracking-[0.16em] text-slate-600 mt-5">
                Session activity is logged
              </p>
            </>
          )}
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>
    </div>
  );
}