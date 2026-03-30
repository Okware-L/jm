// components/AuthPanel.tsx
// Identity gate rendered at the bottom of every registration form.
// Clerk owns sign-in/sign-up. Once a session exists, the parent receives the uid.

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useAuthState } from "../lib/auth";

interface AuthPanelProps {
  displayName: string;
  onAuth: (uid: string, email: string) => Promise<void>;
  submitting: boolean;
  submitLabel?: string;
  roleLabel?: string;
}

export default function AuthPanel({
  displayName,
  onAuth,
  submitting,
  submitLabel = "Submit Registration",
  roleLabel = "workspace",
}: AuthPanelProps) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { state, profile } = useAuthState();

  const loading = submitting || busy;
  const email =
    user?.primaryEmailAddress?.emailAddress || user?.emailAddresses[0]?.emailAddress || "";
  const buttonHref = `/sign-up?redirect_url=${encodeURIComponent(pathname)}`;

  const handleSubmit = async () => {
    setError("");
    if (!isSignedIn || !user) {
      setError("Please sign in first to continue with registration.");
      return;
    }
    if (!email.trim()) {
      setError("Your Clerk account does not have an email address yet.");
      return;
    }
    if (profile?.role) {
      setError(`This account is already registered as ${profile.role.replace(/_/g, " ")}.`);
      return;
    }

    setBusy(true);
    try {
      await onAuth(user.id, email.trim());
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pt-8 border-t border-slate-200 space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-1">
          Confirm your identity
          <span className="inline-block ml-3 h-px w-8 bg-slate-200 align-middle" />
        </p>
        <p className="text-sm text-slate-500">
          Clerk manages sign-in and session security. Once you are signed in, this form will create your {roleLabel} profile in Firestore.
        </p>
      </div>

      {!isLoaded && (
        <div className="border border-slate-200 bg-slate-50 px-4 py-4">
          <div className="w-5 h-px bg-[#2c5aa0] animate-pulse" />
        </div>
      )}

      {isLoaded && !isSignedIn && (
        <div className="border border-slate-200 bg-slate-50 px-5 py-5 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Create or sign in to a Clerk account first. After that, you’ll come right back here and we’ll attach this registration to your identity.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={buttonHref}
              className="inline-flex items-center justify-center border border-[#2c5aa0] bg-[#2c5aa0] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1f467c]"
            >
              Create Clerk Account
            </Link>
            <Link
              href={`/signin?redirect_url=${encodeURIComponent(pathname)}`}
              className="inline-flex items-center justify-center border border-slate-200 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-slate-700 transition-colors hover:bg-white"
            >
              I Already Have One
            </Link>
          </div>
        </div>
      )}

      {isLoaded && isSignedIn && (
        <div className="space-y-4">
          <div className="border border-slate-200 bg-slate-50 px-5 py-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-3">Authenticated Identity</p>
            <div className="space-y-2">
              <p className="text-sm text-slate-900">{user?.fullName || displayName || "Authenticated user"}</p>
              <p className="text-sm text-slate-500">{email || "No email available"}</p>
              {state === "no_profile" && (
                <p className="text-xs text-emerald-700">No platform profile exists yet. This registration will create one.</p>
              )}
              {profile?.role && (
                <p className="text-xs text-amber-700">
                  This account already has a platform role: {profile.role.replace(/_/g, " ")}.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => void signOut({ redirectUrl: buttonHref })}
              className="text-left text-[11px] uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-[#2c5aa0]"
            >
              Use a different account
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading || !isLoaded || !isSignedIn || Boolean(profile?.role)}
        className="w-full py-3 text-[11px] uppercase tracking-[0.2em] border border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1e3f73] hover:border-[#1e3f73] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <span className="w-4 h-px bg-white/60 animate-pulse block" />
            <span>Processing…</span>
          </>
        ) : (
          <>{submitLabel}</>
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
