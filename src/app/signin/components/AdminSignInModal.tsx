"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

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

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const maybeMessage = (error as { message?: unknown }).message;
    if (typeof maybeMessage === "string" && maybeMessage) {
      return maybeMessage;
    }

    const maybeErrors = (error as { errors?: Array<{ message?: string }> }).errors;
    if (Array.isArray(maybeErrors) && maybeErrors[0]?.message) {
      return maybeErrors[0].message;
    }
  }

  return "";
}

export default function AdminSignInModal({ onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<Stage>("credentials");

  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { signIn } = useSignIn();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSignIn = async () => {
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    setStage("verifying");

    try {
      const verifyResponse = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const verifyData = (await verifyResponse.json()) as { ok: boolean; reason?: string };

      if (!verifyData.ok) {
        if (verifyData.reason === "ip") {
          setStage("blocked_ip");
        } else if (verifyData.reason === "email") {
          setStage("blocked_email");
        } else if (verifyData.reason === "password") {
          setStage("credentials");
          setError("Incorrect admin password.");
        } else if (verifyData.reason === "config") {
          setStage("credentials");
          setError("Admin access is not configured correctly.");
        } else {
          setStage("credentials");
          setError("Access denied. Please try again.");
        }
        setLoading(false);
        return;
      }

      if (!signIn) {
        throw new Error("Clerk sign-in resource unavailable");
      }

      const passwordAttempt = await signIn.password({
        emailAddress: email.trim(),
        password,
      });

      if (passwordAttempt.error) {
        throw new Error(getErrorMessage(passwordAttempt.error) || "Clerk password sign-in failed");
      }

      if (signIn.status !== "complete" || !signIn.createdSessionId) {
        setStage("credentials");
        setError(`Admin sign-in could not be completed. Clerk status: ${signIn.status}.`);
        setLoading(false);
        return;
      }

      const finalizeResult = await signIn.finalize();

      if (finalizeResult.error) {
        throw new Error(getErrorMessage(finalizeResult.error) || "Clerk could not finalize the admin session");
      }

      router.push("/admin");
      router.refresh();
      onClose();
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setStage("credentials");

      if (message.toLowerCase().includes("password")) {
        setError("Clerk rejected the password for this admin account.");
      } else if (message.toLowerCase().includes("identifier")) {
        setError("No Clerk admin account was found for this email.");
      } else if (message.toLowerCase().includes("email")) {
        setError(message);
      } else if (message) {
        setError(message);
      } else {
        setError("Admin sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isBlocked = stage === "blocked_ip" || stage === "blocked_email";
  const blockInfo = isBlocked ? BLOCK_MESSAGES[stage] : null;

  return (
    <div
      ref={overlayRef}
      onClick={(event) => {
        if (event.target === overlayRef.current) onClose();
      }}
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

          {stage === "verifying" && (
            <div className="text-center py-8">
              <div className="w-8 h-px bg-[#2c5aa0] mx-auto animate-pulse mb-6" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Verifying credentials…</p>
            </div>
          )}

          {stage === "credentials" && (
            <>
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-slate-500">Restricted · jmqafri.org</p>
                </div>
                <h2
                  className="text-white leading-tight tracking-[-0.02em]"
                  style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 300 }}
                >
                  Admin <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>Access</em>
                </h2>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  Authorised personnel only. Access is checked server-side, then completed through Clerk.
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
                    onChange={(event) => setEmail(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && void handleSignIn()}
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
                      onChange={(event) => setPassword(event.target.value)}
                      onKeyDown={(event) => event.key === "Enter" && void handleSignIn()}
                      className={INPUT}
                      placeholder="Admin password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((value) => !value)}
                      className="absolute right-0 bottom-2 text-[10px] uppercase tracking-[0.14em] text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => void handleSignIn()}
                disabled={loading}
                className="w-full py-3 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1f467c] transition-colors disabled:opacity-60"
              >
                {loading ? "Verifying…" : "Continue to Admin"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
