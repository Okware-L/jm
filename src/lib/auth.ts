import { useEffect, useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, getDocs, query, where, type Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  deriveEffectiveUserRole,
  normalizeOrgRole,
  normalizePlatformRole,
} from "./domain-access";
import { db } from "../../firebseConfig";
import { ensureUserDoc } from "./Ensureuserdoc";

export type UserRole =
  | "company_admin"
  | "worker"
  | "client"
  | "superadmin"
  | "funding_recipient"
  | null;

export type PlatformRole = "company_user" | "client" | "superadmin" | "funding_recipient" | null;
export type OrgMembershipRole = "org:admin" | "org:worker" | null;

export type UserStatus =
  | "active"
  | "registered"
  | "pending"
  | "approved"
  | "rejected"
  | "suspended"
  | null;

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  platformRole?: PlatformRole;
  orgRole?: OrgMembershipRole;
  status: UserStatus;
  companyId?: string;
  entityId?: string;
  clerkOrganizationId?: string | null;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  companyName?: string;
  registrationNumber?: string;
  industry?: string;
}

export type AuthState =
  | "loading"
  | "unauthenticated"
  | "no_profile"
  | "active"
  | "registered"
  | "pending"
  | "approved"
  | "rejected"
  | "suspended";

// ── Core hooks ────────────────────────────────────────────────────────────────

export function useAuthState() {
  const [state, setState] = useState<AuthState>("loading");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { isLoaded, isSignedIn, orgId, orgRole } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isLoaded) {
        if (!cancelled) {
          setState("loading");
        }
        return;
      }

      if (!isSignedIn || !user) {
        if (!cancelled) {
          setState("unauthenticated");
          setProfile(null);
        }
        return;
      }

      await ensureUserDoc({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress || "",
        displayName: user.fullName,
        imageUrl: user.imageUrl,
      });

      const snap = await getDoc(doc(db, "users", user.id));
      if (!snap.exists()) {
        if (!cancelled) {
          setState("no_profile");
          setProfile(null);
        }
        return;
      }
      const data = snap.data() as Partial<UserProfile> & {
        role?: string | null;
        platformRole?: string | null;
        orgRole?: string | null;
        clerkOrganizationId?: string | null;
      };
      const platformRole = normalizePlatformRole(data.platformRole ?? data.role);
      const membershipRole = normalizeOrgRole(orgRole ?? data.orgRole ?? data.role);

      let resolvedCompanyId = data.companyId;

      if (orgId) {
        const companySnapshot = await getDocs(
          query(collection(db, "companies"), where("clerkOrganizationId", "==", orgId))
        );

        const activeCompany = companySnapshot.docs[0]?.data() as { id?: string } | undefined;
        resolvedCompanyId = activeCompany?.id || resolvedCompanyId;
      }

      const normalizedProfile: UserProfile = {
        uid: user.id,
        email: data.email || user.primaryEmailAddress?.emailAddress || "",
        displayName: data.displayName || user.fullName || user.username || "User",
        photoURL: data.photoURL || user.imageUrl || undefined,
        role: deriveEffectiveUserRole(platformRole, membershipRole),
        platformRole,
        orgRole: membershipRole,
        status: (data.status as UserStatus) ?? "active",
        companyId: resolvedCompanyId,
        entityId: data.entityId,
        clerkOrganizationId: orgId ?? data.clerkOrganizationId ?? null,
        createdAt: (data.createdAt as Timestamp | null) ?? null,
        updatedAt: (data.updatedAt as Timestamp | null) ?? null,
        companyName: data.companyName,
        registrationNumber: data.registrationNumber,
        industry: data.industry,
      };

      if (!cancelled) {
        setProfile(normalizedProfile);
        setState((normalizedProfile.status as AuthState) ?? "active");
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, orgId, orgRole, user]);

  return { state, user, profile };
}

export function useRequireAuth() {
  const { state, user, profile } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (state === "loading") return;
    if (state === "unauthenticated") { router.replace("/signin"); return; }
    if (state === "no_profile")      { router.replace("/register"); return; }
  }, [state, router]);

  return { state, user, profile };
}

export function useRequireRole(allowedRoles: NonNullable<UserRole>[]) {
  const authState = useRequireAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState.state === "loading" || !authState.profile) return;
    const effectiveRole = authState.profile.role;

    if (!effectiveRole || !allowedRoles.includes(effectiveRole as NonNullable<UserRole>)) {
      router.replace("/dashboard");
    }
  }, [allowedRoles, authState.profile, authState.state, router]);

  return authState;
}

export const ROLE_LABELS: Record<NonNullable<UserRole>, string> = {
  company_admin:     "Company Admin",
  worker:            "Account Manager",
  client:            "Client",
  superadmin:        "Superadmin",
  funding_recipient: "Funding Recipient",
};

export function usePlatformSignOut() {
  const { signOut } = useClerk();

  return async () => {
    await signOut({ redirectUrl: "/signin" });
  };
}
