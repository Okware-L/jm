"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebseConfig";
import { ensurePlatformBootstrap } from "./platform";
import type {
  AuditLogRecord,
  ClientRecord,
  CompanyMembershipRecord,
  CompanyRecord,
  DocumentAccessRecord,
  DocumentRecord,
  DocumentRequestRecord,
  DocumentReviewRecord,
  DocumentSignatureRecord,
  DueDiligenceCaseRecord,
  DueDiligenceItemRecord,
  DueDiligenceTaskRecord,
  FundingRecipientRecord,
  WorkerRecord,
} from "./platform";

export interface FirestoreBundle {
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

export async function readPlatformBundle(): Promise<FirestoreBundle> {
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
