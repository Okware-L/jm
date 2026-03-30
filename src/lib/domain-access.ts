"use client";

import type { UserRole } from "./auth";
import type {
  ClientRecord,
  CompanyMembershipRecord,
  CompanyRecord,
  DocumentAccessRecord,
  DocumentRecord,
  WorkerRecord,
} from "./platform";

export type PlatformRole = "company_user" | "client" | "superadmin" | "funding_recipient" | null;
export type OrgMembershipRole = "org:admin" | "org:worker" | null;

interface ProfileLike {
  uid: string;
  platformRole?: PlatformRole;
  orgRole?: OrgMembershipRole;
  companyId?: string;
  entityId?: string;
  clerkOrganizationId?: string | null;
}

interface BundleLike {
  companies: CompanyRecord[];
  companyMemberships: CompanyMembershipRecord[];
  workers: WorkerRecord[];
  clients: ClientRecord[];
  documentAccess: DocumentAccessRecord[];
}

export function deriveEffectiveUserRole(
  platformRole: PlatformRole,
  orgRole: OrgMembershipRole
): UserRole {
  if (platformRole === "superadmin") return "superadmin";
  if (platformRole === "client") return "client";
  if (platformRole === "funding_recipient") return "funding_recipient";
  if (platformRole === "company_user" && orgRole === "org:admin") return "company_admin";
  if (platformRole === "company_user" && orgRole === "org:worker") return "worker";
  return null;
}

export function normalizePlatformRole(value: string | null | undefined): PlatformRole {
  switch (value) {
    case "company_user":
      return "company_user";
    case "client":
      return "client";
    case "superadmin":
      return "superadmin";
    case "funding_recipient":
      return "funding_recipient";
    case "company_admin":
    case "worker":
      return "company_user";
    default:
      return null;
  }
}

export function normalizeOrgRole(value: string | null | undefined): OrgMembershipRole {
  switch (value) {
    case "org:admin":
    case "company_admin":
      return "org:admin";
    case "org:worker":
    case "worker":
      return "org:worker";
    default:
      return null;
  }
}

export function getCompanyMembership(
  profile: ProfileLike,
  bundle: BundleLike
): CompanyMembershipRecord | null {
  const membership =
    bundle.companyMemberships.find(
      (item) =>
        Boolean(item.userId) &&
        item.userId === profile.uid &&
        item.status === "active" &&
        (!profile.companyId || item.companyId === profile.companyId)
    ) ||
    bundle.companyMemberships.find(
      (item) =>
        Boolean(profile.clerkOrganizationId) &&
        item.clerkOrganizationId === profile.clerkOrganizationId &&
        item.status === "active" &&
        item.userId === profile.uid
    ) ||
    null;

  return membership;
}

export function resolveActiveCompany(
  profile: ProfileLike,
  bundle: BundleLike
): CompanyRecord | null {
  const membership = getCompanyMembership(profile, bundle);
  const companyId = membership?.companyId || profile.companyId || null;

  if (!companyId) return null;

  return (
    bundle.companies.find((company) => company.id === companyId) ||
    bundle.companies.find(
      (company) =>
        Boolean(profile.clerkOrganizationId) &&
        company.clerkOrganizationId === profile.clerkOrganizationId
    ) ||
    null
  );
}

export function resolveWorkerProfile(
  profile: ProfileLike,
  bundle: BundleLike
): WorkerRecord | null {
  return (
    bundle.workers.find((worker) => worker.userId === profile.uid) ||
    bundle.workers.find((worker) => worker.id === profile.entityId) ||
    null
  );
}

export function resolveClientProfile(
  profile: ProfileLike,
  bundle: BundleLike
): ClientRecord | null {
  return bundle.clients.find((client) => client.userId === profile.uid) || null;
}

export function assertCompanyScope(
  profile: ProfileLike,
  companyId: string | null | undefined
): string {
  if (!companyId) {
    throw new Error("A company scope is required for this action.");
  }

  if (profile.platformRole === "superadmin") {
    return companyId;
  }

  if (profile.companyId && profile.companyId !== companyId) {
    throw new Error("This action is outside the active company scope.");
  }

  return companyId;
}

export function assertWorkerAssignment(
  bundle: BundleLike,
  workerId: string | null | undefined,
  clientId: string | null | undefined
) {
  if (!workerId || !clientId) {
    throw new Error("Both a worker and client assignment are required.");
  }

  const worker = bundle.workers.find((item) => item.id === workerId);
  const client = bundle.clients.find((item) => item.userId === clientId);

  if (!worker || !client) {
    throw new Error("The worker or client record could not be found.");
  }

  if (client.companyId && client.companyId !== worker.companyId) {
    throw new Error("Worker and client are not in the same company scope.");
  }

  return { worker, client };
}

export function canAccessDocument(
  profile: ProfileLike,
  document: DocumentRecord,
  bundle: BundleLike
) {
  if (profile.platformRole === "superadmin") {
    return true;
  }

  if (profile.platformRole === "client" && document.clientId === profile.uid) {
    return true;
  }

  if (profile.platformRole === "funding_recipient" && document.ownerType === "funding" && document.ownerId === profile.uid) {
    return true;
  }

  if (profile.platformRole === "company_user" && profile.companyId && document.companyId === profile.companyId) {
    return true;
  }

  const explicitAccess = bundle.documentAccess.some(
    (access) =>
      access.documentId === document.id &&
      access.userId === profile.uid &&
      access.status === "active"
  );

  return explicitAccess;
}
