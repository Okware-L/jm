// app/register/worker/[token]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import {  useParams } from "next/navigation";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../../../../firebseConfig";
import { createUserProfile } from "@/lib/auth";
//import { SuccessScreen } from "../../company/page";

const INPUT = "w-full border-b border-slate-200 focus:border-[#2c5aa0] bg-transparent text-sm text-slate-700 pb-2 outline-none transition-colors duration-300";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

interface InviteData {
  companyId: string;
  companyName: string;
  email: string;
  used: boolean;
  expiresAt: Timestamp;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  bio: string;
}

export default function WorkerInvitePage() {
  const params = useParams();
  const token = params?.token as string;
  


  const [tokenState, setTokenState] = useState<"loading" | "valid" | "invalid" | "used" | "expired">("loading");
  const [invite, setInvite] = useState<InviteData | null>(null);
  const [user, setUser] = useState<{ uid: string; email: string | null } | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const [form, setForm] = useState<FormData>({ firstName: "", lastName: "", phone: "", role: "", bio: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [authError, setAuthError] = useState("");

  // Validate token
  useEffect(() => {
    if (!token) { setTokenState("invalid"); return; }
    (async () => {
      const snap = await getDoc(doc(db, "worker_invites", token));
      if (!snap.exists()) { setTokenState("invalid"); return; }
      const data = snap.data() as InviteData;
      if (data.used) { setTokenState("used"); return; }
      if (data.expiresAt.toDate() < new Date()) { setTokenState("expired"); return; }
      setInvite(data);
      setTokenState("valid");
    })();
  }, [token]);

  // Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser({ uid: u.uid, email: u.email });
    });
    return () => unsub();
  }, []);

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setAuthError("");
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      // Warn if email doesn't match invite
      if (invite && result.user.email !== invite.email) {
        setAuthError(`This invite was sent to ${invite.email}. You signed in as ${result.user.email}. You may continue but please notify your company admin.`);
      }
      setUser({ uid: result.user.uid, email: result.user.email });
    } catch {
      setAuthError("Sign-in failed. Please try again.");
    } finally {
      setSigningIn(false);
    }
  };

  const set = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.phone.trim())     e.phone     = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || !user || !invite) return;
    setSubmitting(true);
    try {
      await createUserProfile(user.uid, {
        email: user.email || "",
        displayName: `${form.firstName} ${form.lastName}`,
        role: "worker",
        status: "approved", // workers are pre-approved by virtue of the invite
        companyId: invite.companyId,
        companyName: invite.companyName,
        inviteToken: token,
      });
      // Mark invite as used
      await updateDoc(doc(db, "worker_invites", token), {
        used: true,
        usedAt: Timestamp.now(),
        usedBy: user.uid,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <WorkerSuccessScreen name={`${form.firstName} ${form.lastName}`} company={invite?.companyName || ""} />;

  // Token validation states
  if (tokenState === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-px bg-[#2c5aa0] animate-pulse" />
      </div>
    );
  }

  if (tokenState !== "valid") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="max-w-md text-center">
          <div className="w-10 h-10 border border-red-200 flex items-center justify-center mx-auto mb-6">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">Invite Link</p>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "2rem", fontWeight: 300 }}
            className="text-slate-900 mb-3">
            {tokenState === "used" ? "Link already used" : tokenState === "expired" ? "Link has expired" : "Invalid invite link"}
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            {tokenState === "used" ? "This invite link has already been redeemed. If you believe this is an error, contact your company admin." :
             tokenState === "expired" ? "This invite link expired. Ask your company admin to generate a new one." :
             "This invite link is not valid. Please check your email for the correct link."}
          </p>
          <a href="/signin" className="inline-block px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-all duration-300">
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="border-b border-slate-200 px-6 py-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">jmqafri.org — Worker Invitation</p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12">
        {/* Invite banner */}
        <div className="border border-[#2c5aa0]/20 bg-[#2c5aa0]/5 px-5 py-4 mb-10 flex items-start gap-3">
          <span className="text-xl">🔑</span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#2c5aa0] mb-1">You&apos;ve been invited</p>
            <p className="text-sm text-slate-700">
              <strong>{invite?.companyName}</strong> has invited you to join as an Account Manager.
            </p>
            {invite?.email && (
              <p className="text-xs text-slate-500 mt-1">Invite sent to: {invite.email}</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h1
            className="text-slate-900 leading-tight tracking-[-0.02em] mb-2"
            style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 3.5vw, 2.6rem)", fontWeight: 300 }}
          >
            Complete your<br />
            <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>profile</em>
          </h1>
        </div>

        {/* Auth step */}
        {!user ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-500">Sign in with Google to link this invitation to your account.</p>
            {authError && <p className="text-xs text-red-500">{authError}</p>}
            <button
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              className="flex items-center gap-3 px-6 py-3 text-[11px] uppercase tracking-[0.16em] border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {signingIn ? "Signing in…" : "Sign in with Google"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border border-emerald-200 bg-emerald-50 px-4 py-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <p className="text-sm text-emerald-700">Signed in as <strong>{user.email}</strong></p>
            </div>
            {authError && (
              <div className="border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-sm text-amber-700">{authError}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-5">
              <Field label="First Name" error={errors.firstName}>
                <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={INPUT} placeholder="Jane" />
              </Field>
              <Field label="Last Name" error={errors.lastName}>
                <input type="text" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className={INPUT} placeholder="Doe" />
              </Field>
            </div>
            <Field label="Phone Number" error={errors.phone}>
              <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={INPUT} placeholder="+254 7XX XXX XXX" />
            </Field>
            <Field label="Job Title / Role">
              <input type="text" value={form.role} onChange={(e) => set("role", e.target.value)} className={INPUT} placeholder="e.g. Senior Account Manager" />
            </Field>
            <Field label="Short Bio (optional)">
              <textarea rows={2} value={form.bio} onChange={(e) => set("bio", e.target.value)}
                className={`${INPUT} resize-none`} placeholder="A few words about yourself…" />
            </Field>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-7 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1e3f73] transition-all duration-300 disabled:opacity-50"
              >
                {submitting ? "Joining…" : "Join as Account Manager"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkerSuccessScreen({ name, company }: { name: string; company: string }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-md text-center">
        <div className="w-12 h-12 border border-[#2c5aa0] flex items-center justify-center mx-auto mb-8">
          <svg className="w-5 h-5 text-[#2c5aa0]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-4">Welcome aboard</p>
        <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "2.2rem", fontWeight: 300 }}
          className="text-slate-900 mb-4 leading-tight tracking-[-0.02em]">
          You&apos;re in,<br />
          <em style={{ fontStyle: "italic", color: "#2c5aa0" }}>{name}</em>
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          You&apos;ve joined <strong>{company}</strong> as an Account Manager. Your dashboard is ready immediately.
        </p>
        <a href="/dashboard" className="inline-block px-7 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1e3f73] transition-all duration-300">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}