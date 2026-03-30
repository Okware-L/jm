"use client";

import { useCallback, useEffect, useState } from "react";
import { type Timestamp } from "firebase/firestore";
import type { UserProfile, UserRole } from "./auth";
import {
  canAccessDocument,
  resolveActiveCompany,
  resolveClientProfile,
  resolveWorkerProfile,
} from "./domain-access";
import { type FirestoreBundle, readPlatformBundle } from "./domain-service";
import {
  type DocumentRecord,
  type DocumentRequestRecord,
  type DueDiligenceTaskRecord,
} from "./platform";
import { getWorkspaceMockData, type WorkspaceMockData } from "./mock-data";

type WorkspaceRole = Exclude<UserRole, null>;

function formatTimestamp(value?: Timestamp | null) {
  if (!value) return "Not yet updated";

  try {
    return value.toDate().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "Recently updated";
  }
}

function labelize(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function hasWorkspaceData(role: WorkspaceRole, profile: UserProfile, bundle: FirestoreBundle) {
  if (
    bundle.companies.length === 0 &&
    bundle.companyMemberships.length === 0 &&
    bundle.workers.length === 0 &&
    bundle.clients.length === 0 &&
    bundle.fundingRecipients.length === 0 &&
    bundle.documents.length === 0 &&
    bundle.documentRequests.length === 0 &&
    bundle.dueDiligenceTasks.length === 0 &&
    bundle.dueDiligenceCases.length === 0 &&
    bundle.dueDiligenceItems.length === 0 &&
    bundle.documentReviews.length === 0 &&
    bundle.documentAccess.length === 0 &&
    bundle.documentSignatures.length === 0 &&
    bundle.auditLogs.length === 0
  ) {
    return false;
  }

  switch (role) {
    case "superadmin":
      return true;
    case "company_admin":
      return Boolean(
        profile.companyId &&
          (bundle.companies.some((company) => company.id === profile.companyId) ||
            bundle.companyMemberships.some(
              (membership) =>
                membership.companyId === profile.companyId && membership.userId === profile.uid
            ))
      );
    case "worker":
      return bundle.workers.some(
        (worker) => worker.userId === profile.uid || worker.id === profile.entityId
      );
    case "client":
      return bundle.clients.some((client) => client.userId === profile.uid);
    case "funding_recipient":
      return bundle.fundingRecipients.some((recipient) => recipient.userId === profile.uid);
    default:
      return false;
  }
}

function buildCompanyWorkspace(profile: UserProfile, bundle: FirestoreBundle): WorkspaceMockData {
  const company = resolveActiveCompany(profile, bundle) || bundle.companies[0];
  const companyWorkers = bundle.workers.filter((worker) => worker.companyId === company?.id);
  const companyClients = bundle.clients.filter((client) => client.companyId === company?.id);
  const companyDocuments = bundle.documents.filter((document) => canAccessDocument(profile, document, bundle));
  const companyTasks = bundle.dueDiligenceTasks.filter((task) => task.companyId === company?.id);
  const companyRequests = bundle.documentRequests.filter((request) => request.companyId === company?.id);
  const activeTasks = companyTasks.filter((task) => task.status !== "complete");
  const flaggedTasks = companyTasks.filter((task) => task.status === "flagged");

  return {
    eyebrow: "Company Workspace",
    title: company?.name || profile.companyName || profile.displayName,
    subtitle: "Live company data from Firestore across workers, clients, documents, diligence, and operating readiness.",
    stats: [
      { label: "Workers", value: String(companyWorkers.length), hint: "Company-scoped members" },
      { label: "Clients", value: String(companyClients.length), hint: "Assigned to this company" },
      { label: "Documents", value: String(companyDocuments.length), hint: `${companyRequests.filter((request) => request.status === "open").length} requests open` },
      {
        label: "Funding Need",
        value: company?.fundingAmount ? company.fundingAmount : "Not set",
        hint: company?.fundingNeeds || "No funding note captured yet",
      },
    ],
    sections: [
      {
        title: "Company Record",
        description: "This dashboard now reads the actual company document and related collections instead of generic seeded cards.",
        badge: company?.status ? labelize(company.status) : "Live",
        items: [
          `${company?.name || profile.displayName} is listed in ${company?.industry || profile.industry || "Unspecified industry"}.`,
          `Primary operating city: ${company?.city || "Not set"}, ${company?.country || "Not set"}.`,
          `Registration number: ${company?.registrationNumber || profile.registrationNumber || "Not captured yet"}.`,
        ],
      },
      {
        title: "Operational Pressure",
        description: "These signals are built from real collections linked to the company scope.",
        items: [
          `${flaggedTasks.length} diligence tasks are currently flagged for follow-up.`,
          `${companyDocuments.filter((document) => document.status !== "approved" && document.status !== "completed").length} company documents still need review or upload work.`,
          `${companyClients.filter((client) => client.status !== "active").length} clients are not fully active yet.`,
        ],
      },
    ],
    charts: [
      {
        title: "Client Status",
        description: "Distribution of client states from the live clients collection.",
        series: [
          {
            label: "Active",
            value: companyClients.filter((client) => client.status === "active").length,
            displayValue: String(companyClients.filter((client) => client.status === "active").length),
          },
          {
            label: "Pending",
            value: companyClients.filter((client) => client.status === "pending").length,
            displayValue: String(companyClients.filter((client) => client.status === "pending").length),
          },
          {
            label: "Inactive",
            value: companyClients.filter((client) => client.status === "inactive").length,
            displayValue: String(companyClients.filter((client) => client.status === "inactive").length),
          },
        ],
      },
      {
        title: "Document Status",
        description: "Review readiness from the live document register.",
        series: [
          {
            label: "Uploaded",
            value: companyDocuments.filter((document) => document.status === "uploaded").length,
            displayValue: String(companyDocuments.filter((document) => document.status === "uploaded").length),
          },
          {
            label: "In Review",
            value: companyDocuments.filter((document) => document.status === "in_review").length,
            displayValue: String(companyDocuments.filter((document) => document.status === "in_review").length),
          },
          {
            label: "Approved",
            value: companyDocuments.filter((document) => document.status === "approved").length,
            displayValue: String(companyDocuments.filter((document) => document.status === "approved").length),
          },
          {
            label: "Rejected",
            value: companyDocuments.filter((document) => document.status === "rejected").length,
            displayValue: String(companyDocuments.filter((document) => document.status === "rejected").length),
          },
        ],
      },
      {
        title: "Request Pipeline",
        description: "Live document request states for this company scope.",
        series: [
          {
            label: "Open",
            value: companyRequests.filter((request) => request.status === "open").length,
            displayValue: String(companyRequests.filter((request) => request.status === "open").length),
          },
          {
            label: "Submitted",
            value: companyRequests.filter((request) => request.status === "submitted").length,
            displayValue: String(companyRequests.filter((request) => request.status === "submitted").length),
          },
          {
            label: "Under Review",
            value: companyRequests.filter((request) => request.status === "under_review").length,
            displayValue: String(companyRequests.filter((request) => request.status === "under_review").length),
          },
          {
            label: "Rejected",
            value: companyRequests.filter((request) => request.status === "rejected").length,
            displayValue: String(companyRequests.filter((request) => request.status === "rejected").length),
          },
        ],
      },
    ],
    tables: [
      {
        title: "Workers",
        columns: ["Worker", "Title", "Assigned Clients", "Status"],
        rows: companyWorkers.map((worker) => [
          worker.displayName,
          worker.title,
          String(worker.assignedClientIds.length),
          labelize(worker.status),
        ]),
      },
      {
        title: "Client Accounts",
        columns: ["Client", "Service Needs", "Assigned Worker", "Status"],
        rows: companyClients.map((client) => [
          client.displayName,
          client.serviceNeeds.join(", ") || "Not specified",
          companyWorkers.find((worker) => worker.id === client.assignedWorkerId)?.displayName || "Unassigned",
          labelize(client.status),
        ]),
      },
      {
        title: "Document Register",
        columns: ["Document", "Owner", "Status", "Updated"],
        rows: companyDocuments.map((document) => [
          document.title,
          company?.name || "Company",
          labelize(document.status),
          formatTimestamp(document.updatedAt),
        ]),
      },
      {
        title: "Document Requests",
        columns: ["Request", "Requested From", "Priority", "Status"],
        rows: companyRequests.map((request) => [
          request.title,
          request.requestedFromType === "company"
            ? company?.name || "Company"
            : companyClients.find((client) => client.userId === request.requestedFromId)?.displayName || request.requestedFromType,
          labelize(request.priority),
          labelize(request.status),
        ]),
      },
      {
        title: "Due Diligence Queue",
        columns: ["Task", "Owner", "Priority", "Due"],
        rows: companyTasks.map((task) => [
          task.task,
          companyWorkers.find((worker) => worker.id === task.ownerWorkerId)?.displayName || "Unknown",
          labelize(task.priority),
          task.dueLabel || "No due date",
        ]),
      },
    ],
    sidebarGroups: [
      { label: "Workspace", items: ["Overview", "Company Profile", "Clients", "Workers"] },
      { label: "Operations", items: ["Documents", "Due Diligence", "Funding", "Compliance"] },
    ],
    primaryActions: ["Upload Document", "Request Document", "Add Worker", "Assign Client"],
  };
}

function buildClientWorkspace(profile: UserProfile, bundle: FirestoreBundle): WorkspaceMockData {
  const client = resolveClientProfile(profile, bundle) || bundle.clients[0];
  const assignedWorker = bundle.workers.find((worker) => worker.id === client?.assignedWorkerId);
  const company = bundle.companies.find((item) => item.id === client?.companyId);
  const clientDocuments = bundle.documents.filter((document) => canAccessDocument(profile, document, bundle));
  const clientRequests = bundle.documentRequests.filter(
    (request) => request.requestedFromType === "client" && request.requestedFromId === client?.userId
  );

  return {
    eyebrow: "Client Portal",
    title: client?.displayName || profile.displayName,
    subtitle: "Live client account data from Firestore, including assignments, service needs, document progress, and onboarding state.",
    stats: [
      { label: "Assigned Worker", value: assignedWorker?.displayName || "Unassigned", hint: assignedWorker?.title || "No worker assigned yet" },
      { label: "Documents", value: String(clientDocuments.length), hint: `${clientRequests.filter((request) => request.status === "open").length} requests open` },
      { label: "Service Needs", value: String(client?.serviceNeeds.length || 0), hint: "Declared at registration" },
      { label: "Status", value: labelize(client?.status || "pending"), hint: company?.name || "No company assignment yet" },
    ],
    sections: [
      {
        title: "Client Record",
        description: "This portal now reflects the real client document rather than static seeded text.",
        badge: client?.status ? labelize(client.status) : "Live",
        items: [
          `Primary service needs: ${client?.serviceNeeds.join(", ") || "Not captured yet"}.`,
          `Company assignment: ${company?.name || "Not assigned yet"}.`,
          `Operating location: ${client?.city || "Unknown"}, ${client?.country || "Unknown"}.`,
        ],
      },
      {
        title: "Action Summary",
        description: "The dashboard uses real Firestore fields to make the portal feel specific to the signed-in client.",
        items: [
          `${clientDocuments.length} client documents are currently tracked in the register.`,
          `${clientRequests.length} document requests are linked to this client record.`,
          `${client?.description || "No account description has been added yet."}`,
          `${assignedWorker ? `${assignedWorker.displayName} is the current servicing owner.` : "A worker has not been assigned to this client yet."}`,
        ],
      },
    ],
    charts: [
      {
        title: "Document Status",
        description: "Status split for the current client's document set.",
        series: [
          {
            label: "Uploaded",
            value: clientDocuments.filter((document) => document.status === "uploaded").length,
            displayValue: String(clientDocuments.filter((document) => document.status === "uploaded").length),
          },
          {
            label: "In Review",
            value: clientDocuments.filter((document) => document.status === "in_review").length,
            displayValue: String(clientDocuments.filter((document) => document.status === "in_review").length),
          },
          {
            label: "Approved",
            value: clientDocuments.filter((document) => document.status === "approved").length,
            displayValue: String(clientDocuments.filter((document) => document.status === "approved").length),
          },
          {
            label: "Rejected",
            value: clientDocuments.filter((document) => document.status === "rejected").length,
            displayValue: String(clientDocuments.filter((document) => document.status === "rejected").length),
          },
        ],
      },
      {
        title: "Service Profile",
        description: "A simple live breakdown of the current client record.",
        series: [
          { label: "Needs", value: client?.serviceNeeds.length || 0, displayValue: String(client?.serviceNeeds.length || 0) },
          { label: "Assigned", value: assignedWorker ? 1 : 0, displayValue: assignedWorker ? "1" : "0" },
          { label: "Documents", value: clientDocuments.length, displayValue: String(clientDocuments.length) },
        ],
      },
      {
        title: "Request Status",
        description: "Current document request states for this client.",
        series: [
          {
            label: "Open",
            value: clientRequests.filter((request) => request.status === "open").length,
            displayValue: String(clientRequests.filter((request) => request.status === "open").length),
          },
          {
            label: "Submitted",
            value: clientRequests.filter((request) => request.status === "submitted").length,
            displayValue: String(clientRequests.filter((request) => request.status === "submitted").length),
          },
          {
            label: "Rejected",
            value: clientRequests.filter((request) => request.status === "rejected").length,
            displayValue: String(clientRequests.filter((request) => request.status === "rejected").length),
          },
        ],
      },
    ],
    tables: [
      {
        title: "Documents",
        columns: ["Document", "Status", "Updated"],
        rows: clientDocuments.map((document) => [
          document.title,
          labelize(document.status),
          formatTimestamp(document.updatedAt),
        ]),
      },
      {
        title: "Document Requests",
        columns: ["Request", "Priority", "Status", "Requested By"],
        rows: clientRequests.map((request) => [
          request.title,
          labelize(request.priority),
          labelize(request.status),
          assignedWorker?.displayName || "Platform",
        ]),
      },
    ],
    sidebarGroups: [
      { label: "Portal", items: ["Overview", "My Profile", "Assigned Team"] },
      { label: "Work", items: ["Documents", "Service Requests", "Compliance"] },
    ],
    primaryActions: ["Upload Document", "View Service Pack", "Complete Request"],
  };
}

function buildFundingWorkspace(profile: UserProfile, bundle: FirestoreBundle): WorkspaceMockData {
  const recipient =
    bundle.fundingRecipients.find((item) => item.userId === profile.uid) || bundle.fundingRecipients[0];
  const fundingDocuments = bundle.documents.filter((document) => canAccessDocument(profile, document, bundle));
  const fundingRequests = bundle.documentRequests.filter(
    (request) => request.requestedFromType === "funding_recipient" && request.requestedFromId === recipient?.userId
  );

  return {
    eyebrow: "Funding Workspace",
    title: recipient?.displayName || profile.displayName,
    subtitle: "Live funding-recipient data from Firestore across staking, reporting, compliance, and supporting documents.",
    stats: [
      { label: "Wallet", value: recipient?.walletAddress ? "Linked" : "Pending", hint: recipient?.walletAddress || "No wallet connected yet" },
      { label: "Staked", value: currency(recipient?.stakedAmount || 0), hint: "Recorded in fundingRecipients" },
      { label: "Earned", value: currency(recipient?.totalEarned || 0), hint: "Total earned so far" },
      { label: "Documents", value: String(fundingDocuments.length), hint: `${fundingRequests.filter((request) => request.status === "open").length} requests open` },
    ],
    sections: [
      {
        title: "Funding Record",
        description: "This view is built from the live funding-recipient document and linked records.",
        badge: recipient?.status ? labelize(recipient.status) : "Live",
        items: [
          `Yield preference: ${recipient?.yieldPreference || "Not set"}.`,
          `Funding sectors: ${recipient?.fundingSectors.join(", ") || "Not set"}.`,
          `Risk background: ${recipient?.investmentBackground || "Not captured yet"}.`,
        ],
      },
      {
        title: "Compliance Snapshot",
        description: "The workspace reads real profile fields, so it can later grow into a proper reporting and disbursement surface.",
        items: [
          `Identity document: ${recipient?.idType || "Not set"} ${recipient?.idNumber ? `(${recipient.idNumber})` : ""}`.trim(),
          `Source of funds: ${recipient?.sourceOfFunds || "Not supplied yet"}.`,
          `${fundingDocuments.length} supporting documents are currently linked to this recipient.`,
        ],
      },
    ],
    charts: [
      {
        title: "Portfolio Snapshot",
        description: "Simple live summary derived from the funding recipient record.",
        series: [
          { label: "Staked", value: recipient?.stakedAmount || 0, displayValue: currency(recipient?.stakedAmount || 0) },
          { label: "Earned", value: recipient?.totalEarned || 0, displayValue: currency(recipient?.totalEarned || 0) },
          {
            label: "Initial Target",
            value: Number(recipient?.initialStakeAmount || 0),
            displayValue: currency(Number(recipient?.initialStakeAmount || 0)),
          },
        ],
      },
      {
        title: "Profile Completeness",
        description: "Live completeness of core funding-recipient fields.",
        series: [
          { label: "Identity", value: recipient?.idNumber ? 1 : 0, displayValue: recipient?.idNumber ? "Done" : "Missing" },
          { label: "Wallet", value: recipient?.walletAddress ? 1 : 0, displayValue: recipient?.walletAddress ? "Done" : "Missing" },
          {
            label: "Sectors",
            value: recipient?.fundingSectors.length || 0,
            displayValue: String(recipient?.fundingSectors.length || 0),
          },
        ],
      },
      {
        title: "Request Status",
        description: "Current compliance/reporting request states for this funding profile.",
        series: [
          {
            label: "Open",
            value: fundingRequests.filter((request) => request.status === "open").length,
            displayValue: String(fundingRequests.filter((request) => request.status === "open").length),
          },
          {
            label: "Submitted",
            value: fundingRequests.filter((request) => request.status === "submitted").length,
            displayValue: String(fundingRequests.filter((request) => request.status === "submitted").length),
          },
          {
            label: "Rejected",
            value: fundingRequests.filter((request) => request.status === "rejected").length,
            displayValue: String(fundingRequests.filter((request) => request.status === "rejected").length),
          },
        ],
      },
    ],
    tables: [
      {
        title: "Supporting Documents",
        columns: ["Document", "Status", "Updated"],
        rows: fundingDocuments.map((document) => [
          document.title,
          labelize(document.status),
          formatTimestamp(document.updatedAt),
        ]),
      },
      {
        title: "Document Requests",
        columns: ["Request", "Priority", "Status", "Type"],
        rows: fundingRequests.map((request) => [
          request.title,
          labelize(request.priority),
          labelize(request.status),
          request.documentType,
        ]),
      },
    ],
    sidebarGroups: [
      { label: "Funding", items: ["Overview", "Wallet", "Yield Pools"] },
      { label: "Records", items: ["Documents", "Milestones", "Compliance"] },
    ],
    primaryActions: ["Upload Report", "Link Wallet", "View Pool Terms"],
  };
}

function buildWorkerWorkspace(profile: UserProfile, bundle: FirestoreBundle): WorkspaceMockData {
  const worker = resolveWorkerProfile(profile, bundle) || bundle.workers[0];
  const assignedClients = bundle.clients.filter((client) => client.assignedWorkerId === worker?.id);
  const diligenceTasks = bundle.dueDiligenceTasks.filter((task) => task.ownerWorkerId === worker?.id);
  const workerRequests = bundle.documentRequests.filter(
    (request) =>
      request.assignedReviewerUserId === profile.uid ||
      request.assignedReviewerUserId === worker?.userId ||
      request.workerId === worker?.id
  );
  const workerDocuments = bundle.documents.filter((document) => canAccessDocument(profile, document, bundle));
  const company = bundle.companies.find((item) => item.id === worker?.companyId);

  return {
    eyebrow: "Worker Console",
    title: worker?.displayName || profile.displayName,
    subtitle: "Live worker data from Firestore across assignments, document review, due diligence, and company-scoped workload.",
    stats: [
      { label: "Assigned Clients", value: String(assignedClients.length), hint: company?.name || "No company attached" },
      { label: "Open Tasks", value: String(diligenceTasks.filter((task) => task.status !== "complete").length), hint: `${diligenceTasks.filter((task) => task.status === "flagged").length} flagged` },
      { label: "Documents", value: String(workerDocuments.length), hint: `${workerRequests.filter((request) => request.status === "open").length} requests open` },
      { label: "Anonymous Mode", value: worker?.anonymityEnabled ? "Enabled" : "Off", hint: worker?.title || "Role not set" },
    ],
    sections: [
      {
        title: "Worker Scope",
        description: "This console is driven by the live worker record and company assignment rather than generic placeholder data.",
        badge: worker?.status ? labelize(worker.status) : "Live",
        items: [
          `Company scope: ${company?.name || "Not assigned"}.`,
          `Role title: ${worker?.title || "Not set"}.`,
          `Assigned client IDs on record: ${worker?.assignedClientIds.length || 0}.`,
        ],
      },
      {
        title: "Action Summary",
        description: "The console can now respond to the real client and diligence collections without changing the shell component.",
        items: [
          `${assignedClients.length} client accounts are assigned to this worker.`,
          `${diligenceTasks.length} due diligence tasks are linked to this worker.`,
          `${workerRequests.length} document requests are currently assigned into this workflow scope.`,
          `${workerDocuments.length} related client documents are available for review context.`,
        ],
      },
    ],
    charts: [
      {
        title: "Task Load",
        description: "Live breakdown of the worker's due diligence queue.",
        series: [
          {
            label: "Queued",
            value: diligenceTasks.filter((task) => task.status === "queued").length,
            displayValue: String(diligenceTasks.filter((task) => task.status === "queued").length),
          },
          {
            label: "In Review",
            value: diligenceTasks.filter((task) => task.status === "in_review").length,
            displayValue: String(diligenceTasks.filter((task) => task.status === "in_review").length),
          },
          {
            label: "Flagged",
            value: diligenceTasks.filter((task) => task.status === "flagged").length,
            displayValue: String(diligenceTasks.filter((task) => task.status === "flagged").length),
          },
          {
            label: "Complete",
            value: diligenceTasks.filter((task) => task.status === "complete").length,
            displayValue: String(diligenceTasks.filter((task) => task.status === "complete").length),
          },
        ],
      },
      {
        title: "Client Status",
        description: "Live status mix for the worker's assigned clients.",
        series: [
          {
            label: "Active",
            value: assignedClients.filter((client) => client.status === "active").length,
            displayValue: String(assignedClients.filter((client) => client.status === "active").length),
          },
          {
            label: "Pending",
            value: assignedClients.filter((client) => client.status === "pending").length,
            displayValue: String(assignedClients.filter((client) => client.status === "pending").length),
          },
          {
            label: "Inactive",
            value: assignedClients.filter((client) => client.status === "inactive").length,
            displayValue: String(assignedClients.filter((client) => client.status === "inactive").length),
          },
        ],
      },
      {
        title: "Request Queue",
        description: "Live document request load assigned to this worker scope.",
        series: [
          {
            label: "Open",
            value: workerRequests.filter((request) => request.status === "open").length,
            displayValue: String(workerRequests.filter((request) => request.status === "open").length),
          },
          {
            label: "Submitted",
            value: workerRequests.filter((request) => request.status === "submitted").length,
            displayValue: String(workerRequests.filter((request) => request.status === "submitted").length),
          },
          {
            label: "Under Review",
            value: workerRequests.filter((request) => request.status === "under_review").length,
            displayValue: String(workerRequests.filter((request) => request.status === "under_review").length),
          },
        ],
      },
    ],
    tables: [
      {
        title: "Assigned Clients",
        columns: ["Client", "Service Needs", "Status"],
        rows: assignedClients.map((client) => [
          client.displayName,
          client.serviceNeeds.join(", ") || "Not specified",
          labelize(client.status),
        ]),
      },
      {
        title: "Due Diligence Tasks",
        columns: ["Task", "Priority", "Status", "Due"],
        rows: diligenceTasks.map((task) => [
          task.task,
          labelize(task.priority),
          labelize(task.status),
          task.dueLabel || "No due date",
        ]),
      },
      {
        title: "Requested Documents",
        columns: ["Request", "Requested From", "Priority", "Status"],
        rows: workerRequests.map((request) => [
          request.title,
          request.requestedFromType === "company"
            ? company?.name || "Company"
            : assignedClients.find((client) => client.userId === request.requestedFromId)?.displayName || request.requestedFromType,
          labelize(request.priority),
          labelize(request.status),
        ]),
      },
      {
        title: "Document Review Queue",
        columns: ["Document", "Owner", "Status"],
        rows: workerDocuments.map((document) => [
          document.title,
          assignedClients.find((client) => client.userId === document.ownerId)?.displayName || "Unknown",
          labelize(document.status),
        ]),
      },
    ],
    sidebarGroups: [
      { label: "Console", items: ["Overview", "Assigned Clients", "Approvals"] },
      { label: "Actions", items: ["Documents", "Due Diligence", "Escalations"] },
    ],
    primaryActions: ["Request Document", "Mark Review Complete", "Escalate Task"],
  };
}

function buildSuperadminWorkspace(profile: UserProfile, bundle: FirestoreBundle): WorkspaceMockData {
  const flaggedTasks = bundle.dueDiligenceTasks.filter((task) => task.status === "flagged");
  const pendingClients = bundle.clients.filter((client) => client.status === "pending");
  const reviewDocuments = bundle.documents.filter(
    (document) => document.status === "in_review" || document.status === "uploaded"
  );
  const requestQueue = bundle.documentRequests.filter(
    (request) => request.status === "open" || request.status === "submitted" || request.status === "rejected"
  );
  const activeFunding = bundle.fundingRecipients.filter((recipient) => recipient.status === "active");

  return {
    eyebrow: "Superadmin Oversight",
    title: profile.displayName,
    subtitle: "Live platform-wide oversight across company records, worker assignments, client states, documents, and due diligence flow.",
    stats: [
      { label: "Companies", value: String(bundle.companies.length), hint: `${bundle.companies.filter((company) => company.status === "active").length} active` },
      { label: "Workers", value: String(bundle.workers.length), hint: `${bundle.companyMemberships.length} memberships` },
      { label: "Clients", value: String(bundle.clients.length), hint: `${pendingClients.length} pending` },
      { label: "Funding", value: String(bundle.fundingRecipients.length), hint: `${activeFunding.length} active` },
    ],
    sections: [
      {
        title: "Platform Governance",
        description: "This oversight view is now driven by the real Firestore collections and bootstrap schema metadata.",
        badge: "Live Firestore",
        items: [
          `${bundle.companies.length} companies, ${bundle.workers.length} workers, and ${bundle.clients.length} clients are currently present.`,
          `${reviewDocuments.length} documents are in uploaded or in-review states.`,
          `${requestQueue.length} document requests are active across the platform.`,
          `${flaggedTasks.length} diligence items are flagged for follow-up.`,
        ],
      },
      {
        title: "Operational Watchlist",
        description: "A live cross-platform snapshot for the superadmin role.",
        items: [
          `${bundle.companies.filter((company) => company.fundingAmount).length} companies have a funding amount captured.`,
          `${bundle.workers.filter((worker) => worker.anonymityEnabled).length} workers have anonymous mode enabled.`,
          `${bundle.fundingRecipients.filter((recipient) => !recipient.walletAddress).length} funding recipients still need wallet linkage.`,
        ],
      },
    ],
    charts: [
      {
        title: "Platform Composition",
        description: "Entity distribution from the live collections.",
        series: [
          { label: "Companies", value: bundle.companies.length, displayValue: compactNumber(bundle.companies.length) },
          { label: "Workers", value: bundle.workers.length, displayValue: compactNumber(bundle.workers.length) },
          { label: "Clients", value: bundle.clients.length, displayValue: compactNumber(bundle.clients.length) },
          { label: "Funding", value: bundle.fundingRecipients.length, displayValue: compactNumber(bundle.fundingRecipients.length) },
        ],
      },
      {
        title: "Oversight Queue",
        description: "Current governance load from documents and due diligence tasks.",
        series: [
          { label: "Documents", value: reviewDocuments.length, displayValue: String(reviewDocuments.length) },
          { label: "Requests", value: requestQueue.length, displayValue: String(requestQueue.length) },
          { label: "Flagged Tasks", value: flaggedTasks.length, displayValue: String(flaggedTasks.length) },
          {
            label: "Wallet Pending",
            value: bundle.fundingRecipients.filter((recipient) => !recipient.walletAddress).length,
            displayValue: String(bundle.fundingRecipients.filter((recipient) => !recipient.walletAddress).length),
          },
        ],
      },
    ],
    tables: [
      {
        title: "Company Registry",
        columns: ["Company", "Industry", "City", "Status"],
        rows: bundle.companies.map((company) => [
          company.name,
          company.industry,
          `${company.city}, ${company.country}`,
          labelize(company.status),
        ]),
      },
      {
        title: "Worker Oversight",
        columns: ["Worker", "Company", "Title", "Assigned Clients"],
        rows: bundle.workers.map((worker) => [
          worker.displayName,
          bundle.companies.find((company) => company.id === worker.companyId)?.name || "Unknown",
          worker.title,
          String(worker.assignedClientIds.length),
        ]),
      },
      {
        title: "Document Requests",
        columns: ["Request", "Requested From", "Priority", "Status"],
        rows: requestQueue.map((request) => [
          request.title,
          request.requestedFromType,
          labelize(request.priority),
          labelize(request.status),
        ]),
      },
      {
        title: "Due Diligence Queue",
        columns: ["Task", "Owner", "Priority", "Due"],
        rows: bundle.dueDiligenceTasks.map((task) => [
          task.task,
          bundle.workers.find((worker) => worker.id === task.ownerWorkerId)?.displayName || "Unknown",
          labelize(task.priority),
          task.dueLabel || "No due date",
        ]),
      },
      {
        title: "Document Oversight",
        columns: ["Document", "Owner Type", "Status", "Updated"],
        rows: bundle.documents.map((document) => [
          document.title,
          labelize(document.ownerType),
          labelize(document.status),
          formatTimestamp(document.updatedAt),
        ]),
      },
    ],
    sidebarGroups: [
      { label: "Oversight", items: ["Platform Overview", "Companies", "Assignments"] },
      { label: "Governance", items: ["Documents", "Due Diligence", "Compliance"] },
    ],
    primaryActions: ["Create Company", "Review Escalations", "Open Audit Pack"],
  };
}

function buildWorkspaceFromFirestore(
  role: WorkspaceRole,
  profile: UserProfile,
  bundle: FirestoreBundle
): WorkspaceMockData {
  switch (role) {
    case "superadmin":
      return buildSuperadminWorkspace(profile, bundle);
    case "company_admin":
      return buildCompanyWorkspace(profile, bundle);
    case "client":
      return buildClientWorkspace(profile, bundle);
    case "funding_recipient":
      return buildFundingWorkspace(profile, bundle);
    case "worker":
      return buildWorkerWorkspace(profile, bundle);
    default:
      return getWorkspaceMockData(role, profile);
  }
}

export function useWorkspaceData(role: WorkspaceRole, profile: UserProfile) {
  const [workspace, setWorkspace] = useState<WorkspaceMockData>(() => getWorkspaceMockData(role, profile));
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"firestore" | "mock">("mock");

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const bundle = await readPlatformBundle();

      if (!hasWorkspaceData(role, profile, bundle)) {
        setWorkspace(getWorkspaceMockData(role, profile));
        setSource("mock");
        return;
      }

      setWorkspace(buildWorkspaceFromFirestore(role, profile, bundle));
      setSource("firestore");
    } catch (error) {
      console.error("Failed to load workspace data from Firestore", error);
      setWorkspace(getWorkspaceMockData(role, profile));
      setSource("mock");
    } finally {
      setLoading(false);
    }
  }, [profile, role]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    workspace,
    loading,
    source,
    reload: load,
  };
}
