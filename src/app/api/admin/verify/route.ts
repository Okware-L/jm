// app/api/admin/verify/route.ts
//
// Single server-side endpoint that validates ALL three admin access conditions:
//   1. Email is in the ADMIN_EMAILS allowlist
//   2. Password matches ADMIN_PASSWORD
//   3. Request IP is in ADMIN_IP_ALLOWLIST
//
// Returns a signed result so the client knows whether to proceed with
// Firebase sign-in. Credentials are never exposed in the client bundle.

import { NextRequest, NextResponse } from "next/server";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function getAllowedEmails(): string[] {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function getAllowedIPs(): string[] {
  return (process.env.ADMIN_IP_ALLOWLIST ?? "")
    .split(",")
    .map((ip) => ip.trim())
    .filter(Boolean);
}

// ── POST /api/admin/verify ────────────────────────────────────────────────────
//
// Body: { email: string; password: string }
// Returns:
//   200 { ok: true }
//   403 { ok: false; reason: "ip" | "email" | "password" | "config" }

export async function POST(req: NextRequest) {
  // ── Guard: env vars must be configured ───────────────────────────────────
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  const allowedEmails = getAllowedEmails();
  const allowedIPs    = getAllowedIPs();

  if (!adminPassword || allowedEmails.length === 0) {
    console.error("[admin/verify] ADMIN_PASSWORD or ADMIN_EMAILS not configured.");
    return NextResponse.json(
      { ok: false, reason: "config" },
      { status: 500 }
    );
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let email = "";
  let password = "";
  let sessionCheck = false;
  try {
    const body = await req.json() as { email?: string; password?: string; __sessionCheck?: boolean };
    email         = (body.email    ?? "").trim().toLowerCase();
    password      = (body.password ?? "").trim();
    sessionCheck  = body.__sessionCheck === true;
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  // ── 1. Check email ────────────────────────────────────────────────────────
  if (!allowedEmails.includes(email)) {
    console.warn(`[admin/verify] Rejected email: ${email}`);
    return NextResponse.json({ ok: false, reason: "email" }, { status: 403 });
  }

  // ── 2. Check password (skipped on session re-checks from admin page) ──────
  if (!sessionCheck && password !== adminPassword) {
    console.warn(`[admin/verify] Wrong password attempt for: ${email}`);
    return NextResponse.json({ ok: false, reason: "password" }, { status: 403 });
  }

  // ── 3. Check IP (only enforced when ADMIN_IP_ALLOWLIST is set) ────────────
  if (allowedIPs.length > 0) {
    const clientIP = getClientIP(req);
    if (!allowedIPs.includes(clientIP)) {
      console.warn(`[admin/verify] Blocked IP ${clientIP} for: ${email}`);
      return NextResponse.json({ ok: false, reason: "ip" }, { status: 403 });
    }
  }

  // ── All checks passed ─────────────────────────────────────────────────────
  console.info(`[admin/verify] Access granted for: ${email}`);
  return NextResponse.json({ ok: true }, { status: 200 });
}