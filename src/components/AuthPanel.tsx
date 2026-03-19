// components/AuthPanel.tsx
// Inline auth section rendered at the bottom of every registration form.
// User picks Google or email/password. On submit the parent receives the uid.

"use client";

import React, { useState } from "react";
import { authWithGoogle, createEmailAccount } from "../lib/auth";

interface AuthPanelProps {
  displayName: string;           // pre-filled from the form (used for email account creation)
  onAuth: (uid: string, email: string) => Promise<void>; // called with uid after auth succeeds
  submitting: boolean;
  submitLabel?: string;
}

type Method = "google" | "email";

const INPUT =
  "w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 pb-2 outline-none transition-colors duration-300";

export default function AuthPanel({
  displayName,
  onAuth,
  submitting,
  submitLabel = "Submit Application",
}: AuthPanelProps) {
  const [method, setMethod] = useState<Method>("google");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const loading = submitting || busy;

  const handleSubmit = async () => {
    setError("");

    // Validate email method fields
    if (method === "email") {
      if (!email.trim())    { setError("Email address is required."); return; }
      if (!password)        { setError("Password is required."); return; }
      if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
      if (password !== confirm) { setError("Passwords do not match."); return; }
    }

    setBusy(true);
    try {
      let uid: string;
      let resolvedEmail: string;

      if (method === "google") {
        uid = await authWithGoogle();
        // email comes from the Google account
        const { getAuth } = await import("firebase/auth");
        resolvedEmail = getAuth().currentUser?.email || "";
      } else {
        uid = await createEmailAccount(email.trim(), password, displayName);
        resolvedEmail = email.trim();
      }

      await onAuth(uid, resolvedEmail);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      // Surface friendly Firebase error messages
      if (msg.includes("email-already-in-use")) {
        setError("An account with this email already exists. Please sign in instead.");
      } else if (msg.includes("invalid-email")) {
        setError("Please enter a valid email address.");
      } else if (msg.includes("weak-password")) {
        setError("Password is too weak. Use at least 8 characters.");
      } else if (msg.includes("popup-closed")) {
        setError("Sign-in was cancelled. Please try again.");
      } else {
        setError(msg);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pt-8 border-t border-slate-200 space-y-6">
      {/* Section label */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-1">
          Create your account
          <span className="inline-block ml-3 h-px w-8 bg-slate-200 align-middle" />
        </p>
        <p className="text-sm text-slate-500">
          Choose how you'&apos;d like to sign in. Your registration details above will be saved immediately after.
        </p>
      </div>

      {/* Method toggle */}
      <div className="flex gap-px border border-slate-200">
        {(["google", "email"] as Method[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMethod(m); setError(""); }}
            className={`flex-1 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
              method === m
                ? "bg-[#2c5aa0] text-white"
                : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            {m === "google" ? "Google" : "Email & Password"}
          </button>
        ))}
      </div>

      {/* Google option */}
      {method === "google" && (
        <div className="border border-slate-200 px-4 py-4 flex items-center gap-4 bg-slate-50">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <p className="text-sm text-slate-600">
            A Google sign-in popup will appear when you submit.
          </p>
        </div>
      )}

      {/* Email option */}
      {method === "email" && (
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={INPUT}
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-0 bottom-2 text-[10px] uppercase tracking-[0.14em] text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            {/* Strength indicator */}
            {password.length > 0 && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      password.length >= level * 3
                        ? level <= 1 ? "bg-red-400"
                          : level <= 2 ? "bg-amber-400"
                          : level <= 3 ? "bg-blue-400"
                          : "bg-emerald-400"
                        : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
              Confirm Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`${INPUT} ${confirm && confirm !== password ? "border-red-300" : ""}`}
              placeholder="Repeat password"
              autoComplete="new-password"
            />
            {confirm && confirm !== password && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 text-[11px] uppercase tracking-[0.2em] border border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1e3f73] hover:border-[#1e3f73] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <span className="w-4 h-px bg-white/60 animate-pulse block" />
            <span>Processing…</span>
          </>
        ) : (
          <>
            {method === "google" && (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="rgba(255,255,255,0.9)" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="rgba(255,255,255,0.7)" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              </svg>
            )}
            {submitLabel}
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        Already have an account?{" "}
        <a href="/signin" className="text-[#2c5aa0] hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
}