"use client";

import { collection, getDocs } from "firebase/firestore";
import type { UserProfile, UserRole } from "./auth";
import { db } from "../../firebseConfig";
import {
  ensurePlatformBootstrap,
  type ClientRecord,
  type CompanyMembershipRecord,
  type CompanyRecord,
  type DocumentAccessRecord,
  type DocumentRecord,
  type DocumentRequestRecord,
  type DocumentReviewRecord,
  type DocumentSignatureRecord,
  type DueDiligenceCaseRecord,
  type DueDiligenceItemRecord,
  type DueDiligenceTaskRecord,
  type FundingRecipientRecord,
  type WorkerRecord,
  type AuditLogRecord,
} from "./platform";

export type WorkspaceRole = Exclude<UserRole, null>;

export interface DomainBundle {
  companies: CompanyRecord[];
  companyMemberships: CompanyMembershipRecord[];
  workers: WorkerRecord[];
  clients: ClientRecord[];
  fundingRecipients: FundingRecipientRecord[];
  documents: DocumentRecord[];
  documentRequests: DocumentRequestRecord[];
  dueDiligenceTasks: DueDiligenceTaskRecord[];
  dueDiligenceCases: DueDiligenceCaseRecord[];
  dueDiligenceItems: DueDiligenceItemRecord[];
  documentReviews: DocumentReviewRecord[];
  documentAccess: DocumentAccessRecord[];
  documentSignatures: DocumentSignatureRecord[];
  auditLogs: AuditLogRecord[];
}

async function readCollection<T>(name: string): Promise<T[]> {
  const snapshot = await getDocs(collection(db, name));
  return snapshot.docs.map((item) => item.data() as T);
}

export async function readDomainBundle(): Promise<DomainBundle> {
  await ensurePlatformBootstrap();

  const [
    companies,
    companyMemberships,
    workers,
    clients,
    fundingRecipients,
    documents,
    documentRequests,
    dueDiligenceTasks,
    dueDiligenceCases,
    dueDiligenceItems,
    documentReviews,
    documentAccess,
    documentSignatures,
    auditLogs,
  ] = await Promise.all([
    readCollection<CompanyRecord>("companies"),
    readCollection<CompanyMembershipRecord>("companyMemberships"),
    readCollection<WorkerRecord>("workers"),
    readCollection<ClientRecord>("clients"),
    readCollection<FundingRecipientRecord>("fundingRecipients"),
    readCollection<DocumentRecord>("documents"),
    readCollection<DocumentRequestRecord>("documentRequests"),
    readCollection<DueDiligenceTaskRecord>("dueDiligenceTasks"),
    readCollection<DueDiligenceCaseRecord>("dueDiligenceCases"),
    readCollection<DueDiligenceItemRecord>("dueDiligenceItems"),
    readCollection<DocumentReviewRecord>("documentReviews"),
    readCollection<DocumentAccessRecord>("documentAccess"),
    readCollection<DocumentSignatureRecord>("documentSignatures"),
    readCollection<AuditLogRecord>("auditLogs"),
  ]);

  return {
    companies,
    companyMemberships,
    workers,
    clients,
    fundingRecipients,
    documents,
    documentRequests,
    dueDiligenceTasks,
    dueDiligenceCases,
    dueDiligenceItems,
    documentReviews,
    documentAccess,
    documentSignatures,
    auditLogs,
  };
}

export function getCompanyMembership(
  profile: UserProfile,
  bundle: DomainBundle,
  companyId?: string | null
) {
  const scopedCompanyId = companyId || profile.companyId || null;

  if (!scopedCompanyId) {
    return null;
  }

  return (
    bundle.companyMemberships.find(
      (membership) =>
        membership.companyId === scopedCompanyId &&
        (membership.userId === profile.uid || membership.inviteEmail === profile.email)
    ) || null
  );
}

export function resolveActiveCompany(profile: UserProfile, bundle: DomainBundle) {
  const byProfile = profile.companyId
    ? bundle.companies.find((company) => company.id === profile.companyId)
    : null;

  if (byProfile) {
    return byProfile;
  }

  const byMembership = bundle.companyMemberships.find(
    (membership) => membership.userId === profile.uid || membership.inviteEmail === profile.email
  );

  if (byMembership) {
    return bundle.companies.find((company) => company.id === byMembership.companyId) || null;
  }

  if (profile.clerkOrganizationId) {
    return (
      bundle.companies.find(
        (company) => company.clerkOrganizationId === profile.clerkOrganizationId
      ) || null
    );
  }

  return null;
}

export function resolveWorkerRecord(profile: UserProfile, bundle: DomainBundle) {
  return (
    bundle.workers.find((worker) => worker.userId === profile.uid || worker.id === profile.entityId) ||
    null
  );
}

export function resolveClientRecord(profile: UserProfile, bundle: DomainBundle) {
  return bundle.clients.find((client) => client.userId === profile.uid) || null;
}

export function assertCompanyScope(profile: UserProfile, companyId: string, bundle: DomainBundle) {
  const company = bundle.companies.find((item) => item.id === companyId);

  if (!company) {
    throw new Error("Company record not found.");
  }

  if (profile.role === "superadmin") {
    return company;
  }

  const membership = getCompanyMembership(profile, bundle, companyId);

  if (!membership) {
    throw new Error("You do not belong to this company scope.");
  }

  return company;
}

export function assertWorkerAssignment(
  profile: UserProfile,
  workerId: string,
  bundle: DomainBundle
) {
  const worker = bundle.workers.find((item) => item.id === workerId);

  if (!worker) {
    throw new Error("Worker record not found.");
  }

  if (profile.role === "superadmin") {
    return worker;
  }

  if (profile.role === "company_admin") {
    assertCompanyScope(profile, worker.companyId, bundle);
    return worker;
  }

  if (profile.role === "worker" && (worker.userId === profile.uid || worker.id === profile.entityId)) {
    return worker;
  }

  throw new Error("You do not have access to this worker assignment.");
}

export function canAccessDocument(profile: UserProfile, document: DocumentRecord, bundle: DomainBundle) {
  if (profile.role === "superadmin") {
    return true;
  }

  if (profile.role === "company_admin") {
    return Boolean(
      document.companyId && getCompanyMembership(profile, bundle, document.companyId)
    );
  }

  if (profile.role === "worker") {
    const worker = resolveWorkerRecord(profile, bundle);

    if (!worker) {
      return false;
    }

    if (document.workerId && document.workerId === worker.id) {
      return true;
    }

    return Boolean(document.companyId && worker.companyId === document.companyId);
  }

  if (profile.role === "client") {
    return document.clientId === profile.uid || (document.ownerType === "client" && document.ownerId === profile.uid);
  }

  if (profile.role === "funding_recipient") {
    return document.ownerType === "funding" && document.ownerId === profile.uid;
  }

  return false;
}
