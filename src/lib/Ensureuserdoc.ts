// lib/ensureUserDoc.ts
//
// Called on every sign-in (email, Google, or admin modal).
// • If the user doc already exists → returns it untouched.
// • If it does NOT exist:
//   - admins get a superadmin doc created automatically
//   - everyone else is treated as unregistered
//
// Role detection order:
//   1. If the email matches ADMIN_EMAILS env var → superadmin
//   2. Otherwise → no profile exists yet
//
// This means manually-created Firebase Auth admins get their Firestore doc
// auto-created with role: "superadmin" on first sign-in. Every other user
// must already have completed registration and have a Firestore profile.

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../../firebseConfig"; // adjust path if needed

// ── Types ─────────────────────────────────────────────────────────────────────
export type UserRole =
  | "superadmin"
  | "company"
  | "worker"
  | "client"
  | "funding_recipient";

export interface UserDoc {
  uid:           string;
  email:         string;
  displayName:   string;
  role:          UserRole;
  status:        "active" | "approved" | "pending" | "suspended" | "rejected";
  companyId:     string | null;
  walletAddress: string | null;
  anonymousMode: boolean;
  createdAt:     ReturnType<typeof serverTimestamp> | Date;
  lastLoginAt:   ReturnType<typeof serverTimestamp> | Date;
  photoURL:      string | null;
}

// ── Admin email list ──────────────────────────────────────────────────────────
// Reads from NEXT_PUBLIC_ADMIN_EMAILS (comma-separated).
// Example .env.local:
//   NEXT_PUBLIC_ADMIN_EMAILS=alice@jmqafri.org,bob@jmqafri.org
//
// IMPORTANT: This is a client-readable env var — it only controls
// Firestore doc creation, NOT the actual admin route access.
// The real security gate is /api/admin/verify (server-side, not exposed).

function getAdminEmails(): Set<string> {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
}

// ── Main function ─────────────────────────────────────────────────────────────
export async function ensureUserDoc(user: User): Promise<UserDoc | null> {
  const ref  = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  // ── Doc already exists — just update lastLoginAt and return ───────────────
  if (snap.exists()) {
    const existing = snap.data() as UserDoc;

    // Always freshen the last-login timestamp
    await setDoc(
      ref,
      { lastLoginAt: serverTimestamp() },
      { merge: true }
    );

    return { ...existing, lastLoginAt: new Date() };
  }

  // ── First sign-in — create the doc ────────────────────────────────────────
  const adminEmails = getAdminEmails();
  const emailLower  = (user.email ?? "").toLowerCase();
  const isSuperAdmin = adminEmails.has(emailLower);

  if (!isSuperAdmin) {
    return null;
  }

  const newDoc: UserDoc = {
    uid:           user.uid,
    email:         user.email ?? "",
    displayName:   user.displayName ?? user.email?.split("@")[0] ?? "User",
    role:          "superadmin",
    status:        "active",
    companyId:     null,
    walletAddress: null,
    anonymousMode: false,
    photoURL:      user.photoURL ?? null,
    createdAt:     serverTimestamp(),
    lastLoginAt:   serverTimestamp(),
  };

  await setDoc(ref, newDoc);

  // Return with real Date so callers don't need to handle serverTimestamp
  return {
    ...newDoc,
    createdAt:   new Date(),
    lastLoginAt: new Date(),
  };
}

// ── Route helper (shared with signin page) ────────────────────────────────────
export function roleToRoute(role: UserRole | string | undefined, fallback = "/dashboard"): string {
  switch (role) {
    case "superadmin":          return "/admin";
    case "company":             return "/dashboard";
    case "worker":              return "/dashboard";
    case "client":              return "/dashboard";
    case "funding_recipient":   return "/dashboard";
    default:                    return fallback;
  }
}
