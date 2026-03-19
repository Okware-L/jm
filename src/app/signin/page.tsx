// app/signin/page.tsx
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebseConfig";
import {
  authWithGoogle,
  signInWithEmail,
  resetPassword,
} from "../../lib/auth";

type View = "signin" | "forgot";

const INPUT =
  "w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 pb-2 outline-none transition-colors duration-300";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-6 h-px bg-[#2c5aa0] animate-pulse" />
        </div>
      }
    >
      <SignInPageClient />
    </Suspense>
  );
}

function SignInPageClient() {
  const [view, setView] = useState<View>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/dashboard";


  // Redirect already-signed-in users
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        router.replace(snap.exists() ? from : "/register");
      } else {
        setChecking(false);
      }
    });
    return () => unsub();
  }, [router, from]);

  const afterAuth = async () => {
    const snap = await getDoc(doc(db, "users", auth.currentUser!.uid));
    router.replace(snap.exists() ? from : "/register");
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await authWithGoogle();
      await afterAuth();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (!msg.includes("popup-closed")) setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async () => {
    setError("");
    if (!email.trim()) { setError("Email is required."); return; }
    if (!password)     { setError("Password is required."); return; }
    setLoading(true);
    try {
      await signInWithEmail(email.trim(), password);
      await afterAuth();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("user-not-found") || msg.includes("wrong-password") || msg.includes("invalid-credential")) {
        setError("Incorrect email or password.");
      } else if (msg.includes("too-many-requests")) {
        setError("Too many failed attempts. Please reset your password or try later.");
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setError("");
    if (!resetEmail.trim()) { setError("Please enter your email address."); return; }
    setLoading(true);
    try {
      await resetPassword(resetEmail.trim());
      setResetSent(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("user-not-found")) {
        setError("No account found with that email address.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-px bg-[#2c5aa0] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Left decorative panel ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px),
              repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)`,
          }}
        />
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500 mb-8">jmqafri.org</p>
          <h1
            className="text-white leading-[1.05] tracking-[-0.03em]"
            style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 300 }}
          >
            JM-Qafri<br/>
            <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>Community Hub</em><br />
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-px bg-slate-700 border border-slate-700">
          {[["100+", "Companies"], ["5,000+", "Clients"], ["$500K+", "Funded"], ["50+", "Industries"]].map(([val, label]) => (
            <div key={label} className="bg-slate-900 px-5 py-4">
              <p style={{ fontFamily: "'Cormorant', serif", fontSize: "1.8rem", fontWeight: 300, color: "#2c5aa0" }}>{val}</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">Connect · Fund · Grow</p>
      </div>

      {/* ── Right panel ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16">
        <div className="max-w-sm w-full mx-auto">

          <p className="lg:hidden text-[10px] uppercase tracking-[0.28em] text-slate-400 mb-8">jmqafri.org</p>

          {/* ── Forgot password view ─────────────────────────────────────── */}
          {view === "forgot" && (
            <>
              <button
                onClick={() => { setView("signin"); setError(""); setResetSent(false); }}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400 hover:text-slate-700 transition-colors mb-8"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to sign in
              </button>

              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-4">
                Password Reset
                <span className="inline-block ml-3 h-px w-8 bg-slate-200 align-middle" />
              </p>
              <h2
                className="text-slate-900 mb-3 leading-tight tracking-[-0.02em]"
                style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300 }}
              >
                Reset your<br />
                <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>password</em>
              </h2>

              {resetSent ? (
                <div className="border border-emerald-200 bg-emerald-50 px-4 py-4 mt-6">
                  <p className="text-sm text-emerald-700 mb-1 font-medium">Check your inbox</p>
                  <p className="text-sm text-emerald-600">
                    A reset link has been sent to <strong>{resetEmail}</strong>. Follow the link to set a new password.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                    Enter the email address on your account and we&apos;ll send you a reset link.
                  </p>
                  {error && (
                    <div className="border border-red-200 bg-red-50 px-4 py-3 mb-5">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}
                  <div className="mb-6">
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleReset()}
                      className={INPUT}
                      placeholder="you@example.com"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={handleReset}
                    disabled={loading}
                    className="w-full py-3 text-[11px] uppercase tracking-[0.2em] border border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1e3f73] transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? "Sending…" : "Send Reset Link"}
                  </button>
                </>
              )}
            </>
          )}

          {/* ── Sign in view ─────────────────────────────────────────────── */}
          {view === "signin" && (
            <>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-4">
                Welcome back
                <span className="inline-block ml-3 h-px w-8 bg-slate-200 align-middle" />
              </p>
              <h2
                className="text-slate-900 mb-2 leading-tight tracking-[-0.02em]"
                style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 300 }}
              >
                Sign in to your<br />
                <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>account</em>
              </h2>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Access your company, client, or funding dashboard.
              </p>

              {error && (
                <div className="border border-red-200 bg-red-50 px-4 py-3 mb-6">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Google button */}
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 px-6 py-3.5 transition-all duration-300 disabled:opacity-50 group mb-5"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-600 group-hover:text-slate-900 transition-colors">
                  {loading ? "Signing in…" : "Continue with Google"}
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[10px] uppercase tracking-[0.18em] text-slate-300">or</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* Email + password */}
              <div className="space-y-5 mb-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEmail()}
                    className={INPUT}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Password</label>
                    <button
                      type="button"
                      onClick={() => { setView("forgot"); setResetEmail(email); setError(""); }}
                      className="text-[10px] uppercase tracking-[0.14em] text-slate-400 hover:text-[#2c5aa0] transition-colors"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleEmail()}
                      className={INPUT}
                      placeholder="Your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-0 bottom-2 text-[10px] uppercase tracking-[0.14em] text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleEmail}
                disabled={loading}
                className="w-full py-3 text-[11px] uppercase tracking-[0.2em] border border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1e3f73] transition-all duration-300 disabled:opacity-50 mb-6"
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>

              {/* Register CTA */}
              <p className="text-center text-sm text-slate-500">
                No account?{" "}
                <a href="/register" className="text-[#2c5aa0] hover:underline text-[11px] uppercase tracking-[0.14em]">
                  Register here
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}