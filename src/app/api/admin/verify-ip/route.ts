// app/api/admin/verify-ip/route.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * ADMIN_IP_ALLOWLIST — add your office/home IPs here.
 * In production, move these to an environment variable:
 *   ADMIN_IP_ALLOWLIST="1.2.3.4,5.6.7.8"
 *
 * To find your current IP: https://api.ipify.org
 */
const ALLOWED_IPS: string[] = (
  process.env.ADMIN_IP_ALLOWLIST ?? ""
)
  .split(",")
  .map((ip) => ip.trim())
  .filter(Boolean);

/**
 * Extracts the real client IP from common proxy headers,
 * falling back to the socket remote address.
 */
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list; take the first (originating) IP
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function GET(req: NextRequest) {
  // If no IPs are configured, fail closed — do NOT allow access.
  if (ALLOWED_IPS.length === 0) {
    console.warn(
      "[admin/verify-ip] ADMIN_IP_ALLOWLIST is empty. " +
      "Set it in your environment variables."
    );
    return NextResponse.json(
      { allowed: false, reason: "IP allowlist not configured." },
      { status: 403 }
    );
  }

  const clientIP = getClientIP(req);
  const allowed = ALLOWED_IPS.includes(clientIP);

  if (!allowed) {
    console.warn(
      `[admin/verify-ip] Blocked IP: ${clientIP}. ` +
      `Allowed: [${ALLOWED_IPS.join(", ")}]`
    );
  }

  return NextResponse.json(
    { allowed, ip: clientIP },
    { status: allowed ? 200 : 403 }
  );
}