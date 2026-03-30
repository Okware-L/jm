"use client";

import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import type { UserProfile } from "./auth";
import {
  assertWorkerAssignment,
  deriveEffectiveUserRole,
  normalizeOrgRole,
  normalizePlatformRole,
} from "./domain-access";
import { db } from "../../firebseConfig";

export const INDUSTRY_OPTIONS = [
  "Agriculture",
  "Healthcare",
  "Technology",
  "Finance",
  "Construction",
  "Education",
  "Manufacturing",
  "Retail",
  "Transportation",
  "Energy",
  "Hospitality",
  "Creative",
  "Other",
] as const;

export interface CompanyRegistrationInput {
  uid: string;
  email: string;
  displayName: string;
  clerkOrganizationId: string;
  companyName: string;
  registrationNumber: string;
  industry: string;
  description: string;
  employees: string;
  founded: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  country: string;
  fundingNeeds: string;
  fundingAmount: string;
}

export interface ClientRegistrationInput {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
  serviceNeeds: string[];
  description: string;
}

export interface FundingRegistrationInput {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
  idType: string;
  idNumber: string;
  investmentBackground: string;
  yieldPreference: string;
  fundingSectors: string[];
  initialStakeAmount: string;
  sourceOfFunds: string;
}

export interface CompanyRecord {
  id: string;
  clerkOrganizationId: string | null;
  name: string;
  registrationNumber: string;
  industry: string;
  description: string;
  employees: string;
  founded: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  country: string;
  fundingNeeds: string;
  fundingAmount: string;
  status: "active" | "inactive" | "archived";
  companyAdminId: string | null;
  workerCount: number;
  clientCount: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CompanyMembershipRecord {
  id: string;
  companyId: string;
  userId: string | null;
  inviteEmail: string | null;
  clerkOrganizationId: string | null;
  orgRole: "org:admin" | "org:worker";
  invitedByUserId?: string | null;
  claimedAt?: Timestamp | null;
  role: "company_admin" | "worker";
  status: "active" | "inactive" | "pending";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface WorkerRecord {
  id: string;
  membershipId?: string | null;
  userId: string | null;
  companyId: string;
  clerkOrganizationId: string | null;
  displayName: string;
  email: string;
  title: string;
  assignedClientIds: string[];
  anonymityEnabled: boolean;
  inviteStatus: "pending" | "accepted";
  status: "active" | "inactive" | "pending";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ClientRecord {
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  serviceNeeds: string[];
  description: string;
  companyId: string | null;
  assignedWorkerId: string | null;
  status: "active" | "inactive" | "pending";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface FundingRecipientRecord {
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  idType: string;
  idNumber: string;
  investmentBackground: string;
  yieldPreference: string;
  fundingSectors: string[];
  initialStakeAmount: string;
  sourceOfFunds: string;
  walletAddress: string | null;
  stakedAmount: number;
  totalEarned: number;
  status: "active" | "inactive" | "pending";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface DocumentRecord {
  id: string;
  title: string;
  documentType: string;
  storagePath: string | null;
  uploadedByUserId: string | null;
  ownerType: "company" | "client" | "funding";
  ownerId: string;
  requestId?: string | null;
  companyId?: string | null;
  clientId?: string | null;
  workerId?: string | null;
  visibility: "private" | "company" | "shared" | "signature";
  version: number;
  linkedEntityType?: "company" | "client" | "funding_recipient" | "request" | "diligence_case" | "diligence_item" | null;
  linkedEntityId?: string | null;
  status: "draft" | "requested" | "uploaded" | "in_review" | "approved" | "rejected" | "signed" | "archived" | "completed";
  updatedAt?: Timestamp;
  createdAt?: Timestamp;
}

export interface DocumentRequestRecord {
  id: string;
  documentType: string;
  title: string;
  description: string;
  requestedFromType: "company" | "client" | "funding_recipient";
  requestedFromId: string;
  companyId: string | null;
  clientId: string | null;
  workerId: string | null;
  caseType: string;
  caseId: string | null;
  requestedByUserId: string;
  assignedReviewerUserId: string | null;
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "submitted" | "under_review" | "approved" | "rejected" | "cancelled";
  dueAt?: Timestamp | null;
  fulfilledByDocumentId: string | null;
  reviewNotes: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface DueDiligenceTaskRecord {
  id: string;
  companyId: string;
  ownerWorkerId: string;
  task: string;
  priority: "low" | "medium" | "high";
  status: "queued" | "in_review" | "flagged" | "complete";
  dueLabel?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface DueDiligenceCaseRecord {
  id: string;
  companyId: string;
  clientId: string | null;
  fundingRecipientId: string | null;
  assignedWorkerId: string | null;
  title: string;
  description: string;
  caseType: string;
  status: "open" | "collecting" | "reviewing" | "approved" | "rejected" | "closed";
  openedByUserId: string;
  outcomeSummary: string | null;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface DueDiligenceItemRecord {
  id: string;
  caseId: string;
  companyId: string;
  clientId: string | null;
  workerId: string | null;
  title: string;
  description: string;
  status: "pending" | "requested" | "uploaded" | "in_review" | "approved" | "rejected" | "waived";
  requiredDocumentType: string | null;
  documentRequestId: string | null;
  documentId: string | null;
  priority: "low" | "medium" | "high" | "critical";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface DocumentReviewRecord {
  id: string;
  documentId: string;
  documentRequestId: string | null;
  diligenceCaseId: string | null;
  reviewerUserId: string;
  reviewerRole: "worker" | "company_admin" | "superadmin";
  status: "approved" | "rejected" | "needs_changes" | "flagged";
  notes: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface DocumentAccessRecord {
  id: string;
  documentId: string;
  userId: string | null;
  companyId: string | null;
  accessRole: "owner" | "viewer" | "reviewer" | "signer";
  status: "active" | "revoked";
  grantedByUserId: string | null;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface DocumentSignatureRecord {
  id: string;
  documentId: string;
  signerUserId: string | null;
  signerEmail: string;
  signingOrder: number;
  status: "pending" | "sent" | "viewed" | "signed" | "declined" | "expired";
  signedAt?: Timestamp | null;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface AuditLogRecord {
  id: string;
  actorUserId: string | null;
  action: string;
  entityType: string;
  entityId: string;
  companyId: string | null;
  metadata: Record<string, string | number | boolean | null>;
  createdAt?: Timestamp;
}

export interface CreateDocumentInput {
  title: string;
  documentType?: string;
  storagePath?: string | null;
  uploadedByUserId?: string | null;
  ownerType: "company" | "client" | "funding";
  ownerId: string;
  requestId?: string | null;
  companyId?: string | null;
  clientId?: string | null;
  workerId?: string | null;
  visibility?: DocumentRecord["visibility"];
  linkedEntityType?: DocumentRecord["linkedEntityType"];
  linkedEntityId?: string | null;
  status?: DocumentRecord["status"];
}

export interface CreateDocumentRequestInput {
  title: string;
  description: string;
  documentType: string;
  requestedFromType: "company" | "client" | "funding_recipient";
  requestedFromId: string;
  companyId: string | null;
  clientId: string | null;
  workerId: string | null;
  caseType: string;
  caseId?: string | null;
  requestedByUserId: string;
  assignedReviewerUserId?: string | null;
  priority: "low" | "medium" | "high" | "critical";
  dueAt?: Timestamp | null;
}

export interface CreateWorkerInput {
  companyId: string;
  clerkOrganizationId: string | null;
  displayName: string;
  email: string;
  title: string;
  anonymityEnabled?: boolean;
}

export interface AssignClientInput {
  companyId: string;
  clientIdentifier: string;
  workerIdentifier: string;
}

interface AuditLogInput {
  actorUserId: string | null;
  action: string;
  entityType: string;
  entityId: string;
  companyId?: string | null;
  metadata?: Record<string, string | number | boolean | null>;
}

export async function ensurePlatformBootstrap() {
  const platformRef = doc(db, "platform_meta", "core");
  const platformSnap = await getDoc(platformRef);

  if (!platformSnap.exists()) {
    await setDoc(platformRef, {
      initializedAt: serverTimestamp(),
      version: 1,
      name: "Community Hub Platform",
    });
  }

  const industryCollectionRef = doc(db, "industries", "catalog");
  const industrySnap = await getDoc(industryCollectionRef);

  if (!industrySnap.exists()) {
    await setDoc(industryCollectionRef, {
      items: INDUSTRY_OPTIONS,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  const schemaRef = doc(db, "platform_meta", "workspace_schema_v1");
  const schemaSnap = await getDoc(schemaRef);

  if (!schemaSnap.exists()) {
    await setDoc(schemaRef, {
      collections: {
        users: {
          required: ["email", "displayName", "platformRole", "status"],
        },
        companies: {
          required: ["name", "registrationNumber", "industry", "status", "companyAdminId", "clerkOrganizationId"],
        },
        companyMemberships: {
          required: ["companyId", "orgRole", "clerkOrganizationId", "status"],
        },
        workers: {
          required: ["companyId", "displayName", "email", "title", "status"],
        },
        clients: {
          required: ["displayName", "email", "serviceNeeds", "status"],
        },
        fundingRecipients: {
          required: ["displayName", "yieldPreference", "stakedAmount", "status"],
        },
        documents: {
          required: ["title", "documentType", "ownerType", "ownerId", "visibility", "version", "status"],
        },
        dueDiligenceTasks: {
          required: ["companyId", "ownerWorkerId", "task", "priority", "status"],
        },
        documentRequests: {
          required: ["title", "documentType", "requestedFromType", "requestedFromId", "status"],
        },
        dueDiligenceCases: {
          required: ["companyId", "title", "caseType", "status", "openedByUserId"],
        },
        dueDiligenceItems: {
          required: ["caseId", "companyId", "title", "status", "priority"],
        },
        documentReviews: {
          required: ["documentId", "reviewerUserId", "reviewerRole", "status"],
        },
        documentAccess: {
          required: ["documentId", "accessRole", "status"],
        },
        documentSignatures: {
          required: ["documentId", "signerEmail", "signingOrder", "status"],
        },
        auditLogs: {
          required: ["action", "entityType", "entityId"],
        },
      },
      updatedAt: serverTimestamp(),
    });
  }
}

function buildCanonicalRole(input: {
  platformRole?: string | null;
  orgRole?: string | null;
  role?: string | null;
}) {
  const platformRole = normalizePlatformRole(input.platformRole ?? input.role);
  const orgRole = normalizeOrgRole(input.orgRole ?? input.role);
  const role = deriveEffectiveUserRole(platformRole, orgRole);

  return {
    platformRole,
    orgRole,
    role,
  };
}

async function recordAuditLog(input: AuditLogInput) {
  const auditRef = doc(collection(db, "auditLogs"));

  await setDoc(auditRef, {
    id: auditRef.id,
    actorUserId: input.actorUserId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    companyId: input.companyId ?? null,
    metadata: input.metadata ?? {},
    createdAt: Timestamp.now(),
  });
}

export async function upsertUserProfile(
  uid: string,
  data: Omit<UserProfile, "uid" | "createdAt" | "updatedAt">
) {
  await ensurePlatformBootstrap();
  const canonicalRole = buildCanonicalRole({
    platformRole: data.platformRole,
    orgRole: data.orgRole,
    role: data.role,
  });

  await setDoc(
    doc(db, "users", uid),
    {
      ...data,
      ...canonicalRole,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      lastLoginAt: Timestamp.now(),
    },
    { merge: true }
  );
}

export async function createCompanyAdminAccount(input: CompanyRegistrationInput) {
  await ensurePlatformBootstrap();

  const companyRef = doc(collection(db, "companies"));
  const membershipRef = doc(db, "companyMemberships", `${companyRef.id}_${input.uid}`);

  await setDoc(companyRef, {
    id: companyRef.id,
    clerkOrganizationId: input.clerkOrganizationId,
    name: input.companyName,
    registrationNumber: input.registrationNumber,
    industry: input.industry,
    description: input.description,
    employees: input.employees,
    founded: input.founded,
    email: input.email,
    phone: input.phone,
    website: input.website,
    address: input.address,
    city: input.city,
    country: input.country,
    fundingNeeds: input.fundingNeeds,
    fundingAmount: input.fundingAmount,
    status: "active",
    companyAdminId: input.uid,
    workerCount: 0,
    clientCount: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  await setDoc(membershipRef, {
    id: membershipRef.id,
    companyId: companyRef.id,
    userId: input.uid,
    inviteEmail: input.email,
    clerkOrganizationId: input.clerkOrganizationId,
    orgRole: "org:admin",
    invitedByUserId: input.uid,
    claimedAt: Timestamp.now(),
    role: "company_admin",
    status: "active",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  await upsertUserProfile(input.uid, {
    email: input.email,
    displayName: input.displayName,
    platformRole: "company_user",
    orgRole: "org:admin",
    role: "company_admin",
    status: "active",
    companyId: companyRef.id,
    entityId: companyRef.id,
    clerkOrganizationId: input.clerkOrganizationId,
    companyName: input.companyName,
    registrationNumber: input.registrationNumber,
    industry: input.industry,
    photoURL: "",
  });

  await recordAuditLog({
    actorUserId: input.uid,
    action: "company.created",
    entityType: "company",
    entityId: companyRef.id,
    companyId: companyRef.id,
    metadata: {
      companyName: input.companyName,
      clerkOrganizationId: input.clerkOrganizationId,
    },
  });

  return companyRef.id;
}

export async function createClientAccount(input: ClientRegistrationInput) {
  await ensurePlatformBootstrap();

  await setDoc(doc(db, "clients", input.uid), {
    userId: input.uid,
    firstName: input.firstName,
    lastName: input.lastName,
    displayName: input.displayName,
    email: input.email,
    phone: input.phone,
    city: input.city,
    country: input.country,
    serviceNeeds: input.serviceNeeds,
    description: input.description,
    companyId: null,
    assignedWorkerId: null,
    status: "active",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  await upsertUserProfile(input.uid, {
    email: input.email,
    displayName: input.displayName,
    platformRole: "client",
    orgRole: null,
    role: "client",
    status: "active",
    entityId: input.uid,
    clerkOrganizationId: null,
    photoURL: "",
  });

  await recordAuditLog({
    actorUserId: input.uid,
    action: "client.created",
    entityType: "client",
    entityId: input.uid,
    metadata: {
      email: input.email,
      serviceCount: input.serviceNeeds.length,
    },
  });
}

export async function createFundingRecipientAccount(input: FundingRegistrationInput) {
  await ensurePlatformBootstrap();

  await setDoc(doc(db, "fundingRecipients", input.uid), {
    userId: input.uid,
    firstName: input.firstName,
    lastName: input.lastName,
    displayName: input.displayName,
    email: input.email,
    phone: input.phone,
    city: input.city,
    country: input.country,
    idType: input.idType,
    idNumber: input.idNumber,
    investmentBackground: input.investmentBackground,
    yieldPreference: input.yieldPreference,
    fundingSectors: input.fundingSectors,
    initialStakeAmount: input.initialStakeAmount,
    sourceOfFunds: input.sourceOfFunds,
    walletAddress: null,
    stakedAmount: 0,
    totalEarned: 0,
    status: "active",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  await upsertUserProfile(input.uid, {
    email: input.email,
    displayName: input.displayName,
    platformRole: "funding_recipient",
    orgRole: null,
    role: "funding_recipient",
    status: "active",
    entityId: input.uid,
    clerkOrganizationId: null,
    photoURL: "",
  });

  await recordAuditLog({
    actorUserId: input.uid,
    action: "funding_recipient.created",
    entityType: "fundingRecipient",
    entityId: input.uid,
    metadata: {
      email: input.email,
      yieldPreference: input.yieldPreference,
    },
  });
}

export async function createDocumentRecord(input: CreateDocumentInput) {
  await ensurePlatformBootstrap();

  const documentRef = doc(collection(db, "documents"));
  const timestamp = Timestamp.now();

  await setDoc(documentRef, {
    id: documentRef.id,
    title: input.title,
    documentType: input.documentType ?? "general",
    storagePath: input.storagePath ?? null,
    uploadedByUserId: input.uploadedByUserId ?? null,
    ownerType: input.ownerType,
    ownerId: input.ownerId,
    requestId: input.requestId ?? null,
    companyId: input.companyId ?? null,
    clientId: input.clientId ?? null,
    workerId: input.workerId ?? null,
    visibility: input.visibility ?? "private",
    version: 1,
    linkedEntityType: input.linkedEntityType ?? null,
    linkedEntityId: input.linkedEntityId ?? null,
    status: input.status ?? "uploaded",
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  await setDoc(doc(db, "documentAccess", `${documentRef.id}_${input.ownerId}`), {
    id: `${documentRef.id}_${input.ownerId}`,
    documentId: documentRef.id,
    userId: input.uploadedByUserId ?? null,
    companyId: input.companyId ?? null,
    accessRole: "owner",
    status: "active",
    grantedByUserId: input.uploadedByUserId ?? null,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  if (input.requestId) {
    const requestRef = doc(db, "documentRequests", input.requestId);
    const requestSnap = await getDoc(requestRef);

    if (requestSnap.exists()) {
      await updateDoc(requestRef, {
        status: "submitted",
        fulfilledByDocumentId: documentRef.id,
        updatedAt: timestamp,
      });
    }
  }

  await recordAuditLog({
    actorUserId: input.uploadedByUserId ?? null,
    action: "document.created",
    entityType: "document",
    entityId: documentRef.id,
    companyId: input.companyId ?? null,
    metadata: {
      ownerType: input.ownerType,
      ownerId: input.ownerId,
      documentType: input.documentType ?? "general",
    },
  });

  return documentRef.id;
}

export async function createDocumentRequest(input: CreateDocumentRequestInput) {
  await ensurePlatformBootstrap();

  const requestRef = doc(collection(db, "documentRequests"));
  const timestamp = Timestamp.now();

  await setDoc(requestRef, {
    id: requestRef.id,
    documentType: input.documentType,
    title: input.title,
    description: input.description,
    requestedFromType: input.requestedFromType,
    requestedFromId: input.requestedFromId,
    companyId: input.companyId,
    clientId: input.clientId,
    workerId: input.workerId,
    caseType: input.caseType,
    caseId: input.caseId ?? null,
    requestedByUserId: input.requestedByUserId,
    assignedReviewerUserId: input.assignedReviewerUserId ?? null,
    priority: input.priority,
    status: "open",
    dueAt: input.dueAt ?? null,
    fulfilledByDocumentId: null,
    reviewNotes: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  await recordAuditLog({
    actorUserId: input.requestedByUserId,
    action: "document_request.created",
    entityType: "documentRequest",
    entityId: requestRef.id,
    companyId: input.companyId ?? null,
    metadata: {
      requestedFromType: input.requestedFromType,
      requestedFromId: input.requestedFromId,
      documentType: input.documentType,
      caseType: input.caseType,
    },
  });

  return requestRef.id;
}

export async function createCompanyWorker(input: CreateWorkerInput) {
  await ensurePlatformBootstrap();

  const companyRef = doc(db, "companies", input.companyId);
  const companySnap = await getDoc(companyRef);

  if (!companySnap.exists()) {
    throw new Error("Company record not found for this workspace.");
  }

  const workerRef = doc(collection(db, "workers"));
  const membershipRef = doc(db, "companyMemberships", `${input.companyId}_${workerRef.id}`);
  const timestamp = Timestamp.now();

  await setDoc(workerRef, {
    id: workerRef.id,
    membershipId: membershipRef.id,
    userId: null,
    companyId: input.companyId,
    clerkOrganizationId: input.clerkOrganizationId ?? null,
    displayName: input.displayName,
    email: input.email,
    title: input.title,
    assignedClientIds: [],
    anonymityEnabled: Boolean(input.anonymityEnabled),
    inviteStatus: "pending",
    status: "pending",
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  await setDoc(membershipRef, {
    id: membershipRef.id,
    companyId: input.companyId,
    userId: null,
    inviteEmail: input.email,
    clerkOrganizationId: input.clerkOrganizationId ?? null,
    orgRole: "org:worker",
    invitedByUserId: null,
    claimedAt: null,
    role: "worker",
    status: "pending",
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  await updateDoc(companyRef, {
    workerCount: increment(1),
    updatedAt: timestamp,
  });

  await recordAuditLog({
    actorUserId: null,
    action: "worker.provisioned",
    entityType: "worker",
    entityId: workerRef.id,
    companyId: input.companyId,
    metadata: {
      email: input.email,
      title: input.title,
      clerkOrganizationLinked: Boolean(input.clerkOrganizationId),
    },
  });

  return {
    workerId: workerRef.id,
  };
}

export async function assignClientToWorker(input: AssignClientInput) {
  await ensurePlatformBootstrap();

  const clientIdentifier = input.clientIdentifier.trim().toLowerCase();
  const workerIdentifier = input.workerIdentifier.trim().toLowerCase();

  if (!clientIdentifier || !workerIdentifier) {
    throw new Error("Both a client and worker identifier are required.");
  }

  const [clientSnapshot, workerSnapshot] = await Promise.all([
    getDocs(collection(db, "clients")),
    getDocs(query(collection(db, "workers"), where("companyId", "==", input.companyId))),
  ]);

  const clientDoc = clientSnapshot.docs.find((item) => {
    const data = item.data() as ClientRecord;
    return [item.id, data.userId, data.email, data.displayName]
      .filter(Boolean)
      .some((value) => String(value).trim().toLowerCase() === clientIdentifier);
  });

  if (!clientDoc) {
    throw new Error("No client matched that identifier.");
  }

  const workerDoc = workerSnapshot.docs.find((item) => {
    const data = item.data() as WorkerRecord;
    return [item.id, data.userId, data.displayName, data.title, data.email]
      .filter(Boolean)
      .some((value) => String(value).trim().toLowerCase() === workerIdentifier);
  });

  if (!workerDoc) {
    throw new Error("No worker matched that identifier inside this company.");
  }

  const clientData = clientDoc.data() as ClientRecord;
  const workerData = workerDoc.data() as WorkerRecord;
  assertWorkerAssignment(
    {
      companies: [],
      companyMemberships: [],
      workers: [{ ...workerData, id: workerDoc.id }],
      clients: [{ ...clientData, userId: clientData.userId }],
      documentAccess: [],
    },
    workerDoc.id,
    clientData.userId
  );
  const timestamp = Timestamp.now();
  const clientWasUnassigned = !clientData.companyId;
  const previousWorkerId = clientData.assignedWorkerId;

  await updateDoc(doc(db, "clients", clientDoc.id), {
    companyId: input.companyId,
    assignedWorkerId: workerDoc.id,
    status: "active",
    updatedAt: timestamp,
  });

  await updateDoc(doc(db, "workers", workerDoc.id), {
    assignedClientIds: arrayUnion(clientData.userId),
    updatedAt: timestamp,
  });

  if (previousWorkerId && previousWorkerId !== workerDoc.id) {
    const previousWorkerRef = doc(db, "workers", previousWorkerId);
    const previousWorkerSnap = await getDoc(previousWorkerRef);

    if (previousWorkerSnap.exists()) {
      const previousWorkerData = previousWorkerSnap.data() as WorkerRecord;
      await updateDoc(previousWorkerRef, {
        assignedClientIds: previousWorkerData.assignedClientIds.filter(
          (clientId) => clientId !== clientData.userId
        ),
        updatedAt: timestamp,
      });
    }
  }

  if (clientWasUnassigned || clientData.companyId !== input.companyId) {
    await updateDoc(doc(db, "companies", input.companyId), {
      clientCount: increment(1),
      updatedAt: timestamp,
    });
  } else {
    await updateDoc(doc(db, "companies", input.companyId), {
      updatedAt: timestamp,
    });
  }

  await recordAuditLog({
    actorUserId: null,
    action: "client.assigned",
    entityType: "client",
    entityId: clientDoc.id,
    companyId: input.companyId,
    metadata: {
      workerId: workerDoc.id,
      workerName: workerData.displayName,
    },
  });

  return {
    clientId: clientDoc.id,
    clientName: clientData.displayName,
    workerId: workerDoc.id,
    workerName: workerData.displayName,
  };
}
